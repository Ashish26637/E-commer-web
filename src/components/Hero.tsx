import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setCategory } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-100/70 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 bg-stone-200/60 px-2.5 py-1 rounded">
              <span>Spring / Summer 2026</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-900 font-bold">New Studio Essentials</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 leading-[1.15] text-balance">
              Everyday objects built with surgical intent and lasting utility.
            </h1>

            <p className="text-base text-stone-600 max-w-xl leading-relaxed">
              Curated workspace tools, tactile mechanical peripherals, organic heavyweights, and artisanal home objects. Designed for fast checkout and lifetime durability.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-stone-50 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm group cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setCategory('Workspace');
                  scrollToCatalog();
                }}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Workspace Desk Gear
              </button>

              <button
                onClick={() => {
                  setCategory('Audio & Tech');
                  scrollToCatalog();
                }}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Audio & Peripherals
              </button>
            </div>

            {/* Value Props */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-900 shrink-0" />
                <span>Fast 3-day shipping & easy returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
                <span>2-Year guarantee on all objects</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-stone-900 shrink-0" />
                <span>Instant 30-day exchanges</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=85"
                alt="Minimalist workspace setup"
                className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent text-white">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  Featured Centerpiece
                </div>
                <h3 className="text-lg font-bold text-white">Walnut Dual Monitor Riser</h3>
                <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">
                  Precision CNC milled solid walnut with integrated cable channel
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="font-mono text-base font-semibold text-white tabular-nums">$138</span>
                  <button
                    onClick={() => {
                      setCategory('Workspace');
                      scrollToCatalog();
                    }}
                    className="text-xs bg-white text-stone-950 hover:bg-stone-100 font-semibold px-3 py-1.5 rounded transition-colors"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
