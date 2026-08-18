import { useEffect, useRef } from "react";

type Module = {
  id: string;
  title: string;
  desc: string;
};

const MODULES: Module[] = [
  { id: "N_01", title: "Weby", desc: "Rychlé firemní weby a e-shopy na míru" },
  { id: "N_02", title: "Design", desc: "Vizuál, který si zákazník zapamatuje" },
  { id: "N_03", title: "Hosting", desc: "Stabilní provoz, zálohy, 99,9 % dostupnost" },
  { id: "N_04", title: "Podpora", desc: "Člověk na telefonu, ne ticket do prázdna" },
  { id: "N_05", title: "Bezpečnost", desc: "SSL, aktualizace, ochrana proti útokům" },
  { id: "N_06", title: "SEO", desc: "Aby vás lidé našli na Googlu první" },
];

export function OrbitEngine() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const carousel = carouselRef.current;
    const sphere = sphereRef.current;
    if (!scene || !carousel || !sphere) return;

    let angle = 0;
    let dragging = false;
    let velocity = 0;
    let lastX = 0;
    let frame = 0;
    const tilt = -10;
    const auto = -0.12;

    const down = (x: number) => {
      dragging = true;
      lastX = x;
      velocity = 0;
    };
    const move = (x: number) => {
      if (!dragging) return;
      velocity = (x - lastX) * 0.3;
      angle += velocity;
      lastX = x;
    };
    const up = () => {
      dragging = false;
    };

    const onMouseDown = (e: MouseEvent) => down(e.clientX);
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchStart = (e: TouchEvent) => down(e.touches[0]!.clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0]!.clientX);

    scene.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", up);
    scene.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", up);

    const loop = () => {
      if (!dragging) {
        if (Math.abs(velocity) > 0.05) {
          angle += velocity;
          velocity *= 0.95;
        } else {
          angle += auto;
        }
      }
      carousel.style.transform = `rotateX(${tilt}deg) rotateY(${angle}deg)`;

      const modules = carousel.querySelectorAll<HTMLElement>(".orbit-module");
      const step = 360 / modules.length;
      modules.forEach((el, i) => {
        const facing = Math.cos(((angle + i * step) * Math.PI) / 180);
        const t = Math.max(0, facing); // 0 = side/back, 1 = front
        const o = 0.06 + 0.94 * Math.pow(t, 1.1);
        el.querySelectorAll<HTMLElement>(".orbit-face").forEach((f) => {
          f.style.opacity = String(o);
        });
        const conn = el.querySelector<HTMLElement>(".orbit-connector");
        if (conn) conn.style.opacity = String(o * 0.55);
      });
      sphere.style.transform = `translate(-50%, -50%) rotateY(${-angle}deg) rotateX(${-tilt}deg)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", up);
      scene.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const step = 360 / MODULES.length;

  return (
    <div className="orbit-scene" ref={sceneRef} aria-hidden="true">
      <div className="orbit-carousel" ref={carouselRef}>
        <div className="orbit-core">
          <span className="orbit-ring r1" />
          <span className="orbit-ring r2" />
          <span className="orbit-ring r3" />
        </div>
        <div className="orbit-sphere" ref={sphereRef} />

        {MODULES.map((m, i) => (
          <div
            key={m.id}
            className="orbit-module"
            style={{ transform: `rotateY(${i * step}deg)` }}
          >
            <span className="orbit-connector" />
            <div className="orbit-card">
              <div className="orbit-face orbit-front">
                <div className="orbit-label">
                  <span className="orbit-dot" />
                  {m.id}
                </div>
                <div className="orbit-title">{m.title}</div>
                <div className="orbit-desc">{m.desc}</div>
                <div className="orbit-sub">[ ACTV ]</div>
              </div>
              <div className="orbit-face orbit-plate" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
