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

  const icons = [
    "ri-building-line", "ri-building-2-line", "ri-building-3-line",
    "ri-ship-line", "ri-building-4-line", "ri-anchor-line",
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <style>{`
        .custom-leaflet-tooltip { background:transparent!important; border:none!important; box-shadow:none!important; }
        .custom-leaflet-tooltip::before { display:none!important; }
        .leaflet-tooltip-top.custom-leaflet-tooltip { margin-top:-8px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">

          {/* ── Leaflet Map + Overlay ── */}
          <div className="sticky top-24">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <LeafletMap
                areas={areas}
                overlayUrl={mapData?.image_url}
                isAr={isAr}
              />

              {/* Caption */}
              <div className="mt-4 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                <p className="text-xs text-brand-charcoal/50 font-bold mb-1 uppercase tracking-widest">
                  {mapData?.["Text Element 3"]?.value}
                </p>
                <p className="text-xl font-black text-black">
                  {mapData?.["Text Element 2"]?.value}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Areas Sidebar ── */}
          <div className="space-y-10">
            <div className={`${isAr ? 'text-right' : 'text-left'} space-y-4`}>
              <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
                {mapData?.["Text Element 1"]?.value}
              </h2>
              <div className="w-24 h-2 bg-brand-yellow rounded-full"></div>
            </div>

            <StaggerContainer className="space-y-4">
              {areas.map((area, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    onMouseEnter={() => setHoveredCity(index)}
                    onMouseLeave={() => setHoveredCity(null)}
                    className={`rounded-2xl p-5 transition-colors duration-300 border-2 cursor-pointer ${
                      hoveredCity === index
                        ? 'bg-brand-charcoal border-brand-charcoal'
                        : 'bg-brand-paleblue/40 border-transparent hover:border-brand-yellow/60'
                    }`}
                  >
                    <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl shrink-0 bg-brand-yellow">
                        <i className={`${icons[index % icons.length]} text-xl text-black`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold transition-colors ${hoveredCity === index ? 'text-white' : 'text-black'}`}>
                          {area.val0}
                        </h3>
                        <p className={`text-sm transition-colors ${hoveredCity === index ? 'text-white/60' : 'text-brand-charcoal/60'}`}>
                          {area.val1}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 shrink-0 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <motion.div
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                        />
                        <span className={`text-xs font-bold uppercase tracking-wider ${hoveredCity === index ? 'text-green-400' : 'text-green-600'}`}>
                          {area.val2}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketMap;
