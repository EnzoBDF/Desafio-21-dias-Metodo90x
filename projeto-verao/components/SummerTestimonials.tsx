import Image from "next/image";
import { SummerIcon } from "./SummerIcon";
import {
  GROUP_TESTIMONIALS,
  TEXT_TESTIMONIALS,
  VIDEO_TESTIMONIALS,
  type TextTestimonial,
  type VideoTestimonial,
} from "../lib/testimonials";

export function VideoTestimonialCard({ testimonial }: { testimonial: VideoTestimonial }) {
  const { video, label } = testimonial;
  return (
    <figure className="pcard testimonial-card video-testimonial">
      {video ? (
        <video
          className="testimonial-video"
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="none"
          width={360}
          height={640}
          aria-label={label}
        >
          {video.captions ? <track kind="captions" src={video.captions} srcLang="pt-BR" label="Português" default /> : null}
          Seu navegador não reproduz este vídeo. <a href={video.src}>Abrir o depoimento</a>.
        </video>
      ) : (
        <div className="testimonial-placeholder testimonial-placeholder--video">
          <span className="testimonial-placeholder-icon"><SummerIcon name="video" /></span>
          <span className="testimonial-coming-soon">Em breve</span>
        </div>
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function TextTestimonialCard({ testimonial, group = false }: { testimonial: TextTestimonial; group?: boolean }) {
  const { content, label } = testimonial;
  return (
    <figure className="pcard testimonial-card text-testimonial">
      {content?.kind === "image" ? (
        <Image className="testimonial-print" src={content.src} alt={content.alt} width={content.width} height={content.height} sizes={group ? "(max-width: 734px) calc(100vw - 64px), 240px" : "(max-width: 734px) calc(100vw - 64px), 510px"} />
      ) : content?.kind === "quote" ? (
        <blockquote className="testimonial-quote"><SummerIcon name="chat" /><p>{content.text}</p>{content.author ? <footer>{content.author}</footer> : null}</blockquote>
      ) : (
        <div className="testimonial-placeholder testimonial-placeholder--text">
          <span className="testimonial-placeholder-icon"><SummerIcon name="chat" /></span>
          <span className="testimonial-coming-soon">Depoimento em breve</span>
        </div>
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function SummerVideoTestimonials() {
  return <div className="grid vids testimonial-videos">{VIDEO_TESTIMONIALS.map(testimonial => <VideoTestimonialCard key={testimonial.id} testimonial={testimonial} />)}</div>;
}

export function SummerTextTestimonials() {
  const messages = TEXT_TESTIMONIALS.filter(testimonial => testimonial.content);
  const groupMessages = GROUP_TESTIMONIALS.filter(testimonial => testimonial.content);
  return (
    <>
      {messages.length ? <div className="grid mos testimonial-messages testimonial-messages--filled">{messages.map(testimonial => <TextTestimonialCard key={testimonial.id} testimonial={testimonial} />)}</div> : null}
      {groupMessages.length ? <>
        <div className="testimonial-group-heading"><h3>Mensagens da comunidade</h3></div>
        <div className="grid mos g4 testimonial-messages testimonial-group">{groupMessages.map(testimonial => <TextTestimonialCard key={testimonial.id} testimonial={testimonial} group />)}</div>
      </> : null}
    </>
  );
}
