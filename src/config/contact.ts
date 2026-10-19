export const MEMORIALTRIP_WHATSAPP_NUMBER = "919999412582";

export const PHONE_NUMBERS = [
  { label: "+91 99994 12582", href: "tel:+919999412582" },
  { label: "+91 84473 81443", href: "tel:+918447381443" },
];

export function createWhatsAppUrl(
  message: string,
  number: string | null = MEMORIALTRIP_WHATSAPP_NUMBER,
) {
  if (!number || !/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function packageWhatsAppMessage(packageName: string) {
  return `Hello MemorialTrip, I am interested in the ${packageName}. Please share the itinerary, travel dates, availability, inclusions, and final price.`;
}

export const TAXI_WHATSAPP_MESSAGE =
  "Hello MemorialTrip, I want to enquire about your taxi services. Please share the available vehicle options, pricing, and service availability.";

export const GENERAL_WHATSAPP_MESSAGE =
  "Hello MemorialTrip, I would like to enquire about your travel packages and services. Please assist me.";

export function taxiBookingWhatsAppMessage(details: {
  tripType: string;
  pickup: string;
  destination: string;
  travelDate: string;
  pickupTime: string;
  returnDate: string;
  travellers: string;
  vehicle: string;
  fullName: string;
  mobile: string;
  email: string;
}) {
  return [
    "Hello MemorialTrip! I would like to enquire about a taxi booking.",
    "",
    `Trip Type: ${details.tripType}`,
    `Pickup Location: ${details.pickup}`,
    `Destination: ${details.destination}`,
    `Travel Date: ${details.travelDate}`,
    `Pickup Time: ${details.pickupTime}`,
    `Return Date: ${details.returnDate}`,
    `Number of Travellers: ${details.travellers}`,
    `Preferred Vehicle: ${details.vehicle}`,
    `Customer Name: ${details.fullName}`,
    `Mobile Number: ${details.mobile}`,
    `Email: ${details.email || "Not Provided"}`,
    "",
    "Please confirm vehicle availability and share the final fare and booking procedure.",
    "",
    "Thank you.",
  ].join("\n");
}
