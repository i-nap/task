"use client";
import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Home() {
  const [activeCard, setActiveCard] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const totalWidth = container.getBoundingClientRect().width;
    const activeIndex = activeCard - 1;
    const gap = 16;
    const activeCardWidth = 592;
    const inactiveCardWidth = (totalWidth - activeCardWidth - gap * 2) / 2;

    let targetLeft = 0;
    for (let i = 0; i < activeIndex; i++) {
      targetLeft += inactiveCardWidth + gap;
    }
    targetLeft += 40;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(iconsRef.current, { left: targetLeft, opacity: 1 });
      circleRefs.current.forEach((circle) => {
        if (!circle) return;
        gsap.set(circle, { width: 900, height: 900, backgroundColor: "#E8D4D8" });
      });
    }

    const tl = gsap.timeline();

    tl.to(iconsRef.current, {

      left: targetLeft,
      duration: 1.2,
      ease: "back.inOut(1.5)",
    })
      .to(iconsRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.4)
      .to(iconsRef.current, { opacity: 1, duration: 0.3, ease: "power2.in" }, 0.6);


    circleRefs.current.forEach((circle, index) => {
      if (!circle) return;
      const isActive = index === activeIndex;
      tl.to(circle, {
        width: isActive ? 15 : 900,
        height: isActive ? 15 : 900,
        backgroundColor: isActive ? "#b73a4d" : "#E8D4D8",
        duration: 1,
        ease: "power2.inOut"
      }, 0);
    });

    titleRefs.current.forEach((titleDiv, index) => {
      if (!titleDiv) return;
      const isActive = index === activeIndex;

      tl.to(titleDiv, {
        right: isActive ? '40px' : '',
        top: isActive ? '' : '40px',
        bottom: isActive ? '40px' : '',
        left: isActive ? '' : '40px',
        duration: 1.2,
        ease: "cubic-bezier(0.4, -0.4, 0.2, 1)"
      }, 0);
    });
  }, [activeCard]);

  const cards = [
    { id: 1, title: "All Courses", count: "23", sub: "courses you're powering through right now." },
    { id: 2, title: "Upcoming Courses", count: "05", sub: "exciting new courses waiting to boost your skills." },
    { id: 3, title: "Ongoing Courses", count: "10", sub: "currently happening—don't miss out on the action!" }
  ];

  return (
    <main className="w-full flex min-h-screen items-center justify-center bg-white p-10">
      <div ref={containerRef} className="flex w-full justify-start items-stretch  gap-4 h-115 relative">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActiveCard(card.id)}
            style={{
              transition: "width 1.2s cubic-bezier(0.4, -0.4, 0.2, 1)",
              width: activeCard === card.id ? "592px" : "calc((100% - 592px - 32px) / 2)",
              flexShrink: 0
            }}
            className={`card cursor-pointer bg-[#C33241] rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative shadow-sm`}
          >
            <div className="card-content relative z-10 flex flex-col h-full">
              <div className="flex justify-end">
                {activeCard === card.id && (
                  <button className="text-md text-[#E8D4D8] font-medium px-5 py-2 rounded-full animate-[fadeIn_0.5s_ease_forwards_0.4s]">
                    View all Courses →
                  </button>
                )}
              </div>

              <div className={`mt-auto flex items-baseline gap-4 ${activeCard === card.id ? 'text-[#E8D4D8]' : 'text-[#C33241]'}`}>
                <span className={`text-9xl font-black tracking-tighter `}>{card.count}</span>
                <div
                  ref={(el) => {
                    if (el) titleRefs.current[card.id - 1] = el;
                  }}
                  className={`absolute flex  max-w-50 ${activeCard === card.id ? 'flex-col ' : 'rotate-180 [writing-mode:vertical-lr] flex-col-reverse max-h-50 '}`}
                  style={{
                    right: activeCard === card.id ? '40px' : 'auto',
                    top: activeCard === card.id ? 'auto' : '40px',
                    bottom: activeCard === card.id ? '40px' : 'auto',
                    left: activeCard === card.id ? 'auto' : '40px',
                  }}>
                  <h3 className={`font-bold text-2xl uppercase`}>
                    {card.title}
                  </h3>
                  <p className={`text-xl leading-tight`}>
                    {card.sub}
                  </p>
                </div>
              </div>
            </div>
            <div
              ref={(el) => {
                if (el) circleRefs.current[card.id - 1] = el;
              }}
              className="rounded-full absolute"
              style={{
                left: '-150px',
                bottom: '-110px'
              }}
            ></div>
          </div>

        ))}

        <div ref={iconsRef} className="tech-icons pointer-events-none absolute z-30 top-30">
          <Image src="/group.png" alt="Tech" width={460} height={93} className="object-contain" />
        </div>
      </div>
    </main>
  );
}