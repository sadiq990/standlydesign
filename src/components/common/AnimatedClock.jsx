import { useEffect, useRef } from "react";

export default function AnimatedClock({ size = 24, color = "currentColor", strokeWidth = 2, speed = 15, style }) {
    const minuteRef = useRef();
    const hourRef = useRef();
    const startTime = useRef(Date.now());

    useEffect(() => {
        let raf;
        const animate = () => {
            const elapsed = (Date.now() - startTime.current) / 1000 * speed;
            const minuteDeg = (elapsed * 6) % 360;
            const hourDeg = (elapsed * 0.5) % 360;
            if (minuteRef.current) minuteRef.current.setAttribute("transform", `rotate(${minuteDeg}, 12, 12)`);
            if (hourRef.current) hourRef.current.setAttribute("transform", `rotate(${hourDeg},   12, 12)`);
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [speed]);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size} height={size}
            viewBox="0 0 24 24"
            fill="none" stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round" strokeLinejoin="round"
            style={style}
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="0.5" fill={color} />
            <line ref={minuteRef} x1="12" y1="12" x2="12" y2="5.5" />
            <line ref={hourRef} x1="12" y1="12" x2="12" y2="7.5" />
        </svg>
    );
}