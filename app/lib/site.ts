export const site = {
  name: "Aye Candy",
  legalName: "Aye Candy Speakeasy",
  tagline: "A candy shop out front. A speakeasy behind the door.",
  // Update this once the production domain is live — it powers canonical + OG URLs.
  url: "https://ayecandyhtx.com",
  reservationUrl: "https://toast.app/r/aye-candy-1849-bingle-rd",
  guruUrl: "https://restaurantguru.com/Aye-Candy-Houston",
  phone: "346-319-4439",
  phoneHref: "tel:+13463194439",
  textPhone: "832-414-9074",
  textPhoneHref: "sms:+18324149074",
  email: "ayecandy1849@gmail.com",
  address: {
    street: "1849 Bingle Rd",
    city: "Houston",
    state: "TX",
    zip: "77055",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=1849+Bingle+Rd+Houston+TX+77055",
  social: {
    facebook: "https://www.facebook.com/ayecandyhtx",
    instagram: "https://www.instagram.com/ayecandyhtx",
  },
  minimumAge: 21,
} as const;

/**
 * localStorage key for the age agreement. The stored value is the epoch
 * milliseconds of the confirmation, so it can be aged out.
 *
 * Lives here rather than in the client component: a Server Component importing
 * a named export across a "use client" boundary receives a client reference,
 * not the value — the root layout needs the real string for its inline script.
 */
export const AGE_STORAGE_KEY = "ayecandy:age-verified";

/**
 * How long a confirmation lasts before the gate asks again.
 *
 * Retune here and both the gate and the layout's pre-paint script follow:
 *   60 * 60 * 1000            → 1 hour
 *   12 * 60 * 60 * 1000       → 12 hours
 *   30 * 24 * 60 * 60 * 1000  → 30 days
 */
export const AGE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

export type Hours = { days: string; time: string; closed?: boolean };

export const openHours: Hours[] = [
  { days: "Tuesday – Thursday", time: "5 PM – 12 AM" },
  { days: "Friday – Saturday", time: "5 PM – 2 AM" },
  { days: "Sunday", time: "Closed", closed: true },
];

export const happyHours: Hours[] = [
  { days: "Tuesday – Wednesday", time: "5 PM – 7 PM" },
];

export const music = {
  title: "Love the Tunes",
  lead: "DJ",
  detail: "Friday’s and Saturday’s",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/private-events", label: "Private Events" },
  { href: "/dress-code", label: "Dress Code" },
  { href: "/gallery", label: "Gallery" },
];

export type Cocktail = {
  name: string;
  price: string;
  description: string;
};

/** Pulled from the June 2025 signature cocktail menu. */
export const signatureCocktails: Cocktail[] = [
  {
    name: "The Bourbon Smash",
    price: "17",
    description:
      "Bulleit Bourbon, house made blueberry syrup, mixed with fresh mint and lemon juice, served in a rocks glass garnished with mint and blueberry.",
  },
  {
    name: "Cocosol",
    price: "16",
    description:
      "Tequila Reposado with mint, Alma Finca, lime juice, Coco Lopez and lavender syrup. Served in a rocks glass with a hibiscus salt rim and garnished with a flower on the ice.",
  },
  {
    name: "Wonka‑Tini",
    price: "18",
    description:
      "Vodka, Crème de vanille, Licor 43, chocolate, heavy cream and Ghirardelli white chocolate. Garnished with a fine chocolate.",
  },
  {
    name: "Gold Escalade",
    price: "16",
    description:
      "Mezcal with pineapple juice, agave, lime juice and egg white. Served in a tall coupe.",
  },
  {
    name: "Ancho Pancho",
    price: "15",
    description:
      "Mezcal with Ancho Reyes, agave, Alma Finca, lime juice and passion fruit purée. Served in a rocks glass with a Tajín rim.",
  },
  {
    name: "Espresso Flor Martini",
    price: "16",
    description:
      "Rum with Flor Spresso, espresso and turbinado. Served in a tall coupe, garnished with cocoa powder and coffee beans.",
  },
];

export type EventPackage = {
  tier: string;
  headline: string;
  capacity: string;
  perks: string[];
};

export const eventPackages: EventPackage[] = [
  {
    tier: "Platinum",
    headline: "Full venue rental Friday & Saturday (3 hr minimum)",
    capacity: "50 – 100 people",
    perks: [
      "Valet service available",
      "Fully staffed bar (bartenders, cocktail waitresses, bar backs)",
      "Full bar, charcuterie board available upon request",
      "Outside catering is permitted at an additional cost",
    ],
  },
  {
    tier: "Gold",
    headline: "Full venue rental Sunday or Monday (3 hr minimum)",
    capacity: "50 – 100 people",
    perks: [
      "Valet service available",
      "Fully staffed bar (bartenders, cocktail waitresses, bar backs)",
      "Full bar, charcuterie board available upon request",
      "Outside catering is permitted at an additional cost",
    ],
  },
  {
    tier: "Silver",
    headline: "Private Tuesday, Wednesday & Thursday (3 hr minimum)",
    capacity: "50 – 100 people",
    perks: [
      "Valet service available",
      "Fully staffed bar (bartenders, cocktail waitresses, bar backs)",
      "Full bar, charcuterie board available upon request",
    ],
  },
  {
    tier: "Bronze",
    headline: "Semi‑private rental Tuesday – Saturday (3 hr maximum)",
    capacity: "15 – 30 people",
    perks: [
      "Valet service available",
      "Fully staffed bar (bartenders, cocktail waitresses, bar backs)",
      "Full bar, charcuterie board available upon request",
    ],
  },
];

export const eventContact = {
  coordinator: "Cristy Velasco",
  email: site.email,
  call: "(346) 319-4439",
  callNote: "Landline only",
  text: "(832) 414-9074",
};
