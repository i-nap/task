'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Props {
    word1: string;
    word2: string;
    word3: string;
    delay?: number;
}

export default function TextAnimation({ word1, word2, word3, delay = 0 }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const services = [word1, word2, word3];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>('.word');
            
            const tl = gsap.timeline({ 
                repeat: -1, 
                delay: delay 
            });

            words.forEach((word) => {
                tl.fromTo(
                    word,
                    { y: -100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "expo.out",
                        duration: 1,
                    }
                );
                
                tl.to(
                    word, 
                    {
                        delay: 2,
                        y: 100,
                        opacity: 0,
                        ease: "expo.in",
                        duration: 1,
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [word1, word2, word3, delay]);

    return (
        <div className="w-full">
            <div ref={containerRef} className="relative h-10 md:h-14 w-full overflow-hidden">
                {services.map((service, wordIndex) => (
                    <div 
                        key={wordIndex} 
                        className="word absolute top-0 right-0 w-full text-right text-4xl md:text-5xl font-bold tracking-tight text-gray-900 opacity-0"
                    >
                        {service}
                    </div>
                ))}
            </div>
        </div>
    );
}