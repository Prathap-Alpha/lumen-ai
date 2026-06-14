/*
 * useReveal — IntersectionObserver-based scroll reveal.
 * Attach the returned ref to any element with class "reveal".
 * Adds "is-visible" once the element enters the viewport.
 */
import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options }
    );
    // Observe the element and any children with the "reveal" class
    if (el.classList.contains("reveal")) {
      observer.observe(el);
    }
    el.querySelectorAll<HTMLElement>(".reveal").forEach((child) => {
      observer.observe(child);
    });
    return () => observer.disconnect();
  }, [options]);
  return ref;
}
