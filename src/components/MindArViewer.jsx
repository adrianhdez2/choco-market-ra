import React, { useEffect, useRef } from 'react';

/**
 * Componente React MindArViewer
 * Controla la escena MindAR anclada a la imagen target.
 */
export default function MindArViewer({
  scale = 0.5,
  onLoaded,
  onTrackingChange,
}) {
  const iframeRef = useRef(null);

  const postToAR = (message) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

  useEffect(() => {
    function handleMessage(event) {
      if (!event.data || typeof event.data !== 'object') return;

      switch (event.data.type) {
        case 'MINDAR_SCENE_LOADED':
          onLoaded?.();
          postToAR({ type: 'SET_SCALE', scale });
          break;
        case 'MINDAR_TARGET_FOUND':
          onTrackingChange?.(true, event.data.targetIndex ?? 0);
          break;
        case 'MINDAR_TARGET_LOST':
          onTrackingChange?.(false, event.data.targetIndex ?? 0);
          break;
        default:
          break;
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onLoaded, onTrackingChange, scale]);

  useEffect(() => {
    postToAR({ type: 'SET_SCALE', scale });
  }, [scale]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src="/mindar-frame.html"
        title="MindAR Scene Engine"
        className="w-full h-full border-0 absolute inset-0 z-0"
        allow="camera; accelerometer; gyroscope; xr-spatial-tracking"
      />
    </div>
  );
}
