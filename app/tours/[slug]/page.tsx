import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dayTours } from "../../data";
import { Icon, PageHero, SiteShell } from "../../components/SiteChrome";

export function generateStaticParams() {
  return dayTours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = dayTours.find((item) => item.slug === slug);
  if (!tour) return { title: "Tour | Koh Peaks" };
  return {
    title: `${tour.title} ${tour.subtitle} | Koh Peaks`,
    description: tour.tagline,
  };
}

export default async function DayTourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = dayTours.find((item) => item.slug === slug);
  if (!tour) notFound();

  const whatsappHref = `https://wa.me/923207538028?text=${encodeURIComponent(
    `Assalam o Alaikum, I want to book the ${tour.title} ${tour.subtitle}${tour.date ? ` on ${tour.date}` : ""}.`
  )}`;

  return (
    <SiteShell active="Packages">
      <PageHero
        eyebrow={`Tour • ${tour.altitude} • ${tour.route}`}
        title={`${tour.title} — ${tour.subtitle}`}
        copy={tour.tagline}
        image={tour.image}
        imagePosition="center"
      />

      <section className="tour-meta-band">
        <div className="container tour-meta-inner">
          <div className="tour-meta-facts">
            {tour.date && <div><Icon name="clock" /><span><small>Date</small><strong>{tour.date}{tour.weekday ? `, ${tour.weekday}` : ""}</strong></span></div>}
            <div><Icon name="star" /><span><small>Duration</small><strong>{tour.subtitle}</strong></span></div>
            {tour.price
              ? <div><Icon name="badge" /><span><small>Price</small><strong>{tour.price}</strong></span></div>
              : <div><Icon name="compass" /><span><small>Route</small><strong>{tour.route}</strong></span></div>}
          </div>
          <a className="button button-gold" href={tour.bookingPhoneHref}><Icon name="phone" size={18} /> Book Now — {tour.bookingPhone}</a>
        </div>
      </section>

      <section className="content-section">
        <div className="container detail-layout">
          <div className="detail-copy">
            <div className="eyebrow">The Experience</div>
            <h2>{tour.overviewTitle}</h2>
            <p className="lead-copy">{tour.overview[0]}</p>
            {tour.overview.slice(1).map((para) => <p key={para}>{para}</p>)}

            <div className="eyebrow" style={{ marginTop: 36 }}>What&apos;s Included</div>
            <div className="highlight-list">
              {tour.inclusions.map((item) => (
                <span key={item}><Icon name="badge" size={18} />{item}</span>
              ))}
            </div>
          </div>

          <aside className="trip-facts">
            {tour.details.map((detail) => (
              <div key={detail.label}>
                <Icon name={detail.icon} />
                <span><small>{detail.label}</small><strong>{detail.value}</strong></span>
              </div>
            ))}
            <a className="button button-gold" href={tour.bookingPhoneHref}><Icon name="phone" size={17} /> Reserve Your Seat</a>
          </aside>
        </div>
      </section>

      {tour.highlights && (
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="eyebrow">Why You&apos;ll Love This Tour</div>
            <h2 className="tour-section-title">Reasons to join this trip</h2>
            <div className="tour-why-grid">
              {tour.highlights.map((item) => (
                <article key={item}>
                  <div className="why-check"><Icon name="badge" size={19} /></div>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {tour.itinerary && (
        <section className="split-story">
          <div className="container split-story-grid">
            <div className="story-image"><img src={tour.secondaryImage ?? tour.image} alt={`${tour.title} trail`} /></div>
            <div className="story-content">
              <div className="eyebrow light">Day Plan</div>
              <h2>Your itinerary, hour by hour</h2>
              <div className="timeline tour-timeline">
                {tour.itinerary.map((step) => (
                  <div key={step.time}>
                    <span>{step.time}</span>
                    <div><h3>{step.title}</h3></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="content-section" style={{ paddingTop: 0 }}>
        {tour.exclusions ? (
          <div className="container tour-columns">
            <div>
              <div className="eyebrow">Not Included</div>
              <h2>Exclusions</h2>
              <div className="tour-excl">
                {tour.exclusions.map((item) => (
                  <div key={item.title}><strong>{item.title}</strong><span>{item.note}</span></div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow">Come Prepared</div>
              <h2>Things to Carry</h2>
              <div className="highlight-list">
                {tour.thingsToCarry.map((item) => (
                  <span key={item}><Icon name="badge" size={18} />{item}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="eyebrow">Come Prepared</div>
            <h2 className="tour-section-title">Things to Carry</h2>
            <div className="highlight-list highlight-list-wide">
              {tour.thingsToCarry.map((item) => (
                <span key={item}><Icon name="badge" size={18} />{item}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {tour.notes && (
        <section className="content-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="eyebrow">Good to Know</div>
            <h2 className="tour-section-title">Important Notes</h2>
            <div className="tour-notes-grid">
              {tour.notes.map((note) => (
                <article key={note}>
                  <div className="note-icon"><Icon name="shield" size={22} /></div>
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="tour-book">
        <div className="container tour-book-inner">
          <div>
            <h2>Ready to make memories? Reserve your seat today.</h2>
            {tour.bookingNote
              ? <p className="confirm-by">{tour.bookingNote}</p>
              : tour.confirmBy && <p className="confirm-by">Last date to confirm: {tour.confirmBy}</p>}
          </div>
          <div className="tour-book-cta">
            <a className="tour-book-phone" href={tour.bookingPhoneHref}><Icon name="phone" size={26} />{tour.bookingPhone}</a>
            <a className="button button-gold" href={whatsappHref}><Icon name="phone" size={18} /> Book on WhatsApp</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
