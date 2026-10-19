"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  createWhatsAppUrl,
  PHONE_NUMBERS,
  taxiBookingWhatsAppMessage,
} from "@/config/contact";

type TaxiBookingExperienceProps = {
  onExplorePackages: () => void;
};

type TripType = "One Way" | "Round Trip";
type FormErrors = Record<string, string>;

const vehicleOptions = [
  { name: "Hatchback (5 Seater)", type: "hatchback" },
  { name: "Compact Sedan (5 Seater)", type: "sedan" },
  { name: "Sedan (5 Seater)", type: "sedan" },
  { name: "SUV (7–8 Seater)", type: "suv" },
  { name: "MUV (7–8 Seater)", type: "muv" },
  { name: "Minivan/Van (7–8 Seater)", type: "van" },
] as const;

const services = [
  {
    title: "Easy & Flexible",
    copy: "Plan your journey with a convenient enquiry process. Share your travel details and contact MemorialTrip to discuss suitable options.",
    icon: "route",
  },
  {
    title: "Airport Transfers",
    copy: "Plan airport pickups and drop-offs in advance. Share your flight-related travel requirements when enquiring.",
    icon: "plane",
  },
  {
    title: "One-Way Drops",
    copy: "Enquire about one-way journeys between your pickup and destination.",
    icon: "one-way",
  },
  {
    title: "Competitive Pricing",
    copy: "Request a fare estimate for your route and preferred vehicle. Final pricing is confirmed by MemorialTrip.",
    icon: "price",
  },
  {
    title: "Local Rentals",
    copy: "Ask about local travel and hourly rental options for shopping, business visits, and city journeys.",
    icon: "city",
  },
  {
    title: "Round-Trip Cabs",
    copy: "Enquire about return journeys and comfortable road travel for your planned trip.",
    icon: "return",
  },
] as const;

function localDateValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function ServiceIcon({ name }: { name: (typeof services)[number]["icon"] }) {
  const paths: Record<typeof name, string> = {
    route: "M4 18h5l3-12h8M4 6h5m7 12h4M17 15l3 3-3 3",
    plane: "M3 12l18-7-6 16-3-7-9-2zm9 2 5-5",
    "one-way": "M4 12h15m-6-6 6 6-6 6",
    price: "M12 3v18m5-14H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    city: "M4 21V7l8-4v18m0-12h8v12M8 9v1m0 4v1m8-3v1m0 3v1M2 21h20",
    return: "M20 7h-8a5 5 0 0 0-5 5v5m0 0-4-4m4 4 4-4m-7-6 3-3",
  };

  return (
    <svg aria-hidden="true" className="service-icon" fill="none" viewBox="0 0 24 24">
      <path
        d={paths[name]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function VehicleIcon({ type }: { type: (typeof vehicleOptions)[number]["type"] }) {
  const roof =
    type === "hatchback"
      ? "M6 12l2-4h7l3 4"
      : type === "van"
        ? "M5 12V7h11l4 5"
        : type === "suv" || type === "muv"
          ? "M5 12l2-5h10l3 5"
          : "M6 12l2-4h8l3 4";

  return (
    <svg aria-hidden="true" className="vehicle-icon" fill="none" viewBox="0 0 28 22">
      <path
        d={`${roof}M4 12h19v5H4v-5zm3 5v2m13-2v2M7 12v-1m13 1v-1`}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="16" r="1.35" fill="currentColor" />
      <circle cx="19" cy="16" r="1.35" fill="currentColor" />
    </svg>
  );
}

function fieldError(errors: FormErrors, name: string) {
  return errors[name] ? (
    <span className="taxi-field-error" id={`taxi-${name}-error`} role="alert">
      {errors[name]}
    </span>
  ) : null;
}

export function TaxiBookingExperience({ onExplorePackages }: TaxiBookingExperienceProps) {
  const [tripType, setTripType] = useState<TripType>("One Way");
  const [departureDate, setDepartureDate] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageUrl, setMessageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"ready" | "unavailable" | null>(null);
  const today = localDateValue(new Date());

  const clearFieldError = (name: string) => {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    setStatus(null);
    const target = event.target;
    if (
      (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) &&
      target.name
    ) {
      clearFieldError(target.name);
      if (target.name === "travelDate") setDepartureDate(target.value);
    }
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FormErrors = {};
    const pickup = String(data.get("pickup") ?? "").trim();
    const destination = String(data.get("destination") ?? "").trim();
    const travelDate = String(data.get("travelDate") ?? "");
    const pickupTime = String(data.get("pickupTime") ?? "");
    const travellers = String(data.get("travellers") ?? "");
    const returnDate = String(data.get("returnDate") ?? "");
    const fullName = String(data.get("fullName") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!pickup) nextErrors.pickup = "Enter your pickup location.";
    if (!destination) nextErrors.destination = "Enter your destination.";
    if (!travelDate) {
      nextErrors.travelDate = "Choose your travel date.";
    } else if (travelDate < today) {
      nextErrors.travelDate = "Travel date cannot be in the past.";
    }
    if (!pickupTime) nextErrors.pickupTime = "Choose a pickup time.";
    if (!travellers || !Number.isInteger(Number(travellers)) || Number(travellers) < 1) {
      nextErrors.travellers = "Enter at least 1 traveller.";
    }
    if (tripType === "Round Trip") {
      if (!returnDate) {
        nextErrors.returnDate = "Choose a return date.";
      } else if (returnDate < travelDate) {
        nextErrors.returnDate = "Return date cannot be earlier than travel date.";
      }
    }
    if (!fullName) nextErrors.fullName = "Enter your full name.";
    const mobileDigits = mobile.replace(/\D/g, "");
    if (!mobile) {
      nextErrors.mobile = "Enter your mobile number.";
    } else if (!/^\+?[\d\s()-]{7,20}$/.test(mobile) || mobileDigits.length < 7 || mobileDigits.length > 15) {
      nextErrors.mobile = "Enter a valid mobile number.";
    }
    const emailField = form.elements.namedItem("email");
    if (email && emailField instanceof HTMLInputElement && !emailField.validity.valid) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!vehicle) nextErrors.vehicle = "Choose a preferred vehicle category.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setMessageUrl(null);
      setStatus(null);
      const firstInvalidField = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    const message = taxiBookingWhatsAppMessage({
      tripType,
      pickup,
      destination,
      travelDate,
      pickupTime,
      returnDate: tripType === "Round Trip" ? returnDate : "Not Applicable",
      travellers,
      vehicle,
      fullName,
      mobile,
      email,
    });
    const url = createWhatsAppUrl(message);

    if (!url) {
      setMessageUrl(null);
      setStatus("unavailable");
      return;
    }

    setErrors({});
    setMessageUrl(url);
    setStatus("ready");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section aria-labelledby="taxi-banner-heading" className="taxi-experience" id="taxi-services">
      <div className="taxi-banner">
        <Image
          alt="Taxi sign illuminated on a city street at night"
          className="taxi-banner-image"
          fill
          loading="lazy"
          sizes="100vw"
          src="https://memorialtrip.com/assets/website/images/taxi_book_banner.jpg"
        />
        <div className="taxi-banner-overlay" />
        <div className="page-wrap taxi-banner-content">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-rule" /> MEMORIALTRIP TAXI SERVICES</p>
          <h2 id="taxi-banner-heading">Book Your Ride <em>with MemorialTrip</em></h2>
          <p>
            Comfortable journeys, flexible travel options, and convenient taxi
            enquiries for your next trip.
          </p>
          <a className="button button-gold" href="#taxi-booking">
            Plan your journey <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="page-wrap taxi-booking-wrap">
        <section aria-labelledby="taxi-booking-heading" className="taxi-booking-card" id="taxi-booking">
        <div className="taxi-booking-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> LOCAL &amp; OUTSTATION ENQUIRIES</p>
            <h2 id="taxi-booking-heading">Tell us about <em>your ride.</em></h2>
          </div>
          <p>
            Share your travel details and preferred vehicle. We&apos;ll prepare your
            enquiry for WhatsApp.
          </p>
        </div>

        <form className="taxi-booking-form" noValidate onChange={handleChange} onSubmit={submitEnquiry}>
          <fieldset className="trip-type-fieldset">
            <legend>Trip type <span aria-hidden="true">*</span></legend>
            <div className="trip-type-options">
              {(["One Way", "Round Trip"] as const).map((option) => (
                <label className={`trip-type-option${tripType === option ? " selected" : ""}`} key={option}>
                  <input
                    checked={tripType === option}
                    name="tripType"
                    onChange={() => {
                      setTripType(option);
                      setErrors((current) => {
                        const next = { ...current };
                        delete next.returnDate;
                        return next;
                      });
                    }}
                    type="radio"
                    value={option}
                  />
                  <span aria-hidden="true" className="trip-type-indicator" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="taxi-form-grid">
            <label className="taxi-field">
              Pickup Location <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.pickup ? "taxi-pickup-error" : undefined}
                aria-invalid={Boolean(errors.pickup)}
                autoComplete="street-address"
                name="pickup"
                placeholder="Where should we pick you up?"
                required
              />
              {fieldError(errors, "pickup")}
            </label>
            <label className="taxi-field">
              Destination Location <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.destination ? "taxi-destination-error" : undefined}
                aria-invalid={Boolean(errors.destination)}
                name="destination"
                placeholder="Where would you like to go?"
                required
              />
              {fieldError(errors, "destination")}
            </label>
            <label className="taxi-field">
              Travel Date <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.travelDate ? "taxi-travelDate-error" : undefined}
                aria-invalid={Boolean(errors.travelDate)}
                min={today}
                name="travelDate"
                onChange={(event) => setDepartureDate(event.target.value)}
                required
                type="date"
              />
              {fieldError(errors, "travelDate")}
            </label>
            <label className="taxi-field">
              Pickup Time <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.pickupTime ? "taxi-pickupTime-error" : undefined}
                aria-invalid={Boolean(errors.pickupTime)}
                name="pickupTime"
                required
                type="time"
              />
              {fieldError(errors, "pickupTime")}
            </label>
            <label className="taxi-field">
              Number of Travellers <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.travellers ? "taxi-travellers-error" : undefined}
                aria-invalid={Boolean(errors.travellers)}
                min="1"
                name="travellers"
                placeholder="1"
                required
                step="1"
                type="number"
              />
              {fieldError(errors, "travellers")}
            </label>
            {tripType === "Round Trip" && (
              <label className="taxi-field">
                Return Date <span aria-hidden="true">*</span>
                <input
                  aria-describedby={errors.returnDate ? "taxi-returnDate-error" : undefined}
                  aria-invalid={Boolean(errors.returnDate)}
                  min={departureDate || today}
                  name="returnDate"
                  required
                  type="date"
                />
                {fieldError(errors, "returnDate")}
              </label>
            )}
            <label className="taxi-field">
              Full Name <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.fullName ? "taxi-fullName-error" : undefined}
                aria-invalid={Boolean(errors.fullName)}
                autoComplete="name"
                name="fullName"
                placeholder="Your full name"
                required
              />
              {fieldError(errors, "fullName")}
            </label>
            <label className="taxi-field">
              Mobile Number <span aria-hidden="true">*</span>
              <input
                aria-describedby={errors.mobile ? "taxi-mobile-error" : undefined}
                aria-invalid={Boolean(errors.mobile)}
                autoComplete="tel"
                inputMode="tel"
                name="mobile"
                placeholder="Your contact number"
                required
                type="tel"
              />
              {fieldError(errors, "mobile")}
            </label>
            <label className="taxi-field">
              Email <span className="optional-label">Optional</span>
              <input
                aria-describedby={errors.email ? "taxi-email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
              {fieldError(errors, "email")}
            </label>
          </div>

          <fieldset
            aria-describedby={errors.vehicle ? "taxi-vehicle-error" : undefined}
            className="vehicle-fieldset"
          >
            <legend>Preferred Vehicle Category <span aria-hidden="true">*</span></legend>
            <p className="vehicle-intro">Choose a category to include in your enquiry.</p>
            <div className="vehicle-options">
              {vehicleOptions.map((option) => (
                <label
                  className={`vehicle-option${vehicle === option.name ? " selected" : ""}`}
                  key={option.name}
                >
                  <input
                    checked={vehicle === option.name}
                    name="vehicle"
                    onChange={() => {
                      setVehicle(option.name);
                      clearFieldError("vehicle");
                    }}
                    required
                    type="radio"
                    value={option.name}
                  />
                  <VehicleIcon type={option.type} />
                  <span>{option.name}</span>
                </label>
              ))}
            </div>
            {fieldError(errors, "vehicle")}
          </fieldset>

          <p className="vehicle-availability-note">
            Vehicle availability and final pricing will be confirmed by MemorialTrip.
          </p>
          {status === "unavailable" && (
            <div className="taxi-form-status" role="status">
              WhatsApp enquiry is not configured. Please contact us by{" "}
              <a href={`mailto:infomemorialtrip@gmail.com`}>email</a> or{" "}
              <a href={PHONE_NUMBERS[0].href}>phone</a>.
            </div>
          )}
          {status === "ready" && (
            <div className="taxi-form-status" role="status">
              Your enquiry is ready in WhatsApp. Review the details and press Send there.
              This is an enquiry only, not a confirmed booking.{" "}
              {messageUrl && (
                <a href={messageUrl} rel="noopener noreferrer" target="_blank">
                  Open WhatsApp enquiry
                </a>
              )}
            </div>
          )}
          <button className="button button-whatsapp taxi-submit" type="submit">
            Send Taxi Enquiry on WhatsApp <span aria-hidden="true">↗</span>
          </button>
          <p className="taxi-form-footnote">
            Your message opens in WhatsApp for you to review and send. Submitting an enquiry
            does not confirm a booking.
          </p>
          </form>
        </section>

      </div>

      <div className="page-wrap taxi-services-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> TRAVEL, AT YOUR PACE</p>
            <h2 id="taxi-services-heading">Our <em>Services</em></h2>
          </div>
          <p className="section-intro">
            Planning an airport transfer, a quick city journey, or a longer road trip?
            MemorialTrip helps you enquire about suitable travel options with a simple,
            convenient booking experience.
          </p>
        </div>
        <div className="taxi-service-grid">
          {services.map((service, index) => (
            <article className="taxi-service-card" key={service.title}>
              <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
              <ServiceIcon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </div>

      <section aria-labelledby="taxi-discover-heading" className="taxi-discover">
        <div className="taxi-discover-image">
          <Image
            alt="A peaceful island shoreline and tropical blue water"
            fill
            loading="lazy"
            sizes="(max-width: 700px) 100vw, 40vw"
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1100&q=80"
          />
        </div>
        <div className="taxi-discover-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> THE ROAD CAN LEAD ANYWHERE</p>
          <h2 id="taxi-discover-heading">Discover Your <em>Next Holiday</em></h2>
          <p>
            From peaceful beaches and island escapes to mountain destinations,
            cultural experiences, and relaxing retreats, explore travel ideas for
            your next holiday.
          </p>
          <a
            className="button button-navy"
            href="#packages"
            onClick={onExplorePackages}
          >
            Explore Holiday Packages <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </section>
  );
}
