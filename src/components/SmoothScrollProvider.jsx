import { ReactLenis } from 'lenis/react';
import { frame, cancelFrame } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        function update({ timestamp }) {
            lenisRef.current?.lenis?.raf(timestamp);
        }
        frame.update(update, true); // Lenis ko framer-motion ke animation frame se sync karo
        return () => cancelFrame(update);
    }, []);

    return (
        <ReactLenis ref={lenisRef} root options={{ autoRaf: false, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
