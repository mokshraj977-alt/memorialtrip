"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { TourCard } from "@/components/TourCard";
import { TaxiBookingExperience } from "@/components/TaxiBookingForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import {
  GENERAL_WHATSAPP_MESSAGE,
  packageWhatsAppMessage,
  PHONE_NUMBERS,
} from "@/config/contact";
import { heroImage, packages, type TourCategory, type TourPackage } from "@/data/packages";

const navigation: { label: string; href: string; category?: TourCategory }[] = [
  { label: "Destinations", href: "#destinations" },
  { label: "Domestic tours", href: "#packages", category: "Domestic" },
  { label: "International", href: "#packages", category: "International" },
  { label: "Taxi services", href: "#taxi-services" },
  { label: "Our story", href: "#our-story" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationDraft, setDestinationDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<"All" | TourCategory>("All");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [formDestination, setFormDestination] = useState("");
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [feedback, setFeedback] = useState<"unavailable" | "error" | null>(null);
  const packagesRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const visiblePackages = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase();
    return packages.filter((tour) => {
      const matchesCategory = category === "All" || tour.category === category;
      const matchesDestination =
        !term ||
        tour.name.toLocaleLowerCase().includes(term) ||
        tour.destinations.some((place) => place.toLocaleLowerCase().includes(term));
      return matchesCategory && matchesDestination;
    });
  }, [category, searchTerm]);

  useEffect(() => {
    if (!selectedTour) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTour(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedTour]);

  const searchPackages = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(destinationDraft);
    setFormDestination(destinationDraft);
    setCategory("All");
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showCategory = (value: TourCategory) => {
    setCategory(value);
    setSearchTerm("");
    setDestinationDraft("");
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startEnquiry = (destination?: string) => {
    if (destination) setFormDestination(destination);
    setSelectedTour(null);
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => nameRef.current?.focus(), 450);
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFeedback("error");
      form.reportValidity();
      return;
    }
    setFeedback("unavailable");
  };

  return (
    <>
      <header className="site-header">
        <a aria-label="MemorialTrip home" className="brand" href="#home">
          <span aria-hidden="true" className="brand-mark">M</span>
          <span className="brand-name">memorial<span>trip</span></span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <span />
          <span />
        </button>
        <nav aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.label}
              onClick={() => {
                if (item.category) {
                  showCategory(item.category);
                }
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="#enquiry" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
          <WhatsAppLink
            className="nav-whatsapp"
            label="Enquire on WhatsApp"
            message={GENERAL_WHATSAPP_MESSAGE}
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </nav>
      </header>

      <main>
        <section aria-labelledby="hero-heading" className="hero" id="home">
          <Image
            alt="Sunlit turquoise ocean unfolding along a tropical coastline"
            className="hero-image"
            fill
            priority
            sizes="100vw"
            src={heroImage}
          />
          <div className="hero-shade" />
          <div className="hero-content page-wrap">
            <p className="eyebrow light-eyebrow">
              <span className="eyebrow-rule" /> INDIA, AND A LITTLE BEYOND
            </p>
            <h1 id="hero-heading">
              Find your way
              <br />
              <em>somewhere</em> wonderful.
            </h1>
            <p className="hero-copy">
              From quiet backwaters to faraway city lights, make room for the
              kind of trip that stays with you.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#packages">
                Find your journey <span aria-hidden="true">↗</span>
              </a>
              <a className="hero-text-link" href="#our-story">
                A little about us <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="hero-side-note">
            <span className="side-note-line" />
            <span>THE ART OF GETTING AWAY</span>
          </div>
          <a aria-label="Scroll to discover" className="scroll-cue" href="#packages">
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <div className="search-wrap page-wrap" id="packages">
          <form aria-label="Find a tour" className="search-panel" onSubmit={searchPackages}>
            <label className="search-field destination-field">
              <span className="field-icon" aria-hidden="true">⌖</span>
              <span className="field-content">
                <span className="field-label">I&apos;d love to go to</span>
                <input
                  aria-label="Destination"
                  autoComplete="off"
                  list="destination-options"
                  onChange={(event) => setDestinationDraft(event.target.value)}
                  placeholder="Any destination"
                  value={destinationDraft}
                />
                <datalist id="destination-options">
                  {[...new Set(packages.flatMap((tour) => tour.destinations))].map((place) => (
                    <option key={place} value={place} />
                  ))}
                </datalist>
              </span>
            </label>
            <label className="search-field date-field">
              <span className="field-icon" aria-hidden="true">◷</span>
              <span className="field-content">
                <span className="field-label">When works for you?</span>
                <input
                  aria-label="Preferred start date"
                  onChange={(event) => setTravelDate(event.target.value)}
                  type="date"
                  value={travelDate}
                />
              </span>
            </label>
            <label className="search-field guest-field">
              <span className="field-icon" aria-hidden="true">♧</span>
              <span className="field-content">
                <span className="field-label">Who&apos;s coming?</span>
                <select
                  aria-label="Number of travellers"
                  onChange={(event) => setTravellers(event.target.value)}
                  value={travellers}
                >
                  <option value="1">1 traveller</option>
                  <option value="2">2 travellers</option>
                  <option value="3">3 travellers</option>
                  <option value="4">4 travellers</option>
                  <option value="5+">5+ travellers</option>
                </select>
              </span>
            </label>
            <button className="search-button" type="submit">
              Explore <span aria-hidden="true">↗</span>
            </button>
          </form>
          <p className="search-note">
            Share your dates and group size when you enquire.
          </p>
        </div>

        <section aria-labelledby="featured-heading" className="section section-packages" ref={packagesRef}>
          <div className="page-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-rule" /> A GOOD PLACE TO BEGIN</p>
                <h2 id="featured-heading">Journeys worth <em>looking forward to.</em></h2>
              </div>
              <p className="section-intro">
                Discover journeys across India and beyond. Contact us to reconfirm
                current starting prices and details.
              </p>
            </div>

            <div className="filter-row" aria-label="Filter tours by category">
              {(["All", "Domestic", "International"] as const).map((value) => (
                <button
                  aria-pressed={category === value}
                  className={`filter-chip${category === value ? " active" : ""}`}
                  key={value}
                  onClick={() => setCategory(value)}
                  type="button"
                >
                  {value === "All" ? "All journeys" : value}
                </button>
              ))}
              <span aria-live="polite" className="results-count">
                {visiblePackages.length} {visiblePackages.length === 1 ? "journey" : "journeys"}
                {searchTerm ? ` for “${searchTerm}”` : ""}
              </span>
            </div>

            {visiblePackages.length > 0 ? (
              <div className="tour-grid">
                {visiblePackages.map((tour) => (
                  <TourCard key={tour.id} onOpen={setSelectedTour} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span aria-hidden="true" className="no-results-mark">↗</span>
                <h3>No journeys found just yet.</h3>
                <p>Try another destination or clear your search to see every listed package.</p>
                <button
                  className="text-link"
                  onClick={() => {
                    setSearchTerm("");
                    setDestinationDraft("");
                    setCategory("All");
                  }}
                  type="button"
                >
                  Clear search <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
            <p className="package-note">
              Starting prices may change. Contact MemorialTrip for current prices,
              itinerary details and availability.
            </p>
          </div>
        </section>

        <section aria-labelledby="destination-heading" className="section section-destinations" id="destinations">
          <div className="page-wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-rule" /> PICK A DIRECTION</p>
                <h2 id="destination-heading">A change of <em>scenery.</em></h2>
              </div>
              <p className="section-intro">
                From familiar shores to a little farther afield. Choose a collection to
                explore the packages listed for it.
              </p>
            </div>
            <div className="destination-grid">
              <button
                className="destination-tile destination-india"
                onClick={() => {
                  showCategory("Domestic");
                }}
                type="button"
              >
                <Image
                  alt="Misty green landscape in the Indian hills"
                  fill
                  loading="lazy"
                  sizes="(max-width: 680px) 100vw, 60vw"
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85"
                />
                <span className="destination-overlay" />
                <span className="destination-text">
                  <span className="destination-kicker">THE MANY MOODS OF INDIA</span>
                  <strong>Closer to<br />somewhere special.</strong>
                  <span className="destination-link">Explore domestic <span aria-hidden="true">↗</span></span>
                </span>
              </button>
              <button
                className="destination-tile destination-away"
                onClick={() => {
                  showCategory("International");
                }}
                type="button"
              >
                <Image
                  alt="A city street in Paris at twilight"
                  fill
                  loading="lazy"
                  sizes="(max-width: 680px) 100vw, 40vw"
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
                />
                <span className="destination-overlay" />
                <span className="destination-text">
                  <span className="destination-kicker">A LITTLE FURTHER</span>
                  <strong>Out of office.<br />Into the world.</strong>
                  <span className="destination-link">Explore international <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </div>
          </div>
        </section>

        <TaxiBookingExperience
          onExplorePackages={() => {
            setCategory("Domestic");
            setSearchTerm("");
            setDestinationDraft("");
          }}
        />

        <section aria-labelledby="travel-style-heading" className="section section-style">
          <div className="page-wrap style-layout">
            <div className="style-heading">
              <p className="eyebrow"><span className="eyebrow-rule" /> YOUR TRIP, YOUR TEMPO</p>
              <h2 id="travel-style-heading">Travel the way <em>you are.</em></h2>
              <p>
                Every journey starts with a different idea. Tell us what kind of
                time away you have in mind.
              </p>
              <a className="text-link" href="#enquiry">Start a conversation <span aria-hidden="true">→</span></a>
            </div>
            <div className="style-list">
              <a className="style-item" href="#enquiry" onClick={() => setFormDestination("Family trip")}>
                <span className="style-number">01</span>
                <span className="style-title">Time together</span>
                <span className="style-description">A family trip shaped around your people.</span>
                <span aria-hidden="true" className="style-arrow">↗</span>
              </a>
              <a className="style-item" href="#enquiry" onClick={() => setFormDestination("Honeymoon")}>
                <span className="style-number">02</span>
                <span className="style-title">Just the two of you</span>
                <span className="style-description">A slower, more personal honeymoon escape.</span>
                <span aria-hidden="true" className="style-arrow">↗</span>
              </a>
              <a className="style-item" href="#enquiry" onClick={() => setFormDestination("Customized trip")}>
                <span className="style-number">03</span>
                <span className="style-title">Made around you</span>
                <span className="style-description">Share an idea; start with a blank page.</span>
                <span aria-hidden="true" className="style-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="story-heading" className="section section-story" id="our-story">
          <div className="page-wrap story-layout">
            <div className="story-image-wrap">
              <Image
                alt="A houseboat on a calm tropical waterway"
                className="story-image"
                fill
                loading="lazy"
                sizes="(max-width: 760px) 90vw, 45vw"
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85"
              />
              <span className="story-image-caption">KERALA, INDIA</span>
            </div>
            <div className="story-copy">
              <p className="eyebrow"><span className="eyebrow-rule" /> A NOTE FROM THE ROAD</p>
              <h2 id="story-heading">The best trips feel <em>like yours.</em></h2>
              <p>
                From Kerala&apos;s green hills and backwaters to island escapes in Andaman
                and Lakshadweep, explore journeys across India and beyond.
              </p>
              <blockquote>
                <span aria-hidden="true" className="quote-mark">“</span>
                <p>
                  We have just returned from the trip of a lifetime! Thanks to this Memorial
                  Trip company and our agent Vikash, our custom-designed 13 day tour of Kerala
                  was perfect. We easily followed the instructions in our travel packet, our
                  tickets and vouchers were organized and accepted everywhere, driver was on
                  time everything was planned Thank you Memorialtrip Team.
                </p>
                <cite>Vivekanand Family</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section aria-labelledby="enquiry-heading" className="section section-enquiry" id="enquiry">
          <div className="enquiry-image">
            <Image
              alt="A sunlit beach and open water"
              fill
              loading="lazy"
              sizes="(max-width: 760px) 100vw, 45vw"
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1300&q=85"
            />
            <div className="enquiry-image-note">A GOOD TRIP STARTS SOMEWHERE.</div>
          </div>
          <div className="enquiry-content">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-rule" /> LET&apos;S START WITH A HELLO</p>
            <h2 id="enquiry-heading">Where would you <em>like to go?</em></h2>
            <p className="enquiry-copy">
              Share a few details to get started. For current package information,
              you can also reach us directly by phone or email.
            </p>
            <form className="enquiry-form" onSubmit={submitEnquiry}>
              <div className="form-row">
                <label>
                  Your name <span aria-hidden="true">*</span>
                  <input autoComplete="name" name="name" placeholder="How should we address you?" ref={nameRef} required />
                </label>
                <label>
                  Email address <span aria-hidden="true">*</span>
                  <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
                </label>
              </div>
              <label>
                Destination or trip idea <span aria-hidden="true">*</span>
                <input
                  name="destination"
                  onChange={(event) => setFormDestination(event.target.value)}
                  placeholder="A place, a feeling, or just 'not sure yet'"
                  required
                  value={formDestination}
                />
              </label>
              <div className="form-row">
                <label>
                  Preferred start date
                  <input
                    aria-label="Preferred start date for enquiry"
                    onChange={(event) => setTravelDate(event.target.value)}
                    type="date"
                    value={travelDate}
                  />
                </label>
                <label>
                  Travellers
                  <select onChange={(event) => setTravellers(event.target.value)} value={travellers}>
                    <option value="1">1 traveller</option>
                    <option value="2">2 travellers</option>
                    <option value="3">3 travellers</option>
                    <option value="4">4 travellers</option>
                    <option value="5+">5+ travellers</option>
                  </select>
                </label>
              </div>
              <label>
                Anything else we should know?
                <textarea name="message" placeholder="A little about the trip you have in mind…" rows={3} />
              </label>
              {feedback === "error" && (
                <p className="form-feedback error-message" role="alert">
                  Please check the required fields and enter a valid email address.
                </p>
              )}
              {feedback === "unavailable" && (
                <p className="form-feedback unavailable-message" role="status">
                  Online form submissions are not connected yet. Your enquiry has not
                  been sent. Please continue on WhatsApp or contact us directly.
                </p>
              )}
              <button className="button button-gold form-submit" type="submit">
                Continue enquiry <span aria-hidden="true">↗</span>
              </button>
              <p className="form-note">
                Online enquiries will be available once the enquiry integration is complete.
                For now, please contact us directly.
              </p>
              <WhatsAppLink
                className="button button-whatsapp enquiry-whatsapp"
                label="Enquire on WhatsApp about travel packages and services"
                message={GENERAL_WHATSAPP_MESSAGE}
              >
                Enquire on WhatsApp <span aria-hidden="true">↗</span>
              </WhatsAppLink>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-wrap">
          <div className="footer-main">
            <div className="footer-brand-column">
              <a aria-label="MemorialTrip home" className="brand brand-footer" href="#home">
                <span aria-hidden="true" className="brand-mark">M</span>
                <span className="brand-name">memorial<span>trip</span></span>
              </a>
              <p>A little inspiration for the journey ahead.</p>
            </div>
            <div className="footer-column">
              <h2>Discover</h2>
              <a href="#destinations">Destinations</a>
              <a href="#packages" onClick={() => showCategory("Domestic")}>Domestic tours</a>
              <a href="#packages" onClick={() => showCategory("International")}>International tours</a>
              <a href="#our-story">Our story</a>
            </div>
            <div className="footer-column">
              <h2>Get in touch</h2>
              <a href="mailto:infomemorialtrip@gmail.com">infomemorialtrip@gmail.com</a>
              {PHONE_NUMBERS.map((phone) => (
                <a href={phone.href} key={phone.href}>{phone.label}</a>
              ))}
              <address>
                SH7, Sindhi Colony, near SBI Regional Office,<br />
                Bilaspur, Chhattisgarh 495001, India
              </address>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© MemorialTrip. All rights reserved.</span>
            <a href="mailto:infomemorialtrip@gmail.com">Get in touch</a>
          </div>
        </div>
      </footer>

      {selectedTour && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTour(null)}
          role="presentation"
        >
          <section
            aria-labelledby="tour-dialog-title"
            aria-modal="true"
            className="tour-dialog"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSelectedTour(null);
            }}
            role="dialog"
            tabIndex={-1}
          >
            <button
              aria-label="Close package details"
              className="dialog-close"
              onClick={() => setSelectedTour(null)}
              type="button"
            >
              ×
            </button>
            <div className="dialog-image">
              <Image
                alt={selectedTour.imageAlt}
                fill
                sizes="(max-width: 760px) 100vw, 680px"
                src={selectedTour.image}
              />
              <span className="tour-category">{selectedTour.category}</span>
            </div>
            <div className="dialog-content">
              <p className="eyebrow"><span className="eyebrow-rule" /> {selectedTour.destinations.join(" · ")}</p>
              <h2 id="tour-dialog-title">{selectedTour.name}</h2>
              <div className="dialog-facts">
                <div>
                  <span>Duration</span>
                  <strong>{selectedTour.duration ? "3 nights · 4 days" : "Contact us for trip duration"}</strong>
                </div>
                <div>
                  <span>Starting from</span>
                  <strong>₹{selectedTour.price.toLocaleString("en-IN")}</strong>
                </div>
              </div>
              <div className="dialog-detail-grid">
                <section>
                  <h3>Itinerary</h3>
                  <p>Contact us for itinerary and availability.</p>
                </section>
                <section>
                  <h3>Package details</h3>
                  <p>Get in touch for current inclusions, exclusions and travel details.</p>
                </section>
              </div>
              <p className="dialog-price-note">
                Starting prices may change and are subject to confirmation. Contact us
                for current pricing and availability.
              </p>
              <div className="dialog-actions">
                <button
                  className="button button-navy dialog-enquiry"
                  onClick={() => startEnquiry(selectedTour.name)}
                  type="button"
                >
                  Enquire about this journey <span aria-hidden="true">↗</span>
                </button>
                <WhatsAppLink
                  className="button button-whatsapp dialog-whatsapp"
                  label={`Enquire on WhatsApp about ${selectedTour.name}`}
                  message={packageWhatsAppMessage(selectedTour.name)}
                >
                  WhatsApp enquiry <span aria-hidden="true">↗</span>
                </WhatsAppLink>
              </div>
            </div>
          </section>
        </div>
      )}

      <a aria-label="Contact MemorialTrip by phone" className="mobile-call" href={PHONE_NUMBERS[0].href}>
        Call MemorialTrip <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
