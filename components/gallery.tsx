'use client';
import React, { useRef, useState, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';

export default function DraggableGallery() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    
    const [progress, setProgress] = useState<number>(0);

    const images: string[] = ['/1.png', '/2.png', '/1.png', '/2.png'];

    const handleScroll = () => {
        const node = sliderRef.current;
        if (node) {
            const maxScroll = node.scrollWidth - node.clientWidth;
            if (maxScroll <= 0) return;
            setProgress(node.scrollLeft / maxScroll);
        }
    };

    const onMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const stopDragging = () => setIsDragging(false);

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; 
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const onTouchStart = (e: TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };

    const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="w-full relative mb-24 overflow-hidden">
            <div
                ref={sliderRef}
                onMouseDown={onMouseDown}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onMouseMove}
                onTouchStart={onTouchStart}
                onTouchEnd={stopDragging}
                onTouchMove={onTouchMove}
                onScroll={handleScroll}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    paddingLeft: 'max(24px, calc((100vw - 1152px) / 2 + 24px))',
                    paddingRight: 'max(24px, calc((100vw - 1152px) / 2 + 24px))'
                }}
                className={`flex gap-4 overflow-x-auto items-stretch w-full select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                } [&::-webkit-scrollbar]:hidden`}
            >
                {images.map((src, index) => (
                    <div key={index} className="relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-75 md:h-112.5 shrink-0 rounded-2xl overflow-hidden">
                        <Image
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 85vw, 70vw"
                            draggable={false}
                            className="object-cover pointer-events-none"
                        />
                    </div>
                ))}
            </div>

            {/* Progress Bar Container */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="w-full h-0.5 bg-gray-200 mt-8 rounded-full relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gray-800 rounded-full transition-transform duration-75 ease-out"
                        style={{
                            width: '25%',
                            // We use transform for better performance than 'left' or 'width'
                            transform: `translateX(${progress * 300}%)`
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}