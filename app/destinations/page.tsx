import Link from "next/link";
import { destinations } from "../data";
import { Icon, PageHero, SiteShell } from "../components/SiteChrome";

export const metadata = { title: "Destinations | Koh Peaks Tours & Trails", description: "Explore the most beautiful destinations across Northern Pakistan." };

export default function DestinationsPage() {
  return <SiteShell active="Destinations">
    <PageHero eyebrow="Explore Northern Pakistan" title="Destinations That Stay With You" copy="From emerald valleys to high mountain roads, find the landscape that calls you." image="/images/kalam-valley.webp"/>
    <section className="content-section destination-catalog"><div className="container">
      <div className="intro-row"><div><div className="eyebrow">Choose Your Journey</div><h2>Six remarkable ways into the mountains</h2></div><p>Every destination is paired with local guidance, thoughtful pacing and room to experience the landscape—not just pass through it.</p></div>
      <div className="catalog-grid">{destinations.map((item, index) => <article className={`catalog-card card-tone-${index % 3}`} key={item.slug}>
        <Link className="catalog-image" href={`/destinations/${item.slug}`}><img src={item.image} alt={item.title}/><span>{item.region}</span></Link>
        <div className="catalog-body"><div className="catalog-meta"><span><Icon name="clock" size={16}/>{item.duration}</span><span><Icon name="map" size={16}/>{item.altitude}</span></div><h2><Link href={`/destinations/${item.slug}`}>{item.title}</Link></h2><p>{item.summary}</p><Link className="gold-link" href={`/destinations/${item.slug}`}>View Destination <Icon name="arrow" size={17}/></Link></div>
      </article>)}</div>
    </div></section>
  </SiteShell>;
}
