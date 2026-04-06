"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const carRef = useRef<HTMLImageElement>(null);
const r1 = useRef<HTMLSpanElement>(null);
const r2 = useRef<HTMLSpanElement>(null);
const statsRef = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const car = carRef.current;
if (!car) return;

    // ENTRY
    gsap.from([r1.current, r2.current], {
      opacity: 0,
      y: 80,
      duration: 1.2,
      stagger: 0.25,
      ease: "power4.out",
    });

    gsap.from(statsRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      stagger: 0.15,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.to(car, {
      opacity: 1,
      duration: 0.8,
      delay: 0.2,
    });

    // SCROLL TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: car,
        start: "top center",
        end: "+=2200",
        scrub: 1.2,
      },
    });

    tl.to(car, {
      x: "120vw",
      rotate: 1.5,
      ease: "power3.out",
    }, 0);

    tl.to(gridRef.current, {
      y: "-20%",
      opacity: 0.6,
      ease: "none",
    }, 0);

    // TEXT REVEAL (FAST)
    ScrollTrigger.create({
      trigger: car,
      start: "top center",
      end: "+=2200",
      scrub: true,
      onUpdate: (self) => {
        const eased = gsap.parseEase("power4.out")(self.progress);
const fast = Math.min(eased * 2, 1);
const clip = 100 - fast * 100;

if (r1.current) r1.current.style.clipPath = `inset(0 ${clip}% 0 0)`;
if (r2.current) r2.current.style.clipPath = `inset(0 ${clip}% 0 0)`;
      },
    });

    // POPUPS (CAR POSITION BASED)
    ScrollTrigger.create({
      trigger: car,
      start: "top center",
      end: "+=2200",
      scrub: true,
      onUpdate: () => {
        const rect = car.getBoundingClientRect();
        const vw = window.innerWidth;

        const carCenter = (rect.left + rect.width / 2) / vw;

        const triggerPoints = [0.2, 0.35, 0.55, 0.75];

        statsRef.current.forEach((el, i) => {
          const dist = Math.abs(carCenter - triggerPoints[i]);

          if (dist < 0.12) {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: "back.out(2.2)",
              overwrite: "auto",
            });
          } else {
            gsap.to(el, {
              opacity: 0,
              y: 50,
              scale: 0.85,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      },
    });

  }, []);

  return (
    <div className="h-[500vh] bg-[#07080a] text-white overflow-x-hidden">

      {/* HERO */}
      <section className="sticky top-0 h-screen flex flex-col">

        {/* NAV */}
        <nav className="flex justify-between px-12 py-6 border-b border-white/10 z-20">
          <div className="tracking-[0.25em] text-[#d4f542] text-lg font-semibold">
            ITZFIZZ
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-white/50">
            <span>Work</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* STAGE */}
        <div className="flex-1 relative overflow-hidden">

          {/* GRID */}
          <div
            ref={gridRef}
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* HEADLINE */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">

            <h1 className="text-[13vw] font-bold tracking-[0.1em] text-white/5 leading-none relative">
              WELCOME
              <span
                ref={r1}
                className="absolute inset-0 text-white"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                WELCOME
              </span>
            </h1>

            <h1 className="text-[13vw] font-bold tracking-[0.1em] text-white/5 leading-none relative">
              ITZFIZZ
              <span
                ref={r2}
                className="absolute inset-0 text-white"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                ITZFIZZ
              </span>
            </h1>
          </div>

          {/* CAR */}
          <img
            ref={carRef}
            src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
            className="absolute top-1/2 -translate-y-[54%] w-[32vw] left-[-35vw] opacity-0 drop-shadow-[0_40px_80px_rgba(212,245,66,0.25)]"
            alt="car"
          />

          {/* POPUPS (UPDATED UI) */}
          {[
            { num: "58", label: "Increase in pick-up usage" },
            { num: "27", label: "Growth in conversions" },
            { num: "23", label: "Drop in support calls" },
            { num: "40", label: "Boost in satisfaction" },
          ].map((item, i) => (
            <div
              key={i}
             ref={(el) => {
  if (el) statsRef.current[i] = el;
}}
              className={`absolute 
                bg-[#08090b]/90 backdrop-blur-xl
                border border-[#d4f542]/20
                px-7 py-6 rounded-xl
                min-w-[240px] max-w-[260px]
                opacity-0 translate-y-8 scale-90
                shadow-[0_25px_80px_rgba(212,245,66,0.18)]
                transition-all duration-500 ease-out

                ${i === 0 ? "top-[16%] left-[6%]" : ""}
                ${i === 1 ? "bottom-[18%] left-[8%]" : ""}
                ${i === 2 ? "top-[14%] right-[6%]" : ""}
                ${i === 3 ? "bottom-[20%] right-[8%]" : ""}
              `}
            >
              <div className="flex items-end gap-1">
                <span className="text-[56px] font-bold text-[#d4f542] leading-none">
                  {item.num}
                </span>
                <span className="text-[28px] text-[#d4f542] mb-[6px]">%</span>
              </div>

              <p className="text-[12.5px] text-white/60 mt-2 leading-relaxed">
                {item.label}
              </p>

              <div className="absolute top-3 right-3 w-2 h-2 bg-[#d4f542] rounded-full opacity-80"></div>
              <div className="absolute inset-0 rounded-xl border border-[#d4f542]/10 pointer-events-none"></div>
            </div>
          ))}

        </div>
      </section>

      {/* NEXT */}
      <div className="h-screen flex flex-col items-center justify-center gap-4 border-t border-white/10">
        <h2 className="text-5xl tracking-wide">LET'S BUILD TOGETHER</h2>
        <p className="text-white/50">Itzfizz Digital — Where Ideas Take Shape</p>
      </div>
    </div>
  );
}