import { useEffect, useRef } from "react";


const IN = 800; 
const EX = 3300; 
const TOTAL = 4100; 
const HOLE = [16, 17]; 
const N = 220;
const W0 = [(116.61 - 150) * 0.36 + 16, (183.91 - 150) * 0.36 + 16];
const R0 = 6.5 * 0.36;
const W1 = [19.1, 26.26],
  W2 = [28.24, 26.26],
  R = 2.25;

const ez = {
  io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  bounce: (t) => {
    const n = 7.5625,
      d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  },
};

const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const poly = (pts) =>
  "M" + pts.map((p) => p[0].toFixed(3) + " " + p[1].toFixed(3)).join("L") + "Z";
const mix = (a, b, k) =>
  a.map((p, i) => [p[0] + (b[i][0] - p[0]) * k, p[1] + (b[i][1] - p[1]) * k]);
const sample = (el, n, f) => {
  const L = el.getTotalLength(),
    o = [];
  for (let i = 0; i < n; i++) {
    const p = el.getPointAtLength((L * i) / n);
    o.push(f ? f(p) : [p.x, p.y]);
  }
  return o;
};
// logo 1 (300x300) -> repère du logo 2 (32x32)
const map = (p) => [(p.x - 150) * 0.36 + 16, (p.y - 150) * 0.36 + 16];

export function AnimationLogo({ className, style }) {
  const svgRef = useRef(null);
  const morph = useRef(null);
  const final = useRef(null);
  const cart = useRef(null);
  const label = useRef(null);
  const prod = useRef(null);
  const w1 = useRef(null);
  const w2 = useRef(null);
  const a1 = useRef(null);
  const a2 = useRef(null);
  const dist = useRef({ in: 66, out: 94 });
  useEffect(() => {
    const A1 = sample(a1.current, N, map);
    const A2 = sample(a2.current, N, map);
    const B1 = sample(final.current, N);

    let best = 1e9,
      bo = 0,
      rev = false;
    for (const r of [false, true]) {
      const S = r ? [...A1].reverse() : A1;
      for (let o = 0; o < N; o++) {
        let c = 0;
        for (let i = 0; i < N; i++) {
          const a = S[(i + o) % N],
            b = B1[i];
          c += (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
        }
        if (c < best) {
          best = c;
          bo = o;
          rev = r;
        }
      }
    }
    const S1 = rev ? [...A1].reverse() : A1;
    const C1 = Array.from({ length: N }, (_, i) => S1[(i + bo) % N]);
    const HOLEPTS = Array.from({ length: N }, () => HOLE);
    const sparks = svgRef.current.querySelectorAll(".sp");

    function frame(t) {
      const off =
        t < IN
          ? -dist.current.in * (1 - ez.out(seg(t, 0, IN)))
          : t < EX
            ? 0
            : dist.current.out * ez.io(seg(t, EX, TOTAL));

      const m = ez.io(seg(t, 0, 1200));
      morph.current.setAttribute(
        "d",
        poly(mix(C1, B1, m)) + poly(mix(A2, HOLEPTS, m)),
      );
      final.current.setAttribute("opacity", m >= 1 ? 1 : 0);
      morph.current.setAttribute("opacity", m >= 1 ? 0 : 1);

      const a = ez.out(seg(t, 200, 1300));
      const roll = seg(t, 2200, 3000);
      const ex = (off / R) * 57.3;

      const x1 = W0[0] + (W1[0] - W0[0]) * a;
      const y1 = W0[1] + (W1[1] - W0[1]) * a;
      const r1 = R0 + (R - R0) * a;
      w1.current.setAttribute(
        "transform",
        `translate(${x1} ${y1}) rotate(${((x1 - W0[0]) / r1) * 57.3 + ez.io(roll) * 360 + ex}) scale(${r1 / R})`,
      );

      const b = ez.out(seg(t, 500, 1600));
      const x2 = W0[0] + (W2[0] - W0[0]) * b;
      const y2 = W0[1] + (W2[1] - W0[1]) * b;
      const s2 = b > 0 ? R0 / R + (1 - R0 / R) * b : 0.001;
      w2.current.setAttribute(
        "transform",
        `translate(${x2} ${y2}) rotate(${((x2 - W0[0]) / R) * 57.3 + ez.io(roll) * 360 + ex}) scale(${s2})`,
      );

      const spo = Math.min(
        1,
        seg(t, 200, 300) * (1 - seg(t, 1400, 1600)) +
          (roll > 0 && roll < 1 ? 1 : 0) +
          (t < IN || t >= EX ? 1 : 0),
      );
      sparks.forEach((e) => e.setAttribute("opacity", spo));

      const p = seg(t, 1600, 2300);
      const dy = -13 * (1 - ez.bounce(p));
      prod.current.setAttribute("opacity", Math.min(1, p * 4));
      prod.current.setAttribute("transform", `translate(0 ${dy})`);

      const sh = Math.sin(seg(t, 2200, 3000) * Math.PI) * 0.9;
      cart.current.setAttribute("transform", `translate(${sh + off} 0)`);

      label.current.setAttribute("opacity", seg(t, 2200, 2500));
    }

    const measure = () => {
      const { width: w, height: h } = svgRef.current.getBoundingClientRect();
      if (!w || !h) return;
      const half = w / Math.min(w / 96, h / 32) / 2;
      dist.current = { in: half + 18, out: half + 46 };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(svgRef.current);

    const t0 = performance.now();
    let raf;
    const loop = (n) => {
      frame((n - t0) % TOTAL);
      raf = requestAnimationFrame(loop);
    };
    frame(0);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="-32 0 96 32"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Logo devShop animé"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        <g ref={cart}>
          <text
            ref={label}
            x="-3"
            y="15"
            textAnchor="end"
            dominantBaseline="middle"
            fill="#7659bd"
            opacity="0"
            style={{
              font: "700 10px system-ui, -apple-system, 'Segoe UI', sans-serif",
              letterSpacing: "0.1px",
            }}
          >
            Order now
          </text>
          <path ref={morph} fill="#7659bd" fillRule="evenodd" />
          <path
            ref={final}
            fill="#7659bd"
            opacity="0"
            d="M11.6,9.62c1.8,7.07,6.86,9.48,13.6,8.55.81-.11,1.46-.76,1.54-1.57.35-3.47-.54-7.03-2.44-9.95-.88-1.36.12-3.15,1.74-3.15h.33c.54,0,1.05.21,1.44.58,4.06,3.87,4.31,11.37,2.82,16.77-.16.56-.57,1.03-1.12,1.22-10.65,3.61-20.99-1.4-22.82-12.82,0,0,0,0,0-.01-.65-1.73-2.46-1.26-3.97-1.23-2.87.06-2.95-4.15-.1-4.31,3.83-.23,6.8-.21,8.35,4.11"
          />
          <g ref={prod} opacity="0">
            <rect
              x="17.5"
              y="7.61"
              width="5"
              height="8.55"
              rx="1.42"
              fill="#7659bd"
              transform="translate(-2.22 4.99) rotate(-13.49)"
            />
          </g>
          <g ref={w1}>
            <circle r="2.25" fill="#7659bd" />
            <rect
              className="sp"
              x="-.35"
              y="-2.25"
              width=".7"
              height="4.5"
              fill="#fff"
            />
          </g>
          <g ref={w2}>
            <circle r="2.25" fill="#7659bd" />
            <rect
              className="sp"
              x="-.35"
              y="-2.25"
              width=".7"
              height="4.5"
              fill="#fff"
            />
          </g>
        </g>
      </svg>

      {}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <path
          ref={a1}
          d="M173.36,126.65c-16.35-16.34-40.01-20.96-60.46-13.8l-.06.07c-7.14,20.45-2.52,44.09,13.81,60.43,16.36,16.35,40.01,20.95,60.48,13.78h0c7.17-20.47,2.57-44.12-13.78-60.48Z"
        />
        <path
          ref={a2}
          d="M176.09,176.08h-.01c-14,2.62-29.01-1.49-39.84-12.32-10.64-10.65-14.79-25.32-12.46-39.11.04-.25.08-.49.13-.74h.01c14-2.61,29.01,1.5,39.85,12.33,10.83,10.83,14.94,25.84,12.32,39.84Z"
        />
      </svg>
    </div>
  );
}
