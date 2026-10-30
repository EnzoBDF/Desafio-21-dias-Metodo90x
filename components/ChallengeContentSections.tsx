import type { ReactNode } from "react";
import { CHECKOUT_URL, WHATSAPP_URL } from "@/lib/links";
import { CHALLENGE_DAYS } from "@/lib/challengeOffer";
import { Icon } from "./Icon";
import { TrackedLink } from "./TrackedActions";
import { displayTitle, primaryButton, sectionContainer } from "./styles";

function SectionCta({ placement, children }: { placement: string; children: ReactNode }) {
  return <div className="mt-8 flex justify-center"><TrackedLink className={`${primaryButton} max-w-[24rem]`} href={CHECKOUT_URL} eventName="checkout_started" eventProperties={{ placement, cta_id: `${placement}_primary`, intent: "purchase", destination: "checkout", offer_price: 97, currency: "BRL" }}>{children}</TrackedLink></div>;
}

export function ChallengePainSection() {
  return <section className="bg-page-texture py-14 text-white md:py-20" aria-labelledby="pain-title"><div className={`${sectionContainer} max-w-5xl`}>
    <h2 id="pain-title" className={`${displayTitle} mx-auto max-w-3xl text-center text-[clamp(2rem,7vw,3.5rem)] leading-[1.08]`}>Você termina o treino cansada. <span className="text-[#ff6418]">Mas ainda fica com aquela dúvida.</span></h2>
    <p className="mt-6 text-center text-lg font-semibold">“Estou fazendo o que preciso?”</p>
    <div className="mx-auto mt-6 max-w-3xl space-y-3 text-base leading-[1.8] text-white/80"><p>Salva um exercício no Instagram. Testa uma sequência que viu na academia. Troca o treino porque alguém disse que outro exercício é melhor.</p><p>E, mesmo se dedicando, continua sem uma direção clara.</p></div>
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">{["Qual exercício fazer?", "Quanto esforço colocar?", "Quando aumentar a dificuldade?", "Como encaixar tudo na sua rotina?"].map(item => <li className="bg-panel-texture flex items-center gap-3 rounded-lg border border-white/10 p-5 font-semibold" key={item}><Icon name="target" className="size-5 text-[#ff6418]" />{item}</li>)}</ul>
    <p className="mx-auto mt-7 max-w-3xl text-center text-base leading-[1.8] text-white/85">O Desafio Bumbum na Nuca foi criado para organizar essas respostas em um plano que você consiga seguir.</p>
    <SectionCta placement="pain">QUERO TREINAR COM DIREÇÃO</SectionCta>
  </div></section>;
}

export function ChallengeRoutineSection() {
  return <section className="bg-page-texture py-14 text-white md:py-20" aria-labelledby="routine-title"><div className={sectionContainer}>
    <h2 id="routine-title" className={`${displayTitle} text-center text-[clamp(2rem,7vw,3.5rem)] leading-[1.08]`}>Como o desafio entra <span className="text-[#ff6418]">na sua semana?</span></h2>
    <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Frequência", "5 treinos por semana"], ["Duração média", "1h15 por sessão"], ["Local", "Exclusivo para academia"], ["Equipamentos", "Equipamentos de academia"]].map(([title, value]) => <div key={title} className="bg-panel-texture rounded-xl border border-white/10 border-b-2 border-b-[#ff6418] p-6"><dt className="text-sm text-white/65">{title}</dt><dd className={`${displayTitle} mt-3 text-2xl leading-[1.15]`}>{value}</dd></div>)}</dl>
    <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-[1.8] text-white/80">Já faz musculação? Conte à equipe sobre sua rotina para orientar a integração com as sessões atuais, especialmente de membros inferiores. Não acrescente dois programas por conta própria.</p>
    <div className="bg-panel-texture mx-auto mt-8 max-w-4xl rounded-xl border border-white/10 p-6 md:p-8"><h3 className={`${displayTitle} text-2xl text-[#ff6418]`}>E o que esperar dos {CHALLENGE_DAYS} dias?</h3><p className="mt-4 text-base leading-[1.8] text-white/85">Um período para colocar o plano em prática, aprender a executar os exercícios, acompanhar sua progressão e construir consistência.</p><p className="mt-3 text-sm leading-[1.8] text-white/70">Mudanças de firmeza, volume e aparência acontecem em ritmos diferentes. O desafio é o começo de uma construção que pode continuar depois dele.</p></div>
    <SectionCta placement="routine">QUERO COMEÇAR MEU DESAFIO</SectionCta>
  </div></section>;
}

export function ChallengeSupportSection() {
  return <section className="bg-warm-texture py-14 text-white md:py-20" aria-labelledby="support-title"><div className={`${sectionContainer} grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center`}>
    <div><Icon name="shield" className="mb-5 size-12 text-[#ff6418]" /><p className={`${displayTitle} text-lg text-[#ff6418]`}>EQUIPE MÉTODO 90X</p><h2 id="support-title" className={`${displayTitle} mt-4 text-[clamp(2rem,7vw,3.3rem)] leading-[1.08]`}>Você tem com quem conversar <span className="text-[#ff6418]">no caminho.</span></h2></div>
    <div className="space-y-4 text-base leading-[1.8] text-white/85"><p>A avaliação inicial ajuda a equipe a conhecer seu nível, seus objetivos e a estrutura da academia em que você treina. Durante o desafio, você conta com orientações sobre a aplicação do programa.</p><p>Seu canal de suporte é o WhatsApp, com disponibilidade 24 horas durante os {CHALLENGE_DAYS} dias. Isso não significa resposta instantânea a cada mensagem.</p><p className="text-sm text-white/70">O direcionamento alimentar é uma dieta básica como recomendação, não um plano alimentar individualizado. Se precisar de atendimento nutricional individual, procure um nutricionista.</p><TrackedLink className="inline-flex min-h-12 items-center gap-3 border-b border-[#ff6418] py-3 font-semibold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" eventName="content_navigation_clicked" eventProperties={{ placement: "support", destination: "whatsapp", intent: "ask_question" }}><Icon name="whatsapp" className="size-5 text-[#ff6418]" /> FALE COM A EQUIPE ANTES DE PARTICIPAR</TrackedLink></div>
  </div></section>;
}

export function ChallengeGuaranteeSection() {
  return <section className="bg-warm-texture-reverse py-14 text-white md:py-20" aria-labelledby="guarantee-title"><div className={`${sectionContainer} max-w-4xl text-center`}>
    <Icon name="shield" className="mx-auto mb-5 size-12 text-[#ff6418]" /><h2 id="guarantee-title" className={`${displayTitle} text-[clamp(2rem,7vw,3.5rem)] leading-[1.08]`}>Você tem <span className="text-[#ff6418]">7 dias</span> para conhecer a experiência.</h2>
    <p className="mt-6 text-base leading-[1.8] text-white/85">Acesse o programa, veja como os treinos estão organizados e conheça a proposta. Se perceber que o desafio não é para você, solicite o reembolso dentro do prazo de 7 dias após a compra, pelo canal indicado na confirmação.</p>
    <SectionCta placement="guarantee">QUERO ENTRAR NO DESAFIO</SectionCta>
  </div></section>;
}

export function ChallengeClosingSection() {
  return <section className="bg-page-texture py-14 text-white md:py-20" aria-labelledby="closing-title"><div className={`${sectionContainer} max-w-5xl text-center`}>
    <h2 id="closing-title" className={`${displayTitle} text-[clamp(2rem,7vw,3.5rem)] leading-[1.1]`}>Você já sabe o que quer ver no espelho. <span className="text-[#ff6418]">Agora pode ter um plano para trabalhar nessa direção.</span></h2>
    <p className="mx-auto mt-6 max-w-3xl text-base leading-[1.8] text-white/80">Pare de deixar seu treino de glúteos depender do próximo exercício que aparecer no seu feed. Comece uma jornada com avaliação, sequência organizada e acompanhamento.</p>
    <p className={`${displayTitle} mt-6 text-2xl`}>{CHALLENGE_DAYS} dias de desafio. R$ 97 em pagamento único.</p>
    <SectionCta placement="closing">QUERO COMEÇAR MEU DESAFIO</SectionCta>
  </div></section>;
}
