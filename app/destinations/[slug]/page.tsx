import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "../../data";
import { Icon, PageHero, SiteShell } from "../../components/SiteChrome";

export function generateStaticParams() { return destinations.map((item) => ({ slug: item.slug })); }

export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = destinations.find((destination) => destination.slug === slug);
  if (!item) notFound();
  const related = destinations.filter((destination) => destination.slug !== item.slug).slice(0, 3);
  return <SiteShell active="Destinations">
    <PageHero eyebrow={item.region} title={item.title} copy={item.tagline} image={item.image}/>
    <section className="content-section detail-intro"><div className="container detail-layout">
      <div className="detail-copy"><div className="eyebrow">The Experience</div><h2>{item.tagline}</h2><p className="lead-copy">{item.summary}</p><p>Travel with a carefully planned route, trusted local support and enough flexibility to pause for the views, conversations and unexpected moments that make a mountain journey memorable.</p><div className="highlight-list">{item.highlights.map((highlight) => <span key={highlight}><Icon name="badge" size={18}/>{highlight}</span>)}</div></div>
      <aside className="trip-facts"><div><Icon name="clock"/><span><small>Duration</small><strong>{item.duration}</strong></span></div><div><Icon name="camera"/><span><small>Best Time</small><strong>{item.bestTime}</strong></span></div><div><Icon name="map"/><span><small>Highest Point</small><strong>{item.altitude}</strong></span></div><Link className="button button-gold" href="/contact">Plan This Journey <Icon name="arrow" size={17}/></Link></aside>
    </div></section>
    <section className="split-story"><div className="container split-story-grid"><div className="story-image"><img src={item.secondaryImage} alt={`Scenery around ${item.title}`}/></div><div className="story-content"><div className="eyebrow light">Suggested Flow</div><h2>A journey with room to breathe</h2><div className="timeline">{item.itinerary.map((step) => <div key={step.day}><span>{step.day}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></div>)}</div></div></div></section>
    <section className="content-section related-section"><div className="container"><div className="intro-row"><div><div className="eyebrow">Continue Exploring</div><h2>More destinations you may love</h2></div></div><div className="related-grid">{related.map((destination) => <Link href={`/destinations/${destination.slug}`} key={destination.slug}><img src={destination.image} alt={destination.title}/><span>{destination.region}</span><h3>{destination.title}</h3></Link>)}</div></div></section>
  </SiteShell>;
}
