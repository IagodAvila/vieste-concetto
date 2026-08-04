import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image";

type CampaignProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
};

export function Campaign({ id, eyebrow, title, description, image1, image1Alt, image2, image2Alt }: CampaignProps) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-10 md:py-20" id={id} aria-labelledby={`${id}-title`}>
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-5"><Image src={image1} alt={image1Alt} width={1000} height={1400} sizes="(min-width:768px) 42vw, 100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="aspect-3/4 w-full object-cover" /></div>
        <div className="md:col-span-3"><p className="eyebrow text-clay">{eyebrow}</p><h2 className="mt-3 font-serif text-7xl md:text-8xl" id={`${id}-title`}>{title}</h2><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{description}</p><a href="#novidades" className="button-secondary eyebrow mt-8 px-8 py-4">Explorar coleção</a></div>
        <div className="md:col-span-4"><Image src={image2} alt={image2Alt} width={1400} height={1000} sizes="(min-width:768px) 34vw, 100vw" placeholder="blur" blurDataURL={BLUR_DATA_URL} className="aspect-4/5 w-full object-cover" /></div>
      </div>
    </section>
  );
}
