import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const counter1Ref = useRef();
    const counter2Ref = useRef();
    const counter3Ref = useRef();

    const numbersForCounter3 = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
                arr.push(j);
            }
        }
        arr.push(0); // final 0
        return arr;
    }, []);

    useEffect(() => {
        function animate(counter, duration, delay = 0) {
            const numHeight = counter.querySelector('.num')?.clientHeight || 0;
            const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;

            gsap.to(counter, {
                y: -totalDistance,
                duration,
                delay,
                ease: 'power2.inOut',
            });
        }

        // Counter animations
        animate(counter3Ref.current, 15); // 0–9 twice and ends at 0
        animate(counter2Ref.current, 18); // goes through 0–9
        animate(counter1Ref.current, 5, 12); // only goes 0 to 1, delayed

        // Exit animations start AFTER 100 is shown + 1 sec wait => 17 + 1 = 18s
        const exitStart = 18;

        gsap.to('.digit', {
            top: '-150px',
            stagger: { amount: 1 },
            delay: exitStart,
            duration: 1.5,
            ease: 'power4.inOut',
        });

        gsap.from('.loader-1', {
            width: 0,
            duration: 18,
            ease: 'power2.inOut',
        });

        gsap.from('.loader-2', {
            width: 0,
            delay: 6,
            duration: 5,
            ease: 'power2.inOut',
        });

        gsap.to('.loader', { background: 'none', delay: exitStart, duration: 0.1 });
        gsap.to('.loader-1', { rotate: 90, y: -50, duration: 0.5, delay: exitStart });
        gsap.to('.loader-2', { x: -75, y: 75, duration: 0.5 }, `<`);
        gsap.to('.loader', { scale: 40, duration: 1, delay: exitStart + 1, ease: 'power2.inOut' });
        gsap.to('.loader', {
            rotate: 45,
            y: 500,
            x: 2000,
            duration: 1,
            delay: exitStart + 1,
            ease: 'power2.inOut',
        });

        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 0.5,
            delay: exitStart + 1.5,
            ease: 'power1.inOut',
        });

        gsap.delayedCall(exitStart + 2, () => {
            if (onComplete) onComplete();
        });
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black font-santoshi text-[#e5e5dd] pointer-events-none loading-screen z-[9999]">
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[50px] transform -translate-x-1/2 -translate-y-1/2 flex loader bg-[rgb(80,80,80)]">
                <div className="loader-1 bar bg-[#667067] h-[50px] w-[200px]" />
                <div className="loader-2 bar bg-[#667067] h-[50px] w-[100px]" />
            </div>

            <div
                className="fixed left-[50px] bottom-[50px] flex h-[100px] text-[100px] leading-[102px] font-normal counter"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100px, 0 100px)' }}
            >
                {/* Counter 1 */}
                <div ref={counter1Ref} className="counter-1 digit relative top-[-15px]">
                    <div className="num">0</div>
                    <div className="num relative right-[-25px]">1</div>
                </div>

                {/* Counter 2 */}
                <div ref={counter2Ref} className="counter-2 digit relative top-[-15px]">
                    {Array.from({ length: 11 }, (_, i) => (
                        <div key={i} className="num">{i % 10}</div>
                    ))}
                </div>

                {/* Counter 3 */}
                <div ref={counter3Ref} className="counter-3 digit relative top-[-15px]">
                    {numbersForCounter3.map((num, idx) => (
                        <div key={idx} className="num">{num}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
