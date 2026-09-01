import React from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 'abanico',
    title: 'Abanico',
    alt: 'Artesania tabasqueña',
    src: './models/abanico.glb',
    poster: './posters/abanico.webp',
    animated: false,
  },
  {
    id: 'jicara',
    title: 'Jícara labrada',
    alt: 'Artesania tabasqueña',
    src: './models/jicara.glb',
    poster: './posters/jicara.webp',
    animated: false,
  },
  {
    id: 'doom',
    title: 'Dooooom',
    alt: 'Doom',
    src: './models/doomAnimado180.glb',
    iosSrc: './models/DOOMSHAPE.usdz',
    poster: './posters/doom.webp',
    animated: true,
  },
  {
    id: 'doom-180',
    title: 'Doom Animado 180',
    alt: 'Doom',
    src: './models/doomAnimado180.glb',
    iosSrc: './models/doomUSDZ.usdz',
    poster: './posters/doomA180.webp',
    animated: true,
  },
  {
    id: 'doom-animated',
    title: 'Doom Animado',
    alt: 'Doom',
    src: './models/doomAnimated.glb',
    poster: './posters/doomA.webp',
    animated: true,
  },
  {
    id: 'doom-animated-sin-hueso',
    title: 'Doom Animado sin Hueso',
    alt: 'Doom',
    src: './models/doomsinhueso.glb',
    poster: './posters/doomA.webp',
    animated: true,
  },
  {
    id: 'doom-animated-sin-hueso-ios',
    title: 'Doom IOS USDC (Ios)',
    alt: 'Doom',
    src: './models/doomV6.glb',
    iosSrc: './models/doomIOS.usdc',
    poster: './posters/doomA.webp',
    animated: true,
  },
  {
    id: 'doom-animated-sin-hueso-ios-v6',
    title: 'Doom Animado sin Hueso V6',
    alt: 'Doom',
    src: './models/doomV6.glb',
    poster: './posters/doomA.webp',
    animated: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col items-center py-10 px-4">
      <header className="text-center max-w-2xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
          Choco Market Realidad Aumentada (RA)
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base">
          Explora nuestros modelos 3D interactivos con soporte de Realidad Aumentada.
        </p>
      </header>

      {/* Banner de acceso a AR.js con marcador (compatible iOS) */}
      <section className="w-full max-w-4xl mb-10">
        <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              100% Compatible con iOS & Android
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              🎯 Experiencia AR con Marcador
            </h2>
            <p className="text-orange-100 text-sm max-w-xl">
              Visualiza los modelos animados de Doom en tiempo real apuntando tu cámara a un marcador físico.
            </p>
          </div>
          <Link
            to="/ar"
            className="whitespace-nowrap px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 font-semibold rounded-xl shadow transition duration-200 hover:scale-105 active:scale-95"
          >
            Iniciar Experiencia AR →
          </Link>
        </div>
      </section>

      {/* Galería de Modelos */}
      <section className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {PRODUCTS.map((item) => (
            <article
              key={item.id}
              className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold text-neutral-800 mb-3 text-center">
                {item.title}
              </h3>
              
              <div className="w-full h-64 rounded-xl overflow-hidden bg-neutral-100 relative flex items-center justify-center">
                <model-viewer
                  style={{ width: '100%', height: '100%' }}
                  alt={item.alt}
                  src={item.src}
                  ios-src={item.iosSrc}
                  poster={item.poster}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  touch-action="pan-y"
                  shadow-intensity="1"
                  {...(item.animated ? { autoplay: true, 'animation-loop': true } : {})}
                />
              </div>

              <div className="w-full mt-4 flex items-center justify-between text-xs text-neutral-500 px-1">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.animated ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                  {item.animated ? 'Animado' : 'Estático'}
                </span>
                {item.iosSrc && (
                  <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded text-[11px] font-medium">
                    USDZ Incluido
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
