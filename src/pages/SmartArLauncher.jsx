import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MindArViewer from '../components/MindArViewer.jsx';

export default function SmartArLauncher() {
  const [isScanning, setIsScanning] = useState(true);
  const [detectedItem, setDetectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modelViewerRef = useRef(null);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const handleTrackingChange = (isTracking) => {
    if (isTracking && isScanning) {
      // Reconoció el target
      setDetectedItem({
        id: 'doom-vivo',
        title: 'Doctor Doom Animado',
        subtitle: 'Modelo 3D interactivo desbloqueado',
        glbSrc: '/models/doom/DoomVivo.glb',
        usdzSrc: '/models/doom/Doomvivo.usdz',
        poster: '/posters/doom-vivo.webp',
      });
      // Detener escaneo para liberar la cámara en iOS
      setIsScanning(false);
    }
  };

  const handleLaunchNativeAR = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.activateAR();
    }
  };

  const handleRescan = () => {
    setDetectedItem(null);
    setIsScanning(true);
  };

  // Detectar iOS para enlace directo con rel="ar"
  const isIOS =
    typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans select-none">
      {/* Pantalla de carga inicial */}
      {isLoading && isScanning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white transition-opacity duration-500">
          <div className="w-14 h-14 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-amber-400">Iniciando Escáner Inteligente...</h2>
          <p className="text-xs text-neutral-400 mt-2 text-center max-w-xs px-4">
            Apunta a la imagen o empaque para desbloquear el modelo.
          </p>
        </div>
      )}

      {/* Visor de Cámara con MindAR (Solo activo mientras busca para liberar la cámara al detectar) */}
      {isScanning ? (
        <MindArViewer
          scale={0.001}
          onLoaded={handleLoaded}
          onTrackingChange={handleTrackingChange}
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" />
      )}

      {/* Retícula de escaneo animada */}
      {isScanning && !isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64 border-2 border-amber-400/40 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.15)] animate-pulse">
            {/* Esquinas destacadas */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

            {/* Línea láser de escaneo */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#fbbf24] animate-bounce" />
          </div>
          <p className="mt-6 text-sm font-semibold tracking-wide text-amber-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/20 shadow-lg">
            📷 Apunta al marcador de Cacao
          </p>
        </div>
      )}

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

        <div className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 border border-amber-400/40 text-amber-300 backdrop-blur-md">
          {detectedItem ? '✨ Marcador Detectado' : '🔍 Escaneando...'}
        </div>
      </header>

      {/* Tarjeta Modal que se dispara al detectar la imagen */}
      {detectedItem && (
        <div className="absolute inset-0 z-30 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900/95 border border-amber-500/30 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl backdrop-blur-xl">
            {/* Badge de éxito */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ¡Objetivo Reconocido!
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{detectedItem.title}</h3>
            <p className="text-xs text-neutral-400 mb-4">{detectedItem.subtitle}</p>

            {/* Vista previa 3D interactiva con Model Viewer */}
            <div className="w-full h-48 bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 relative mb-5 shadow-inner">
              <model-viewer
                ref={modelViewerRef}
                style={{ width: '100%', height: '100%' }}
                alt={detectedItem.title}
                src={detectedItem.glbSrc}
                ios-src={detectedItem.usdzSrc ? `${detectedItem.usdzSrc}#allowsContentScaling=0` : undefined}
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-placement="floor"
                ar-scale="fixed"
                camera-controls
                autoplay
                animation-loop
                shadow-intensity="1.5"
                environment-image="neutral"
                exposure="1.2"
                touch-action="pan-y"
              />
            </div>

            {/* Botón de lanzamiento AR (Compatible directo con iOS QuickLook y Android SceneViewer) */}
            {isIOS && detectedItem.usdzSrc ? (
              <a
                href={`${detectedItem.usdzSrc}#allowsContentScaling=0`}
                rel="ar"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl text-sm transition-all transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 mb-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                Proyectar en tu Habitación (AR iOS)
              </a>
            ) : (
              <button
                onClick={handleLaunchNativeAR}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl text-sm transition-all transform active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 mb-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                Proyectar en tu Habitación (AR)
              </button>
            )}

            {/* Botón secundario: Escanear otra imagen */}
            <button
              onClick={handleRescan}
              className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl text-xs transition-colors"
            >
              🔄 Escanear otro marcador
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
