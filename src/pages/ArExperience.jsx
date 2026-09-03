import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArViewer from '../components/ArViewer.jsx';

export default function ArExperience() {
  const [activeModel, setActiveModel] = useState('doom-animated');
  const [scale, setScale] = useState(0.5);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMarkerModal, setShowMarkerModal] = useState(false);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const handleTrackingChange = (tracking) => {
    setIsTracking(tracking);
  };

  const handleScaleChange = (newScale) => {
    const clamped = Math.min(Math.max(Number(newScale.toFixed(2)), 0.05), 1.0);
    setScale(clamped);
  };

  return (
    <div className="relative w-screen min-h-dvh overflow-hidden bg-black text-white font-sans select-none">
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white transition-opacity duration-500">
          <div className="w-14 h-14 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-orange-400">Iniciando Cámara AR...</h2>
          <p className="text-xs text-neutral-400 mt-2 text-center max-w-xs px-4">
            Asegúrate de conceder permisos de cámara en tu navegador.
          </p>
        </div>
      )}

      {/* Motor Componente AR */}
      <ArViewer
        activeModel={activeModel}
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
          {isTracking ? 'Marcador Choco Detectado' : 'Buscando Marcador Choco...'}
        </div>

        {/* Botón para ver y descargar marcador */}
        <button
          onClick={() => setShowMarkerModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-semibold hover:bg-orange-500/30 transition-all active:scale-95 shadow-lg backdrop-blur-md"
          title="Ver marcador para escanear"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Ver Marcador
        </button>
      </header>

      {/* Controles de Escala / Zoom (Lateral Derecho) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/15 shadow-2xl">
        <button
          onClick={() => handleScaleChange(scale + 0.05)}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center font-bold text-lg text-white transition"
          title="Aumentar tamaño"
        >
          +
        </button>
        <span className="text-[10px] font-semibold text-neutral-300 select-none">
          {Math.round((scale / 0.2) * 100)}%
        </span>
        <button
          onClick={() => handleScaleChange(scale - 0.05)}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center font-bold text-lg text-white transition"
          title="Reducir tamaño"
        >
          -
        </button>
      </div>

      {/* Controles inferiores HUD */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent gap-4">
        {/* Selector de modelos animados */}
        <div className="flex items-center gap-3 bg-neutral-900/70 backdrop-blur-xl p-1.5 rounded-full border border-white/15 shadow-2xl">
          <button
            onClick={() => setActiveModel('doom-animated')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeModel === 'doom-animated'
                ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-105'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            🔥 Doom Animado
          </button>
          <button
            onClick={() => setActiveModel('doom-180')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeModel === 'doom-180'
                ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-105'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            💀 Doom 180°
          </button>
        </div>

        {/* Mensaje de ayuda si no se ha detectado */}
        {!isTracking && (
          <p className="text-xs text-neutral-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-center max-w-sm">
            Apunta la cámara al <strong>Marcador Choco Market</strong> para ver el modelo 3D.
          </p>
        )}
      </footer>

      {/* Modal para ver y descargar marcador */}
      {showMarkerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowMarkerModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Marcador Choco Market</h3>
            <p className="text-xs text-neutral-300 mb-4">
              Muestra este marcador en otra pantalla o imprímelo para proyectar el modelo 3D en Realidad Aumentada.
            </p>

            {/* Vista previa del marcador */}
            <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-inner">
              <img
                src="/markers/choco-marker.jpg"
                alt="Marcador Choco Market"
                className="w-48 h-48 object-contain mx-auto"
              />
            </div>

            <div className="flex gap-2">
              <a
                href="/markers/choco-marker.jpg"
                download="choco-marker.jpg"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 text-white"
              >
                📥 Descargar Imagen
              </a>
              <button
                onClick={() => setShowMarkerModal(false)}
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 font-semibold rounded-xl text-xs transition-colors text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
