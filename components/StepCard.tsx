import { displayTitle, glow } from "./styles";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
  align: "left" | "right";
};

const alignment = {
  right: {
    article:
      "mr-auto rounded-l-none rounded-r-lg pl-5 pr-16 lg:ml-[calc(50%_+_2.5rem)] lg:mr-0 lg:rounded-lg lg:pl-7 lg:pr-8",
    number: "-right-6 lg:-left-[4.5rem] lg:right-auto",
  },
  left: {
    article:
      "ml-auto rounded-l-lg rounded-r-none pl-16 pr-5 lg:ml-0 lg:mr-[calc(50%_+_2.5rem)] lg:rounded-lg lg:pl-8 lg:pr-7",
    number: "-left-6 lg:-right-[4.5rem] lg:left-auto",
  },
};

export function StepCard({
  number,
  title,
  description,
  align,
}: StepCardProps) {
  const classes = alignment[align];

  return (
    <article
      className={`relative z-10 flex min-h-24 w-[calc(100%_-_3.5rem)] max-w-[35rem] items-center bg-white py-4 text-left text-black lg:min-h-28 lg:w-[min(31rem,calc(50%_-_3rem))] ${glow.darkCard} ${classes.article}`}
    >
      <span
        className={`${displayTitle} absolute top-1/2 grid size-14 -translate-y-1/2 place-items-center rounded-full border-3 border-[#ff6418] bg-[#1f1f1f] text-[clamp(1.45rem,6vw,1.8rem)] leading-none text-white ${glow.orangeRing} ${classes.number}`}
      >
        {number}
      </span>
      <div className="min-w-0">
        <h3
          className={`${displayTitle} text-[clamp(0.98rem,4.35vw,1.22rem)] leading-none lg:text-[1.45rem]`}
        >
          {title}
        </h3>
        <p className="mt-2 text-[clamp(0.9rem,3.7vw,1rem)] font-semibold leading-[1.25] lg:text-[1.05rem]">
          {description}
        </p>
      </div>
    </article>
  );
}
