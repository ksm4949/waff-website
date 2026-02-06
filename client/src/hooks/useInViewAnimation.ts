import { useEffect, useRef, useState } from "react";

type Options = {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

export function useInViewAnimation<T extends HTMLElement>(options: Options = {}) {
    const { threshold = 0.2, rootMargin = "0px 0px -10% 0px", once = true} = options;

    const ref = useRef<T | null>(null)
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if(!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting) {
                    setInView(true);
                    if(once) obs.disconnect();
                } else if(!once) {
                    setInView(false);
                }
            },
            { threshold, rootMargin}
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold, rootMargin, once]);
    
    return { ref, inView };
}