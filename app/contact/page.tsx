import { Icon, PageHero, SiteShell } from "../components/SiteChrome";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact Us | Koh Peaks", description: "Plan your Northern Pakistan journey with Koh Peaks Tours & Trails." };

export default function ContactPage() { return <SiteShell active="Contact Us">
  <PageHero eyebrow="Let's Plan Together" title="Your Journey Starts with a Conversation" copy="Share your travel ideas and we will help turn them into a thoughtful mountain itinerary." image="/images/boat-lake.webp"/>
  <section className="content-section contact-page"><div className="container contact-layout"><div className="contact-details"><div className="eyebrow">Contact Koh Peaks</div><h2>We would love to hear from you</h2><p>Whether you already know your route or are still deciding, send us a message. We will help with destinations, timing, transport and the right pace for your group.</p><div className="contact-cards"><a href="tel:+923207538028"><Icon name="phone"/><span><small>Call or WhatsApp</small><strong>+92 320 7538028</strong></span></a><a href="mailto:kohpeaks@gmail.com"><Icon name="mail"/><span><small>Email Us</small><strong>kohpeaks@gmail.com</strong></span></a><div><Icon name="map"/><span><small>Visit Us</small><strong>Office no # G-01, Davis Hytes, 38 Davis road, Lahore.</strong></span></div></div><img src="/images/kalam-valley.webp" alt="Kalam Valley landscape"/></div><div className="form-panel"><div className="eyebrow">Trip Enquiry</div><h2>Tell us what you are dreaming of</h2><ContactForm/></div></div></section>
  </SiteShell>; }
