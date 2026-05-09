"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";

// Precise lat/lng for all 14 Syrian Governorates
const GOVERNORATE_COORDS = {
  "دمشق":      [33.5138, 36.2765],
  "Damascus":  [33.5138, 36.2765],
  "حلب":       [36.2021, 37.1343],
  "Aleppo":    [36.2021, 37.1343],
  "حمص":       [34.7324, 36.7137],
  "Homs":      [34.7324, 36.7137],
  "حماة":      [35.1318, 36.7499],
  "Hama":      [35.1318, 36.7499],
  "اللاذقية":  [35.5317, 35.7916],
  "Latakia":   [35.5317, 35.7916],
  "طرطوس":     [34.8963, 35.8895],
  "Tartus":    [34.8963, 35.8895],
  "إدلب":      [35.9311, 36.6339],
  "Idlib":     [35.9311, 36.6339],
  "درعا":      [32.6189, 36.1021],
  "Daraa":     [32.6189, 36.1021],
  "السويداء":  [32.7082, 36.5662],
  "As-Suwayda":[32.7082, 36.5662],
  "القنيطرة":  [33.1277, 35.8233],
  "Quneitra":  [33.1277, 35.8233],
  "دير الزور": [35.3312, 40.1415],
  "Deir ez-Zor":[35.3312, 40.1415],
  "الرقة":     [35.9455, 38.9978],
  "Ar-Raqqa":  [35.9455, 38.9978],
  "الحسكة":    [36.4981, 40.7490],
  "Al-Hasakah":[36.4981, 40.7490],
  "ريف دمشق":  [33.5164, 36.6177],
  "Rif Dimashq":[33.5164, 36.6177],
};

// Dynamic Leaflet map — loaded only on client
function LeafletMap({ areas, overlayUrl, isAr }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths for Next.js
      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Init map centered on Syria
      const map = L.default.map(mapRef.current, {
        center: [34.8, 38.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
      });

      // OSM tile layer (free, no API key)
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Attribution (required by OSM license)
      L.default.control.attribution({ prefix: false })
        .addAttribution('© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>')
        .addTo(map);

      // Custom yellow pulse icon
      const pulseIcon = (isHovered = false) => L.default.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
            <div style="
              position:absolute;
              width:36px;height:36px;
              background:rgba(247,227,38,0.3);
              border-radius:50%;
              animation:pulse-map 2s infinite;
            "></div>
            <div style="
              width:18px;height:18px;
              background:${isHovered ? '#1a1a2e' : '#F7E326'};
              border:3px solid white;
              border-radius:50%;
              box-shadow:0 2px 8px rgba(0,0,0,0.3);
              position:relative;z-index:2;
              transition:all 0.3s;
            "></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      // Add CSS animation
      if (!document.getElementById('leaflet-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'leaflet-pulse-style';
        style.textContent = `
          @keyframes pulse-map {
            0%,100% { transform:scale(1); opacity:0.5; }
            50% { transform:scale(2); opacity:0.1; }
          }
          .leaflet-container { border-radius: 24px; }
        `;
        document.head.appendChild(style);
      }

      // Place markers for API areas
      areas.forEach((area, index) => {
        const name = area.val0?.trim();
        const coords = GOVERNORATE_COORDS[name];
        if (!coords) return;

        const marker = L.default.marker(coords, { icon: pulseIcon(false) });

        const tooltipContent = `
          <div style="
            background:#1a1a2e;color:white;
            padding:10px 14px;border-radius:12px;
            font-family:inherit;min-width:140px;
            box-shadow:0 8px 24px rgba(0,0,0,0.3);
            border:1px solid rgba(247,227,38,0.3);
          ">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${name}</div>
            <div style="font-size:11px;color:#9ca3af;margin-bottom:4px;">${area.val1 || ''}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <div style="width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 6px #22c55e;"></div>
              <span style="font-size:11px;color:#86efac;font-weight:600;">${area.val2 || ''}</span>
            </div>
          </div>
        `;

        marker.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          offset: [0, -10],
          className: 'custom-leaflet-tooltip',
          opacity: 1,
        });

        marker.addTo(map);
        markersRef.current.push(marker);
      });

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 cursor-pointer"
      onMouseEnter={() => setIsMapHovered(true)}
      onMouseLeave={() => setIsMapHovered(false)}
    >
      {/* Leaflet Map — sits underneath */}
      <div ref={mapRef} className="w-full h-full" />

      {/* ── Overlay Image — sits ABOVE Leaflet (z-[1000]) ── */}
      <AnimatePresence>
        {!isMapHovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0 z-[1000] pointer-events-none"
          >
            {/* Map image fills the container */}
            <img
              src={overlayUrl || "/images/market-coverage/map.webp"}
              alt="Map Preview"
              className="w-full h-full object-cover object-center"
            />

            {/* Dark gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Hover hint — centered bottom */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 gap-3">
              {/* Animated ripple circle */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center shadow-xl"
              >
                <i className="ri-map-2-line text-white text-2xl"></i>
              </motion.div>

              <div className="text-center">
                <p className="text-white font-bold text-lg drop-shadow-lg">
                  {isAr ? "مرر المؤشر لرؤية الخريطة التفاعلية" : "Hover to reveal interactive map"}
                </p>
                <p className="text-white/60 text-sm mt-1">
                  {isAr ? "مع مواقع المحافظات المغطاة" : "with all covered governorate pins"}
                </p>
              </div>

              {/* Animated arrow */}
              <motion.i
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="ri-arrow-down-line text-white/70 text-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active cities badge — always visible */}
      <div className="absolute top-4 right-4 z-[1001] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl border border-gray-100 flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2.5 h-2.5 bg-brand-yellow rounded-full"
          />
          <span className="text-xs font-bold text-brand-jet uppercase tracking-widest">
            {areas.length} {isAr ? "محافظة مغطاة" : "Covered Areas"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
const MarketMap = ({ mapData, areas, locale }) => {
  const isAr = locale === 'ar';
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <style>{`
        .custom-leaflet-tooltip { background:transparent!important; border:none!important; box-shadow:none!important; }
        .custom-leaflet-tooltip::before { display:none!important; }
        .leaflet-tooltip-top.custom-leaflet-tooltip { margin-top:-8px; }
      `}</style>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        MAP
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              {isAr ? "التغطية الجغرافية" : "GEOGRAPHIC COVERAGE"}
            </motion.span>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
            />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-[0.88] tracking-tight text-brand-jet"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {mapData?.["Text Element 1"]?.value}
            </motion.h2>
          </div>

          {mapData?.["Text Element 2"]?.value && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col items-start lg:items-end"
            >
              <span className="font-black text-brand-jet" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                {mapData["Text Element 2"].value}
              </span>
              <span className="text-xs font-mono font-bold tracking-[3px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
                {mapData?.["Text Element 3"]?.value}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Map + Areas */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="flex flex-col lg:flex-row">

          {/* Map panel */}
          <div className="lg:w-1/2 p-10 sm:p-14 lg:p-16 xl:p-20 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="sticky top-24">
              <LeafletMap areas={areas} overlayUrl={mapData?.image_url} isAr={isAr} />
            </div>
          </div>

          {/* Areas list */}
          <div className="lg:w-1/2 flex flex-col divide-y" style={{ "--tw-divide-opacity": 1, borderColor: "rgba(0,0,0,0.08)" }}>
            {areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCity(index)}
                onMouseLeave={() => setHoveredCity(null)}
                className="group relative flex items-center justify-between px-10 sm:px-14 lg:px-12 xl:px-16 py-6 cursor-pointer overflow-hidden border-b"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                {/* Yellow sweep */}
                <div className="absolute inset-0 origin-left transition-transform duration-400 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none bg-brand-yellow" />

                <div className="relative z-10 flex items-center gap-5">
                  <span className="font-mono font-bold text-xs tracking-[3px] text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-black text-brand-jet group-hover:text-black transition-colors duration-300" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                      {area.val0}
                    </h3>
                    {area.val1 && (
                      <p className="text-xs mt-0.5 text-black/40 group-hover:text-black/60 transition-colors duration-300">{area.val1}</p>
                    )}
                  </div>
                </div>

                {area.val2 && (
                  <span className="relative z-10 text-xs font-bold font-mono tracking-widest uppercase text-green-700 group-hover:text-green-800 transition-colors duration-300">
                    {area.val2}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketMap;
