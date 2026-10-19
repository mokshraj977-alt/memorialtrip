export type TourCategory = "Domestic" | "International";

export type TourPackage = {
  id: string;
  name: string;
  category: TourCategory;
  destinations: string[];
  image: string;
  imageAlt: string;
  price: number;
  duration?: string;
};

export const packages: TourPackage[] = [
  {
    id: "cordelia-cruises",
    name: "Cordelia Cruises - Cochin - Lakshadweep - Highseas",
    category: "Domestic",
    destinations: ["Cochin", "Lakshadweep"],
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Aerial view of a tropical island surrounded by blue sea",
    price: 36630,
  },
  {
    id: "hills-of-kerala",
    name: "Hills Of Kerala",
    category: "Domestic",
    destinations: ["Kerala"],
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Green tea-covered hills in Kerala",
    price: 13949,
  },
  {
    id: "amazing-andaman",
    name: "Amazing Andaman Private Tour",
    category: "Domestic",
    destinations: ["Andaman"],
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Turquoise water and tropical coastline",
    price: 26700,
  },
  {
    id: "mesmerizing-lakshadweep",
    name: "Mesmerizing Lakshadweep",
    category: "Domestic",
    destinations: ["Lakshadweep"],
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Clear ocean surf rolling toward a tropical shore",
    price: 35250,
  },
  {
    id: "shillong-guwahati",
    name: "Wonders Of Shillong And Guwahati",
    category: "Domestic",
    destinations: ["Shillong", "Guwahati"],
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Sunlight over a green mountain valley",
    price: 30100,
  },
  {
    id: "passionate-paris",
    name: "Passionate Paris",
    category: "International",
    destinations: ["Paris"],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Paris rooftops and the Eiffel Tower at sunset",
    price: 57763,
  },
  {
    id: "andaman-honeymoon",
    name: "Magic Moments Andaman Honeymoon Special",
    category: "Domestic",
    destinations: ["Andaman"],
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Clear blue water along a tropical beach",
    price: 59900,
  },
  {
    id: "kerala-backwaters",
    name: "Backwaters in Kerala",
    category: "Domestic",
    destinations: ["Kerala"],
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A houseboat on a calm tropical waterway",
    price: 16049,
  },
  {
    id: "awesome-agatti",
    name: "Awesome Agatti 3N-4D Domestic Customized tour package With Optional Flight",
    category: "Domestic",
    destinations: ["Agatti", "Lakshadweep"],
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Aerial view of a palm-lined tropical island",
    price: 26300,
    duration: "3 nights / 4 days, as stated in the package name",
  },
  {
    id: "malaysia-bali",
    name: "Malaysia and Bali Tour",
    category: "International",
    destinations: ["Malaysia", "Bali"],
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A Balinese temple surrounded by tropical greenery",
    price: 32000,
  },
  {
    id: "wonders-of-agatti",
    name: "Wonders Of Agatti",
    category: "Domestic",
    destinations: ["Agatti", "Lakshadweep"],
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A palm-lined beach beside calm blue water",
    price: 27500,
  },
  {
    id: "goa",
    name: "Goa Tour Packages – Sun, Sand & Style with Memorial Trip",
    category: "Domestic",
    destinations: ["Goa"],
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A palm-fringed beach in Goa",
    price: 15000,
  },
  {
    id: "kerala-honeymoon",
    name: "Kerala Honeymoon Tour",
    category: "Domestic",
    destinations: ["Kerala"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A peaceful tropical resort beside a pool",
    price: 15000,
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2400&q=90";
