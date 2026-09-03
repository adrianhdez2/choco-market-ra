import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MindArViewer from '../components/MindArViewer.jsx';

export default function MindArExperience() {
  const [scale, setScale] = useState(0.5);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const handleTrackingChange = (tracking) => {
    setIsTracking(tracking);
  };

  const handleScaleChange = (newScale) => {
    const clamped = Math.min(Math.max(Number(newScale.toFixed(2)), 0.05), 3.0);
    setScale(clamped);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans select-none">
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white transition-opacity duration-500">
          <div className="w-14 h-14 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-amber-400">Iniciando Motor MindAR...</h2>
          <p className="text-xs text-neutral-400 mt-2 text-center max-w-xs px-4">
            Cargando targets compilados y cámara WebAR.
          </p>
        </div>
      )}

      {/* Componente MindAR */}
      <MindArViewer
        scale={scale}
        onLoaded={handleLoaded}
        onTrackingChange={handleTrackingChange}
      />

      {/* Barra superior HUD */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors shadow-lg active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>

        {/* Indicador de detección */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-300 ${
            isTracking
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              : 'bg-amber-500/20 border-amber-400/40 text-amber-300 animate-pulse'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isTracking ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
            }`}
          />
          {isTracking ? 'Imagen Reconocida' : 'Buscando Imagen...'}
        </div>

        {/* Botón de Ayuda */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold hover:bg-amber-500/30 transition-all active:scale-95 shadow-lg backdrop-blur-md"
          title="Instrucciones"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ayuda
        </button>
      </header>

      {/* Controles de Escala / Zoom (Lateral Derecho) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/15 shadow-2xl">
        <button
          onClick={() => handleScaleChange(scale + 0.1)}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center font-bold text-lg text-white transition"
          title="Aumentar tamaño"
        >
          +
        </button>
        <span className="text-[10px] font-semibold text-neutral-300 select-none">
          {Math.round((scale / 0.5) * 100)}%
        </span>
        <button
          onClick={() => handleScaleChange(scale - 0.1)}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center font-bold text-lg text-white transition"
          title="Reducir tamaño"
        >
          -
        </button>
      </div>

      {/* Controles inferiores HUD */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent gap-3">
        <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 shadow-2xl">
          <span className="text-amber-400 font-bold text-xs">🔥 Doom Vivo</span>
          <span className="text-neutral-400 text-[11px]">• Animación Activa</span>
        </div>

        <p className="text-xs text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-center max-w-sm">
          {isTracking
            ? 'Apunta tu cámara a la hoja para mantener al personaje en su posición.'
            : 'Apunta tu cámara a la imagen objetivo para ver el modelo 3D.'}
        </p>
      </footer>

      {/* Modal de Ayuda */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-2">MindAR Image Tracking</h3>
            <p className="text-xs text-neutral-300 mb-4 text-left leading-relaxed">
              En Realidad Aumentada basada en imágenes:
            </p>
            <div className="p-3 bg-neutral-800 rounded-xl text-left text-xs text-neutral-300 mb-4 space-y-2">
              <p>📷 <strong>1.</strong> La hoja de papel <strong>es el ancla física</strong> en tu habitación.</p>
              <p>🔄 <strong>2.</strong> Puedes moverte 360° alrededor de la hoja, agacharte o alejarte.</p>
              <p>🔍 <strong>3.</strong> Mantén la hoja visible en la cámara para que el modelo permanezca anclado al suelo.</p>
            </div>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 font-semibold rounded-xl text-xs transition-colors text-black"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
