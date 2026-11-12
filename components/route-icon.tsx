import type { Route } from "@/components/ranked-list";

/** Small line icons for how a peptide is taken. Decorative: the route is always written next to the icon. */
export function RouteIcon({ route, size = 18 }: { route: Route; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "shrink-0",
  };
  switch (route) {
    case "oral": // capsule
      return (
        <svg {...common}>
          <g transform="rotate(-45 12 12)">
            <path d="M12 7.5H7.5a4.5 4.5 0 0 0 0 9H12Z" fill="currentColor" fillOpacity="0.35" />
            <rect x="3" y="7.5" width="18" height="9" rx="4.5" />
            <path d="M12 7.5v9" />
          </g>
        </svg>
      );
    case "topical": // drop on skin
      return (
        <svg {...common}>
          <path d="M12 3.5c2.6 3.4 4.5 6 4.5 8.4a4.5 4.5 0 0 1-9 0c0-2.4 1.9-5 4.5-8.4Z" />
          <path d="M3.5 20.5h17" />
        </svg>
      );
    case "injected": // syringe
      return (
        <svg {...common}>
          <path d="m17 3 4 4" />
          <path d="m19 5-3 3" />
          <path d="M16 8 8.5 15.5 6 15l-.5-2.5L13 5Z" transform="translate(1 0)" />
          <path d="m6.5 17.5-3 3" />
          <path d="m10 9 2 2" />
        </svg>
      );
    case "nasal": // spray bottle
      return (
        <svg {...common}>
          <path d="M9 21h6v-9a3 3 0 0 0-6 0Z" />
          <path d="M10.5 9V5.5h3V9" />
          <path d="M12 5.5V3" />
          <path d="M16 3.5l2-1M16.5 5.5h2.5M16 7.5l2 1" />
        </svg>
      );
  }
}
