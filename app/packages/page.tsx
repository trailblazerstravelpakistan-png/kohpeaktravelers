import Link from "next/link";
import { packages, dayTours } from "../data";
import { Icon, PageHero, SiteShell } from "../components/SiteChrome";

export const metadata = { title: "Tour Packages | Koh Peaks", description: "Curated private and small-group tours across Northern Pakistan." };

export default function PackagesPage() {
  return <SiteShell active="Packages">
    <PageHero eyebrow="Curated for You" title="Tours Built Around Real Experiences" copy="Thoughtful routes, trusted guidance and flexible trips for couples, families and groups." image="/images/boat-lake.webp"/>
    <section className="content-section" style={{ paddingBottom: 0 }}><div className="container"><div className="intro-row"><div><div className="eyebrow">Featured Tours</div><h2>Trips you can book right now</h2></div><p>Group tours with transport, accommodation and a professional guide included. Reserve your seat before the confirmation deadline.</p></div>
      <div className="package-grid">{dayTours.map((tour) => <article className="package-card" key={tour.slug}><Link className="package-image" href={`/tours/${tour.slug}`}><img src={tour.image} alt={tour.title}/><span>{tour.subtitle}</span></Link><div className="package-body"><h2>{tour.title} — {tour.subtitle}</h2><div className="package-facts"><span><Icon name="clock" size={17}/>{tour.date ?? tour.route}</span><span><Icon name="map" size={17}/>{tour.altitude}</span></div><div className="package-bottom"><strong>{tour.price ?? "Contact for pricing"}</strong><Link href={`/tours/${tour.slug}`}>View Details <Icon name="arrow" size={16}/></Link></div></div></article>)}</div>
    </div></section>
    <section className="content-section"><div className="container"><div className="intro-row"><div><div className="eyebrow">Featured Packages</div><h2>Find your kind of adventure</h2></div><p>Choose a starting point, then let our team tailor the pace, hotels, transport and activities around your group.</p></div>
      <div className="package-grid">{packages.map((item) => <article className="package-card" key={item.title}><Link className="package-image" href={`/destinations/${item.slug}`}><img src={item.image} alt={item.title}/><span>{item.type}</span></Link><div className="package-body"><h2>{item.title}</h2><div className="package-facts"><span><Icon name="clock" size={17}/>{item.duration}</span><span><Icon name="users" size={17}/>{item.group}</span></div><div className="package-bottom"><strong>{item.price}</strong><Link href="/contact">Request Plan <Icon name="arrow" size={16}/></Link></div></div></article>)}</div>
    </div></section>
    <section className="custom-trip"><div className="container custom-trip-inner"><div><div className="eyebrow light">Made for You</div><h2>Have a different route in mind?</h2><p>Tell us your dates, group and travel style. We will shape a private itinerary around exactly what you want to experience.</p></div><Link className="button button-gold" href="/contact">Build My Custom Trip <Icon name="arrow" size={18}/></Link></div></section>
  </SiteShell>;
}
