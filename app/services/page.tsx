import Link from "next/link";
import { Icon, PageHero, SiteShell, type IconName } from "../components/SiteChrome";

const services: { icon: IconName; title: string; copy: string; items: string[] }[] = [
  { icon: "compass", title: "Guided Tours", copy: "Local guides bring context, confidence and genuine connection to every route.", items: ["Local destination specialists", "Trail and safety briefings", "Cultural guidance"] },
  { icon: "badge", title: "Custom Itineraries", copy: "We shape the route around your dates, interests, budget and preferred pace.", items: ["Flexible day planning", "Couple, family and group options", "Hotel level choices"] },
  { icon: "users", title: "Private & Group Trips", copy: "Travel privately or join a thoughtfully sized group without compromising comfort.", items: ["Private departures", "Family-friendly pacing", "Small group coordination"] },
  { icon: "shield", title: "Transport & Logistics", copy: "Reliable vehicles and coordinated transfers keep challenging routes feeling seamless.", items: ["Route-appropriate vehicles", "Airport and city transfers", "Experienced mountain drivers"] },
  { icon: "camera", title: "Photography Escapes", copy: "Chase the light with scenic schedules built around iconic viewpoints and quiet moments.", items: ["Sunrise and sunset stops", "Landscape-focused routes", "Unhurried photo time"] },
  { icon: "headset", title: "Trip Support", copy: "A responsive team stays connected before, during and after your journey.", items: ["Pre-trip preparation", "On-tour coordination", "24/7 assistance"] },
];

export const metadata = { title: "Travel Services | Koh Peaks", description: "Guided tours, custom itineraries and complete travel support for Northern Pakistan." };

export default function ServicesPage() { return <SiteShell active="Services">
  <PageHero eyebrow="Travel with Confidence" title="Everything Your Journey Needs" copy="Local expertise and careful planning from your first question to the road home." image="/images/hero.webp"/>
  <section className="content-section services-page"><div className="container"><div className="intro-row"><div><div className="eyebrow">Our Services</div><h2>Thoughtful support at every step</h2></div><p>We handle the details that matter, so your time in the mountains feels safe, smooth and genuinely personal.</p></div><div className="service-grid">{services.map((service) => <article key={service.title}><div className="service-icon"><Icon name={service.icon} size={29}/></div><h2>{service.title}</h2><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
  <section className="process-section"><div className="container"><div className="eyebrow light">Simple Process</div><h2>From idea to unforgettable journey</h2><div className="process-grid"><article><span>01</span><h3>Share Your Vision</h3><p>Tell us where, when and how you like to travel.</p></article><article><span>02</span><h3>Review Your Plan</h3><p>Receive a clear custom route with options.</p></article><article><span>03</span><h3>Travel with Confidence</h3><p>We coordinate the journey while you enjoy it.</p></article></div><Link className="button button-gold" href="/contact">Start Planning</Link></div></section>
  </SiteShell>; }
