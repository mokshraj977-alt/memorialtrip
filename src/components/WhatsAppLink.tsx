import type { ReactNode } from "react";
import type { MouseEventHandler } from "react";
import { createWhatsAppUrl, PHONE_NUMBERS } from "@/config/contact";

type WhatsAppLinkProps = {
  children: ReactNode;
  className: string;
  message: string;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function WhatsAppLink({
  children,
  className,
  message,
  label,
  onClick,
}: WhatsAppLinkProps) {
  const href = createWhatsAppUrl(message);

  if (!href) {
    return (
      <span className={`whatsapp-unavailable ${className}`} role="status">
        WhatsApp is unavailable.{" "}
        <a href={PHONE_NUMBERS[0].href}>Call us</a>
      </span>
    );
  }

  return (
    <a
      aria-label={label}
      className={className}
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
