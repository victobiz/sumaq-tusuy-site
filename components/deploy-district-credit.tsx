import Image from "next/image"
import Link from "next/link"

type DeployDistrictCreditProps = {
  className?: string
  label?: string
}

export function DeployDistrictCredit({
  className = "",
  label = "CRAFTED WITH DEPLOY DISTRICT",
}: DeployDistrictCreditProps) {
  return (
    <Link
      href="https://deploydistrict.com"
      target="_blank"
      rel="noreferrer"
      className={[
        "group inline-flex items-center gap-2 rounded-xl border border-white/10",
        "bg-black px-3 py-2 text-primary-foreground/80 shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition",
        "hover:border-white/20 hover:bg-black/95",
        className,
      ].join(" ")}
      aria-label="Crafted with Deploy District"
    >
      <span className="hidden sm:block">
        <Image
          src="/deploy-district-credit.png"
          alt=""
          width={190}
          height={110}
          className="deploy-district-flash h-[62px] w-[108px] object-contain drop-shadow-[0_0_6px_rgba(245,158,11,0.28)]"
          aria-hidden="true"
        />
      </span>
      <span
        className="deploy-district-flash max-w-[8rem] text-left font-mono text-[8px] font-semibold uppercase tracking-[0.2em]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 18%, #EC4899 42%, #F43F5E 64%, #F59E0B 82%, #FCD34D 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {label}
      </span>
    </Link>
  )
}
