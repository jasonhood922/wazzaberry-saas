export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {/* berry cluster of dots */}
      <circle cx="20" cy="12" r="4" fill="#e11d54" />
      <circle cx="13" cy="18" r="4" fill="#f43f6b" />
      <circle cx="27" cy="18" r="4" fill="#f43f6b" />
      <circle cx="16" cy="26" r="4" fill="#be1245" />
      <circle cx="24" cy="26" r="4" fill="#be1245" />
      <circle cx="20" cy="33" r="3" fill="#9f1240" />
      {/* radar arc */}
      <path
        d="M30 6 A 14 14 0 0 1 36 14"
        stroke="#ff97b1"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32.5 2.5 A 19 19 0 0 1 39.5 12"
        stroke="#ffc6d4"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
