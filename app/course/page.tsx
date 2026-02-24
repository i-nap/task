"use client";
import { useState, useLayoutEffect, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function CoursePage() {
    const [activeCard, setActiveCard] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const countSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const plusSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const arrowAnimationRefs = useRef<gsap.core.Timeline | null>(null);
    const isFirstRender = useRef(true);

    const cards = useMemo(() => [
        { id: 1, title: "All Courses", count: "23", sub: "courses you're powering through right now." },
        { id: 2, title: "Upcoming Courses", count: "05", sub: "exciting new courses waiting to boost your skills." },
        { id: 3, title: "Ongoing Courses", count: "10", sub: "currently happening—don't miss out on the action!" }
    ], []);
    
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
            .to(iconsRef.current, { opacity: 0.2, duration: 0.2, ease: "power2.out" }, 0.5)
            .to(iconsRef.current, { opacity: 1, duration: 0.2, ease: "power2.in" }, 0.6);


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
                right: isActive ? '8%' : '',
                top: isActive ? '' : '25%',
                bottom: isActive ? '5%' : '',
                left: isActive ? '' : '0px',
                color: isActive ? '#E8D4D8' : '#C33241',
                rotate: isActive ? 0 : -90,
                duration: 1.2,
                ease: "back.inOut(2)"
            }, 0);
        });

        countSpanRefs.current.forEach((countSpan, index) => {
            if (!countSpan) return;
            const isActive = index === activeIndex;

            tl.to(countSpan, {
                color: isActive ? '#E8D4D8' : '#C33241',
                duration: 1.2,
                ease: "back.inOut(1.5)"
            }, 0);
        });
    }, [activeCard, cards]);

    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
        if (activeCard === cardIndex + 1) return;

        const card = cardRefs.current[cardIndex];
        const plusSpan = plusSpanRefs.current[cardIndex];
        if (!card || !plusSpan) return;

        if (plusSpan.dataset.animated === 'true') return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < rect.width * 0.2) return;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const offsetX = (x - centerX) / 15;
        const offsetY = (y - centerY) / 15;

        plusSpan.dataset.animated = 'true';
        gsap.to(plusSpan, {
            x: offsetX,
            y: offsetY,
            duration: 0.8,
            ease: "power2.out"
        });
    };

    const handleCardMouseLeave = (cardIndex: number) => {
        const plusSpan = plusSpanRefs.current[cardIndex];
        if (!plusSpan) return;

        plusSpan.dataset.animated = 'false';
        gsap.to(plusSpan, {
            x: 0,
            y: 0,
            duration: 0.8
        });
    };

    const handleArrowHover = (arrowElement: HTMLSpanElement) => {
        if (arrowAnimationRefs.current) {
            arrowAnimationRefs.current.kill();
        }

        const tl = gsap.timeline({ repeat: -1 });
        tl.to(arrowElement, { x: 10, duration: 0.6 }, 0)
            .to(arrowElement, { x: 0, duration: 0.6 })

        arrowAnimationRefs.current = tl;
    };

    const handleArrowLeave = (arrowElement: HTMLSpanElement) => {
        if (arrowAnimationRefs.current) {
            arrowAnimationRefs.current.kill();
            arrowAnimationRefs.current = null;
        }
        gsap.to(arrowElement, { x: 0, duration: 0.3 });
    };

    return (

        <main className="flex min-h-screen flex-col bg-white p-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full mb-12 flex flex-col">
                <p className="text-[24px] text-[#414141]">Explore our classes and master trending skills!</p>
                <h1 className="text-[32px] font-bold">
                    Dive Into <span className="text-[#16a34a]">What&apos;s Hot Right Now!</span> 🔥
                </h1>
            </div>
            <div ref={containerRef} className="flex w-full justify-start items-stretch  gap-4 h-115 relative">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        ref={(el) => {
                            if (el) cardRefs.current[card.id - 1] = el;
                        }}
                        onClick={() => setActiveCard(card.id)}
                        onMouseMove={(e) => handleCardMouseMove(e, card.id - 1)}
                        onMouseLeave={() => handleCardMouseLeave(card.id - 1)}
                        style={{
                            transition: "width 1.2s cubic-bezier(0.4, -0.4, 0.2, 1)",
                            width: activeCard === card.id ? "592px" : "calc((100% - 592px - 32px) / 2)",
                            flexShrink: 0
                        }}
                        className={`card cursor-pointer bg-[#C33241] rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative shadow-sm group`}
                    >
                        <div className="card-content relative z-10 flex flex-col h-full">
                            <div className="flex justify-end">
                                {activeCard === card.id && (
                                    <button
                                        className="text-md text-[#E8D4D8] font-medium px-5 py-2 rounded-full animate-[fadeIn_0.5s_ease_forwards_0.4s] flex items-center gap-1"
                                        onMouseEnter={(e) => {
                                            const arrow = e.currentTarget.querySelector('span');
                                            if (arrow instanceof HTMLSpanElement) {
                                                handleArrowHover(arrow);
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const arrow = e.currentTarget.querySelector('span');
                                            if (arrow instanceof HTMLSpanElement) {
                                                handleArrowLeave(arrow);
                                            }
                                        }}
                                    >
                                        View all Courses <span className="inline-block">→</span>
                                    </button>
                                )}
                            </div>

                            <div className={`mt-auto flex items-baseline gap-4 ${activeCard === card.id ? 'text-[#E8D4D8]' : 'text-[#C33241]'}`}>
                                <div className="relative" ref={(el) => {
                                    if (el) countSpanRefs.current[card.id - 1] = el;
                                }}>
                                    <span
                                        className={`text-9xl font-black tracking-tighter`}
                                    >
                                        {card.count}
                                    </span>
                                    <span
                                        ref={(el) => {
                                            if (el) plusSpanRefs.current[card.id - 1] = el;
                                        }}
                                        className={`absolute -top-[6%] -right-[13%] text-4xl font-black`}
                                    >+</span>
                                </div>
                                <div
                                    ref={(el) => {
                                        if (el) titleRefs.current[card.id - 1] = el;
                                    }}
                                    className={`absolute flex  max-w-70 flex-col ${activeCard === card.id ? '' : 'max-h-60'}`}
                                >
                                    <h3 className={`font-bold text-2xl uppercase`}>
                                        {card.title}
                                    </h3>
                                    <p className={`text-md leading-tight`}>
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