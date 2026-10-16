import { EVIDENCE_PHOTOS } from "../lib/media";
import { SummerCTA } from "./SummerCTA";
import { SummerIcon } from "./SummerIcon";
import { SummerEvidenceSlider } from "./SummerEvidenceSlider";

export function SummerEvidenceSection() {
  const hasPhotos = EVIDENCE_PHOTOS.length > 0;

  return (
    <section
      id="historias"
      className="evidence section-space"
      data-section="evidencias"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CADA CORPO TEM UMA HISTÓRIA</p>
            <h2>
              Gente real.
              <br />
              <em>Caminhos únicos.</em>
            </h2>
          </div>
          <p className="media-intro">
            {hasPhotos
              ? "Registros de pessoas reais, respeitando a individualidade de cada processo."
              : "Em breve, este espaço vai receber fotos e registros reais de quem faz parte do projeto."}
          </p>
        </div>
        {hasPhotos ? (
          <SummerEvidenceSlider photos={EVIDENCE_PHOTOS} />
        ) : (
          <div className="evidence-gallery evidence-gallery--empty">
            {[1, 2, 3].map((number) => (
                <div className="evidence-placeholder" key={number}>
                  <span className="evidence-number" aria-hidden="true">
                    0{number}
                  </span>
                  <SummerIcon name="image" />
                  <p>
                    Registros reais<span>Fotos em breve</span>
                  </p>
                </div>
              ))}
          </div>
        )}
        <div className="media-footer">
          <p>
            {hasPhotos
              ? "Cada experiência é individual. Os registros não garantem resultados iguais."
              : "Este espaço será preenchido com registros reais e autorizados. Cada experiência é individual."}
          </p>
          <SummerCTA placement="evidencias" variant="dark">
            Quero começar meu Projeto Verão
          </SummerCTA>
        </div>
      </div>
    </section>
  );
}
