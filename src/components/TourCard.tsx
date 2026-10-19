import Image from "next/image";
import { packageWhatsAppMessage } from "@/config/contact";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import type { TourPackage } from "@/data/packages";

type TourCardProps = {
  tour: TourPackage;
  onOpen: (tour: TourPackage) => void;
};

export function TourCard({ tour, onOpen }: TourCardProps) {
  return (
    <article className="tour-card">
      <button
        aria-label={`View details for ${tour.name}`}
        className="tour-card-image"
        onClick={() => onOpen(tour)}
        type="button"
      >
        <Image
          alt={tour.imageAlt}
          className="tour-image"
          fill
          loading="lazy"
          sizes="(max-width: 680px) 90vw, (max-width: 1050px) 45vw, 30vw"
          src={tour.image}
        />
        <span className="tour-category">{tour.category}</span>
        <span aria-hidden="true" className="image-arrow">
          ↗
        </span>
      </button>
      <div className="tour-card-content">
        <div className="tour-location">
          <span aria-hidden="true" className="pin-icon">
            ◇
          </span>
          {tour.destinations.join(" · ")}
        </div>
        <h3>{tour.name}</h3>
        <div className="tour-card-bottom">
          <div>
            <span className="price-caption">Starting from</span>
            <strong>₹{tour.price.toLocaleString("en-IN")}</strong>
          </div>
          <span className="duration">
            {tour.duration ? "3 nights · 4 days" : "Contact for duration"}
          </span>
        </div>
        <div className="tour-card-actions">
          <button
            className="text-link"
            onClick={() => onOpen(tour)}
            type="button"
          >
            Explore journey <span aria-hidden="true">→</span>
          </button>
          <WhatsAppLink
            className="whatsapp-card-link"
            label={`Enquire on WhatsApp about ${tour.name}`}
            message={packageWhatsAppMessage(tour.name)}
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
