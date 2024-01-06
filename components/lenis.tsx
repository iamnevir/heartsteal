"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export const Lenify = () => {
  const lenis = useRef<any>(null);

  useEffect(() => {
    lenis.current = new Lenis({ duration: 2, smoothTouch: true });
    function raf(time: any) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.current.destroy();
      lenis.current = null;
    };
  }, []);

  return <></>;
};
