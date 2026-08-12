import { displayTitle } from "./styles";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  align: "left" | "right";
  lineProgress?: number;
  progressStart?: number;
  progressEnd?: number;
};

const alignment = {
  right: {
    article: "mr-auto rounded-l-none rounded-r-lg pl-5 pr-16",
    number: "-right-6",
  },
  left: {
    article: "ml-auto rounded-l-lg rounded-r-none pl-16 pr-5",
    number: "-left-6",
  },
};

export function StepCard({
  number,
  title,
  description,
  align,
  lineProgress = 1,
  progressStart = 0,
  progressEnd = 1,
}: StepCardProps) {
  const classes = alignment[align];
  const revealAmount = Math.min(
    1,
    Math.max(0, (lineProgress - progressStart) / (progressEnd - progressStart)),
  );

  return (
    <article
      className={`relative z-10 flex min-h-24 max-w-[35rem] items-center bg-white py-4 text-left text-black shadow-xl motion-reduce:translate-y-0 motion-reduce:opacity-100 ${classes.article}`}
      style={{
        width: "calc(100% - 3.5rem)",
        opacity: revealAmount,
        transform: `translateY(${(1 - revealAmount) * 1}rem)`,
      }}
    >
      <span
        className={`${displayTitle} absolute top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full border-3 border-[#ff6418] bg-[#1f1f1f] text-[clamp(1.45rem,6vw,1.8rem)] leading-none text-white shadow-[0_0_0.85rem_rgba(0,0,0,0.38),0_0_0.95rem_rgba(255,100,24,0.65)] motion-reduce:scale-100 motion-reduce:opacity-100 ${classes.number}`}
        style={{
          opacity: revealAmount,
          transform: `translateY(-50%) scale(${0.55 + revealAmount * 0.45})`,
        }}
      >
        {number}
      </span>
      <div className="min-w-0">
        <h3
          className={`${displayTitle} text-[clamp(0.98rem,4.35vw,1.22rem)] leading-none`}
        >
          {title}
        </h3>
        <p className="mt-2 text-[clamp(0.9rem,3.7vw,1rem)] font-semibold leading-[1.25]">
          {description}
        </p>
      </div>
    </article>
  );
}
