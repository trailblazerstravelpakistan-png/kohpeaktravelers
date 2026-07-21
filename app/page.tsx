import Link from "next/link";

type IconName =
  | "arrow"
  | "badge"
  | "camera"
  | "clock"
  | "compass"
  | "headset"
  | "mail"
  | "map"
  | "phone"
  | "search"
  | "shield"
  | "star"
  | "users";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    badge: <><path d="m12 2 3 3 4-.5.5 4 3 3-3 3-.5 4-4-.5-3 3-3-3-4 .5-.5-4-3-3 3-3 .5-4 4 .5z"/><path d="m9 12 2 2 4-4"/></>,
    camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z"/><circle cx="12" cy="13" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19h-2v-7h4v5a2 2 0 0 1-2 2ZM6 19H4a2 2 0 0 1-2-2v-5h4z"/><path d="M18 19c0 2-2 3-4 3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    star: <path d="m12 2 3 6 6.5 1-4.8 4.7 1.1 6.3-5.8-3-5.8 3 1.1-6.3L2.5 9 9 8z"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

const destinations = [
  { title: "Mushkpuri Top", tag: "Mountain Tour", image: "/images/mushkpuri-trail.webp", slug: "mushkpuri-top" },
  { title: "Kumrat Valley & Jahaz Banda", tag: "Guided Trip", image: "/images/jahaz-banda.webp", slug: "kumrat-jahaz-banda" },
  { title: "Swat, Kalam & Malam Jabba", tag: "Adventure", image: "/images/swat-malam.webp", slug: "swat-kalam-malam-jabba" },
  { title: "Hunza & Khunjerab Pass", tag: "Scenic Escape", image: "/images/hunza-spring.webp", slug: "hunza-khunjerab-pass" },
];

const experiences = [
  { title: "Adventure Tours", copy: "Thrilling treks, high-altitude trails and off-the-beaten-path explorations.", image: "/images/hero.webp", icon: "compass" as IconName },
  { title: "Family Trips", copy: "Comfortable journeys designed for families, with time to connect and unwind.", image: "/images/family.webp", icon: "users" as IconName },
  { title: "Scenic Escapes", copy: "Breathtaking landscapes, serene valleys and peaceful mountain getaways.", image: "/images/boat-lake.webp", icon: "camera" as IconName },
];

const benefits = [
  { icon: "users" as IconName, title: "Guided Tours", copy: "Experienced local guides who know every trail." },
  { icon: "clock" as IconName, title: "Best Price Guarantee", copy: "Excellent value with no hidden costs." },
  { icon: "compass" as IconName, title: "Comfortable Transport", copy: "Well-maintained vehicles for every route." },
  { icon: "map" as IconName, title: "Local Expertise", copy: "Deep knowledge built across Northern Pakistan." },
  { icon: "badge" as IconName, title: "Custom Itineraries", copy: "Trips shaped around your pace and preferences." },
  { icon: "headset" as IconName, title: "24/7 Support", copy: "Help before, during and after your adventure." },
];

const reviews = [
  { quote: "An absolutely breathtaking experience! Koh Peaks made our trip to Hunza smooth and unforgettable.", name: "Ayesha Khan", city: "Lahore", initials: "AK" },
  { quote: "Highly professional team, an amazing itinerary and genuine hospitality throughout the journey.", name: "Bilal Ahmed", city: "Islamabad", initials: "BA" },
  { quote: "The best travel company for exploring Northern Pakistan. Every detail felt thoughtfully handled.", name: "Sara Farooq", city: "Karachi", initials: "SF" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Koh Peaks home">
            <img src="/images/logo-light.png" alt="Koh Peaks Tours & Trails" />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link className="active" href="/">Home</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
          <div className="header-actions">
            <a className="phone-pill" href="tel:+923207538028"><Icon name="phone" size={17} /> +92 320 7538028</a>
            <Link className="button button-gold header-cta" href="/contact">Plan Your Trip</Link>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><span></span><span></span><span></span></summary>
            <nav aria-label="Mobile navigation">
              <Link href="/destinations">Destinations</Link><Link href="/packages">Packages</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/gallery">Gallery</Link><Link href="/contact">Contact</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="top">
        <img className="hero-media" src="/images/hero.webp" alt="A trekker overlooking a turquoise mountain lake in Northern Pakistan" />
        <div className="hero-shade"></div>
        <div className="container hero-content">
          <div className="eyebrow light">Explore. Experience. Remember.</div>
          <h1>Fall in Love with the<br/><em>Beauty of Pakistan</em></h1>
          <p>Whether you&apos;re chasing snowy mountains, peaceful lakes, colorful valleys or thrilling adventures, we&apos;re here to make your dream trip simple, safe and unforgettable.</p>
          <div className="hero-buttons">
            <Link className="button button-gold" href="/contact">Plan Your Trip <Icon name="arrow" size={18}/></Link>
            <Link className="button button-outline-light" href="/destinations">Explore Destinations</Link>
          </div>
          <div className="trust-strip" aria-label="Trip benefits">
            <div><Icon name="users"/><span><strong>Local Expertise</strong><small>Experienced guides</small></span></div>
            <div><Icon name="shield"/><span><strong>Best Price Guarantee</strong><small>Quality at the best price</small></span></div>
            <div><Icon name="badge"/><span><strong>Custom Itineraries</strong><small>Tailored just for you</small></span></div>
            <div><Icon name="headset"/><span><strong>24/7 Support</strong><small>We&apos;re here</small></span></div>
          </div>
        </div>
      </section>

      <section className="section destinations" id="destinations">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Featured Destinations</div><h2>Explore the Best of Northern Pakistan</h2></div>
            <Link className="text-link bordered" href="/destinations">View All Destinations <Icon name="arrow" size={17}/></Link>
          </div>
          <div className="destination-grid">
            {destinations.map((item, index) => (
              <Link href={`/destinations/${item.slug}`} className={`destination-card reveal delay-${index}`} key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="card-mark"><Icon name="map" size={19}/></div>
                <div className="destination-overlay"><h3>{item.title}</h3><span>{item.tag}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section experiences" id="experiences">
        <div className="container">
          <div className="section-heading light-heading">
            <div><div className="eyebrow light">Curated for You</div><h2>Signature Experiences</h2></div>
            <Link className="text-link bordered light-link" href="/packages">View All Tours <Icon name="arrow" size={17}/></Link>
          </div>
          <div className="experience-grid">
            {experiences.map((item) => (
              <article className="experience-card" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="experience-shade"></div>
                <div className="experience-content"><div className="round-icon"><Icon name={item.icon}/></div><h3>{item.title}</h3><p>{item.copy}</p><Link href="/packages">Explore More <Icon name="arrow" size={17}/></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-us" id="why-us">
        <div className="container">
          <div className="eyebrow">Why Travel With Us</div>
          <div className="benefit-grid">
            {benefits.map((item) => <article key={item.title}><div className="benefit-icon"><Icon name={item.icon} size={30}/></div><h3>{item.title}</h3><p>{item.copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="eyebrow">Experience the Beauty of Pakistan</div>
          <div className="gallery-grid">
            {[
              ["/images/alpine-lake.webp", "Crystal alpine lake"], ["/images/pass-road.webp", "Road through Khunjerab Pass"], ["/images/valley.webp", "Green valley and river"],
              ["/images/boat-lake.webp", "Travelers on a mountain lake"], ["/images/family.webp", "Family trip in the mountains"], ["/images/hero.webp", "Trekker among the Karakoram mountains"]
            ].map(([src, alt], index) => <figure key={src} className={`gallery-${index + 1}`}><img src={src} alt={alt}/></figure>)}
          </div>
        </div>
      </section>

      <section className="section reviews" id="about">
        <div className="container">
          <div className="section-heading light-heading">
            <div><div className="eyebrow light">Trusted by Travelers</div><h2>What Our Travelers Say</h2></div>
            <Link className="text-link bordered light-link" href="/about">Our Story <Icon name="arrow" size={17}/></Link>
          </div>
          <div className="review-grid">
            {reviews.map((review) => <article className="review-card" key={review.name}><div className="quote-mark">“</div><p>{review.quote}</p><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><div className="reviewer"><span>{review.initials}</span><div><strong>{review.name}</strong><small>{review.city}</small></div></div></article>)}
          </div>

          <div className="adventure-cta" id="contact">
            <div className="cta-icon"><Icon name="phone" size={27}/></div>
            <div><h2>Ready to Start Your Adventure?</h2><p>Call or WhatsApp us now to plan your perfect trip.</p></div>
            <a className="cta-number" href="tel:+923207538028">+92 320 7538028</a>
            <a className="button button-gold" href="https://wa.me/923207538028"><Icon name="phone" size={18}/> Call / WhatsApp</a>
          </div>
 
          <footer className="footer">
            <div className="footer-grid">
              <div className="footer-brand"><img src="/images/logo-light.png" alt="Koh Peaks Tours & Trails"/><p>We bring you closer to nature with unforgettable travel experiences across Northern Pakistan.</p><div className="socials"><a href="https://www.facebook.com/share/1HFew6Bm4s/" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="https://www.instagram.com/kohpeaks?igsh=ZnNxYm81a2l0NW52" target="_blank" rel="noopener" aria-label="Instagram">◎</a></div></div>
              <div><h3>Quick Links</h3><Link href="/">Home</Link><Link href="/destinations">Destinations</Link><Link href="/packages">Packages</Link><Link href="/services">Services</Link><Link href="/about">About Us</Link></div>
              <div><h3>Top Destinations</h3><Link href="/destinations/swat-kalam-malam-jabba">Swat, Kalam & Malam Jabba</Link><Link href="/destinations/hunza-khunjerab-pass">Hunza & Khunjerab Pass</Link><Link href="/destinations/mushkpuri-top">Mushkpuri Top</Link><Link href="/destinations/kumrat-jahaz-banda">Kumrat Valley</Link></div>
              <div><h3>Contact Us</h3><a href="tel:+923207538028"><Icon name="phone" size={16}/>+92 320 7538028</a><a href="mailto:kohpeaks@gmail.com"><Icon name="mail" size={16}/>kohpeaks@gmail.com</a><span><Icon name="map" size={16}/>Office no # G-01, Davis Hytes, 38 Davis road, Lahore.</span></div>
              <div className="newsletter"><h3>Newsletter</h3><p>Get the latest tour updates and exclusive offers.</p><form action="/contact"><label className="sr-only" htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="Enter your email"/><button aria-label="Subscribe"><Icon name="arrow" size={19}/></button></form></div>
            </div>
            <div className="footer-bottom"><span>© 2026 Koh Peaks Tours & Trails. All Rights Reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link><i></i><Link href="/terms-and-conditions">Terms & Conditions</Link></span></div>
          </footer>
        </div>
      </section>
 
      <a className="mobile-whatsapp" href="https://wa.me/923207538028" aria-label="Plan your trip on WhatsApp"><Icon name="phone" size={21}/> Plan Your Trip</a>
    </main>
  );
}
