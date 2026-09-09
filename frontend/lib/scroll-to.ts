import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function scrollToSection(id: string, offset = -88) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset });
    return;
  }

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY + offset,
    behavior: "smooth",
  });
}
