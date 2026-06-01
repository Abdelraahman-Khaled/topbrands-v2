"use client"
import React, { useRef } from 'react';
import { motion } from "framer-motion";
import SyriaMap from "../../home/components/SyriaMap";

// Syria geographic bounds
const SYRIA_BOUNDS = [[32.0, 35.5], [37.5, 42.5]];

// All 14 Syrian governorates — static
const GOVERNORATES = [
  { name: "Damascus", nameAr: "دمشق", coords: [33.5138, 36.2765] },
  { name: "Aleppo", nameAr: "حلب", coords: [36.2021, 37.1343] },
  { name: "Homs", nameAr: "حمص", coords: [34.7324, 36.7137] },
  { name: "Hama", nameAr: "حماة", coords: [35.1318, 36.7499] },
  { name: "Latakia", nameAr: "اللاذقية", coords: [35.5317, 35.7916] },
  { name: "Tartus", nameAr: "طرطوس", coords: [34.8963, 35.8895] },
  { name: "Idlib", nameAr: "إدلب", coords: [35.9311, 36.6339] },
  { name: "Daraa", nameAr: "درعا", coords: [32.6189, 36.1021] },
  { name: "As-Suwayda", nameAr: "السويداء", coords: [32.7082, 36.5662] },
  { name: "Quneitra", nameAr: "القنيطرة", coords: [33.1277, 35.8233] },
  { name: "Deir ez-Zor", nameAr: "دير الزور", coords: [35.3312, 40.1415] },
  { name: "Ar-Raqqa", nameAr: "الرقة", coords: [35.9455, 38.9978] },
  { name: "Al-Hasakah", nameAr: "الحسكة", coords: [36.4981, 40.7490] },
  { name: "Rif Dimashq", nameAr: "ريف دمشق", coords: [33.5164, 36.6177] },
];

// Dynamic Leaflet map — loaded only on client
function LeafletMap({ isAr }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  React.useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    import('leaflet').then((L) => {
      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.default.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      map.fitBounds(SYRIA_BOUNDS, { padding: [20, 20] });

      mapRef.current.addEventListener('wheel', (e) => {
        if (e.ctrlKey) { e.preventDefault(); map.scrollWheelZoom.enable(); }
        else map.scrollWheelZoom.disable();
      }, { passive: false });

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);
      L.default.control.attribution({ prefix: false })
        .addAttribution('© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>')
        .addTo(map);

      if (!document.getElementById('leaflet-pulse-style')) {
        const style = document.createElement('style');
        style.id = 'leaflet-pulse-style';
        style.textContent = `
          @keyframes pulse-map {
            0%,100% { transform:scale(1); opacity:0.5; }
            50% { transform:scale(2); opacity:0.1; }
          }
          .leaflet-container { border-radius: 12px; }
        `;
        document.head.appendChild(style);
      }

      const pulseIcon = () => L.default.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;width:36px;height:36px;background:rgba(247,227,38,0.3);border-radius:50%;animation:pulse-map 2s infinite;"></div>
            <div style="width:18px;height:18px;background:#F7E326;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;z-index:2;"></div>
          </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      GOVERNORATES.forEach((gov) => {
        const label = isAr ? gov.nameAr : gov.name;
        const marker = L.default.marker(gov.coords, { icon: pulseIcon(), zIndexOffset: 1000 });
        marker.bindTooltip(`
          <div style="background:#1a1a2e;color:white;padding:9px 13px;border-radius:10px;font-size:13px;font-weight:700;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,0.3);border:1px solid rgba(247,227,38,0.35);">
            ${label}
          </div>`, {
          permanent: false,
          direction: 'top',
          offset: [0, -10],
          className: 'custom-leaflet-tooltip',
          opacity: 1,
        });
        marker.addTo(map);
      });

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, []);

  return (
    <div className="group relative w-full h-140 lg:h-170 rounded-xl overflow-hidden border border-gray-100">
      <div ref={mapRef} className="w-full h-full" />

      {/* Placeholder overlay — Syria map with governorate dots, removed on hover */}
      <div
        className="absolute inset-0 z-1002 flex items-center justify-center overflow-hidden transition-opacity duration-500 ease-out group-hover:opacity-0 group-hover:pointer-events-none"
        style={{
          background:
            "radial-gradient(130% 130% at 30% 20%, #565a60 0%, #45484d 55%, #303338 100%)",
        }}
      >
        <SyriaMap className="w-[68%] max-w-[520px] h-auto drop-shadow-[0_0_40px_rgba(247,227,38,0.2)]" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[3px] uppercase text-white/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          {isAr ? "مرّر للاستكشاف على الخريطة التفاعلية" : "Hover to explore the interactive map"}
        </span>
      </div>

      {/* Badge */}
      <div className="absolute top-4 right-4 z-1001 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-xl border border-gray-100 flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2.5 h-2.5 bg-brand-yellow rounded-full"
          />
          <span className="text-xs font-bold text-brand-jet uppercase tracking-widest">
            14 {isAr ? "محافظة" : "Governorates"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──
const MarketMap = ({ mapData, locale }) => {
  const isAr = locale === 'ar';

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <style>{`
        .custom-leaflet-tooltip { background:transparent!important; border:none!important; box-shadow:none!important; }
        .custom-leaflet-tooltip::before { display:none!important; }
        .leaflet-tooltip-top.custom-leaflet-tooltip { margin-top:-8px; }
      `}</style>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block text-brand-jet"
            >
              {isAr ? "التغطية الجغرافية" : "GEOGRAPHIC COVERAGE"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-brand-jet"
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
              <span className="text-xs font-mono font-bold tracking-[3px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                {mapData?.["Text Element 3"]?.value}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Governorates grid — 4 per row */}
      <div className="relative z-10 border-t px-10 sm:px-14 lg:px-20 xl:px-28 py-10" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {GOVERNORATES.map((gov, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="group relative flex items-center gap-3 px-4 py-4 border cursor-pointer overflow-hidden"
              style={{ borderColor: "rgba(0,0,0,0.1)", background: "white" }}
            >
              <div className="absolute inset-0 origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none bg-brand-yellow" />
              <span className="relative z-10 w-2 h-2 rounded-full bg-brand-yellow shrink-0 group-hover:bg-black transition-colors duration-300" />
              <span className="relative z-10 text-sm font-bold text-brand-jet group-hover:text-black transition-colors duration-300">
                {isAr ? gov.nameAr : gov.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative z-10 border-t px-10 sm:px-14 lg:px-16 xl:px-20 py-10 sm:py-14 lg:py-16" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <LeafletMap isAr={isAr} />
      </div>
    </section>
  );
};

export default MarketMap;
