import React, { useEffect, useRef } from 'react';

/**
 * Componente ArViewer para renderizar y controlar la escena AR.js / A-Frame de forma encapsulada.
 *
 * @param {Object} props
 * @param {string} props.activeModel - Identificador del modelo 3D activo ('doom-animated' | 'doom-180')
 * @param {number} props.scale - Factor de escala del modelo (ej. 0.2)
 * @param {function} [props.onLoaded] - Callback disparado cuando la escena A-Frame termina de cargar
 * @param {function} [props.onTrackingChange] - Callback disparado al encontrar o perder el marcador (isTracking, markerId)
 */
export default function ArViewer({
  activeModel = 'doom-animated',
  scale = 0.5,
  onLoaded,
  onTrackingChange,
}) {
  const iframeRef = useRef(null);

  // Escuchar mensajes desde el motor AR
  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== 'object') return;

      switch (event.data.type) {
        case 'AR_SCENE_LOADED':
          onLoaded?.();
          // Sincronizar el estado inicial de modelo y escala
          postToAR({ type: 'SWITCH_MODEL', model: activeModel });
          postToAR({ type: 'SET_SCALE', scale });
          break;
        case 'AR_MARKER_FOUND':
          onTrackingChange?.(true, event.data.marker || 'marker');
          break;
        case 'AR_MARKER_LOST':
          onTrackingChange?.(false, null);
          break;
        default:
          break;
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onLoaded, onTrackingChange, activeModel, scale]);

  // Enviar mensaje al iframe AR
  const postToAR = (message) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

  // Sincronizar cambio de modelo
  useEffect(() => {
    postToAR({ type: 'SWITCH_MODEL', model: activeModel });
  }, [activeModel]);

  // Sincronizar cambio de escala
  useEffect(() => {
    postToAR({ type: 'SET_SCALE', scale });
  }, [scale]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src="/ar-frame.html"
        title="AR.js Scene Engine"
        className="w-full h-full border-0 absolute inset-0 z-0"
        allow="camera; accelerometer; gyroscope; xr-spatial-tracking"
      />
    </div>
  );
}
