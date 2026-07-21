import Link from "next/link";

export type IconName = "arrow" | "badge" | "camera" | "clock" | "compass" | "headset" | "mail" | "map" | "phone" | "search" | "shield" | "star" | "users";

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>, badge: <><path d="m12 2 3 3 4-.5.5 4 3 3-3 3-.5 4-4-.5-3 3-3-3-4 .5-.5-4-3-3 3-3 .5-4 4 .5z"/><path d="m9 12 2 2 4-4"/></>,
    camera: <><path d="M14.5 4 16 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l1.5-3z"/><circle cx="12" cy="13" r="3"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></>, headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19h-2v-7h4v5a2 2 0 0 1-2 2ZM6 19H4a2 2 0 0 1-2-2v-5h4z"/><path d="M18 19c0 2-2 3-4 3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>, map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>, search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>, star: <path d="m12 2 3 6 6.5 1-4.8 4.7 1.1 6.3-5.8-3-5.8 3 1.1-6.3L2.5 9 9 8z"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const links = [
  ["/", "Home"], ["/destinations", "Destinations"], ["/packages", "Packages"], ["/services", "Services"], ["/about", "About Us"], ["/gallery", "Gallery"], ["/contact", "Contact Us"],
];

export function Header({ active = "" }: { active?: string }) {
  return <header className="site-header inner-header"><div className="container header-inner">
    <Link className="brand" href="/" aria-label="Koh Peaks home"><img src="/images/logo-light.png" alt="Koh Peaks Tours & Trails"/></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([href, label]) => <Link className={active === label ? "active" : ""} href={href} key={href}>{label}</Link>)}</nav>
    <div className="header-actions"><a className="phone-pill" href="tel:+923354020394"><Icon name="phone" size={17}/>+92 335 4020394</a><Link className="button button-gold header-cta" href="/contact">Plan Your Trip</Link></div>
    <details className="mobile-menu"><summary aria-label="Open navigation"><span></span><span></span><span></span></summary><nav aria-label="Mobile navigation">{links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</nav></details>
  </div></header>;
}

export function PageHero({ eyebrow, title, copy, image, imagePosition = "center" }: { eyebrow: string; title: string; copy: string; image: string; imagePosition?: string }) {
  return <section className={`page-hero position-${imagePosition}`}><img src={image} alt=""/><div className="page-hero-shade"></div><div className="container page-hero-content"><div className="eyebrow light">{eyebrow}</div><h1>{title}</h1><p>{copy}</p><div className="breadcrumbs"><Link href="/">Home</Link><span>→</span><strong>{title}</strong></div></div></section>;
}

export function AdventureCta() {
  return <section className="cta-band"><div className="container adventure-cta"><div className="cta-icon"><Icon name="phone" size={27}/></div><div><h2>Ready to Start Your Adventure?</h2><p>Call or WhatsApp us now to plan your perfect trip.</p></div><a className="cta-number" href="tel:+923354020394">+92 335 4020394</a><a className="button button-gold" href="https://wa.me/923354020394"><Icon name="phone" size={18}/> Call / WhatsApp</a></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-grid">
    <div className="footer-brand"><img src="/images/logo-light.png" alt="Koh Peaks Tours & Trails"/><p>We bring you closer to nature with unforgettable travel experiences across Northern Pakistan.</p><div className="socials"><a href="https://www.facebook.com/profile.php?id=61591595142078" target="_blank" rel="noopener" aria-label="Facebook">f</a><a href="https://www.instagram.com/koh_peaks" target="_blank" rel="noopener" aria-label="Instagram">◎</a></div></div>
    <div><h3>Quick Links</h3>{links.slice(0, 6).map(([href,label]) => <Link href={href} key={href}>{label}</Link>)}</div>
    <div><h3>Top Destinations</h3><Link href="/destinations/swat-kalam-malam-jabba">Swat, Kalam & Malam Jabba</Link><Link href="/destinations/hunza-khunjerab-pass">Hunza & Khunjerab Pass</Link><Link href="/destinations/mushkpuri-top">Mushkpuri Top</Link><Link href="/destinations/kumrat-jahaz-banda">Kumrat Valley</Link></div>
    <div><h3>Contact Us</h3><a href="tel:+923354020394"><Icon name="phone" size={16}/>+92 335 4020394</a><a href="mailto:info@kohpeaks.com"><Icon name="mail" size={16}/>info@kohpeaks.com</a><span><Icon name="map" size={16}/>Office no # G-01, Davis Hytes, 38 Davis road, Lahore.</span></div>
    <div className="newsletter"><h3>Newsletter</h3><p>Get the latest tour updates and exclusive offers.</p><form action="/contact"><label className="sr-only" htmlFor="footer-email">Email address</label><input id="footer-email" name="email" type="email" placeholder="Enter your email"/><button aria-label="Subscribe"><Icon name="arrow" size={19}/></button></form></div>
  </div><div className="footer-bottom"><span>© 2026 Koh Peaks Tours & Trails. All Rights Reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link><i></i><Link href="/terms-and-conditions">Terms & Conditions</Link></span></div></div></footer>;
}

export function SiteShell({ children, active }: { children: React.ReactNode; active?: string }) {
  return <main><Header active={active}/>{children}<AdventureCta/><Footer/><a className="mobile-whatsapp" href="https://wa.me/923354020394"><Icon name="phone" size={21}/>Plan Your Trip</a></main>;
}
