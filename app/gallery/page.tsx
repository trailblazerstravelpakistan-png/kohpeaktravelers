import { galleryImages } from "../data";
import { PageHero, SiteShell } from "../components/SiteChrome";

export const metadata = { title: "Gallery | Koh Peaks", description: "Travel photography from Swat, Kalam, Hunza, Khunjerab, Kumrat, Jahaz Banda and Mushkpuri." };

export default function GalleryPage() { return <SiteShell active="Gallery">
  <PageHero eyebrow="Scenes from the North" title="A Gallery Full of Wonder" copy="Rivers, ridges, villages, forests and moments that make every journey worth taking." image="/images/alpine-lake.webp"/>
  <section className="content-section gallery-page"><div className="container"><div className="intro-row"><div><div className="eyebrow">Explore the Collection</div><h2>Pakistan, one beautiful frame at a time</h2></div><p>Every region has its own light, rhythm and character. Wander through a visual journey across our favorite destinations.</p></div><div className="masonry-gallery">{galleryImages.map(([src, alt, label], index) => <figure className={`gallery-item gallery-size-${index % 5}`} key={`${src}-${label}`}><img src={src} alt={alt}/><figcaption><span>{label}</span><small>View from Northern Pakistan</small></figcaption></figure>)}</div></div></section>
  </SiteShell>; }
