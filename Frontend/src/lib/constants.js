/* ============================================================
   BUNAAI RUGS — CONSTANTS
   ============================================================ */

export const SITE_CONFIG = {
  name: "Bunaai Rugs",
  tagline: "Manufacturing & Wholesale",
  description:
    "Bunaai Rugs combines traditional craftsmanship with modern manufacturing to create rugs for wholesale, retail, design and business requirements.",
  url: "https://www.bunaairugs.com/",
};

export const NAV_ITEMS = [
  { id: "heritage", label: "OUR HERITAGE", href: "#heritage" },
  {
    id: "manufacturing",
    label: "MANUFACTURING PROCESS",
    href: "#manufacturing",
  },
  { id: "sustainability", label: "SUSTAINABILITY", href: "#sustainability" },
  { id: "contact", label: "CONTACT", href: "#contact" },
];

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/bunaairugs/",
    icon: "instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/bunaairugs/",
    icon: "facebook",
  },
  {
    name: "Pinterest",
    url: "https://www.pinterest.com/bunaairugs/",
    icon: "pinterest",
  },
  { name: "Twitter", url: "https://x.com/Bunaairugs?s=20", icon: "twitter" },
];

/* Official contact information */
export const CONTACT_INFO = {
  email: "bunaairugs@gmail.com",
  phone1: "+91 88404 42688",
  phone2: "+91 92052 07838",
  phone1Raw: "+918840442688",
  phone2Raw: "+919205207838",
  address: {
    line1: "Village - Shivrampur, Post Saripur 221314",
    line2: "Umarha BO, UTTAR PRADESH",
  },
  location: "Shivrampur, Saripur 221314, Umarha, Uttar Pradesh, India",
};

/* Auto-advance durations (ms) */
export const HERITAGE_INTERVAL = 7000;
export const MANUFACTURING_INTERVAL = 6000;

/* Requirement type options */
export const REQUIREMENT_TYPES = [
  { value: "wholesale", label: "Wholesale Collection" },
  { value: "custom", label: "Custom Rugs" },
  { value: "private-label", label: "Private Label" },
  { value: "hospitality", label: "Hospitality / Contract" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

/* Estimated quantity options */
export const QUANTITY_RANGES = [
  { value: "10-50", label: "10–50" },
  { value: "50-100", label: "50–100" },
  { value: "100-500", label: "100–500" },
  { value: "500-1000", label: "500–1,000" },
  { value: "1000+", label: "1,000+" },
];

/* Country list (top countries for rug trade) */
export const COUNTRIES = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "JP", label: "Japan" },
  { value: "SG", label: "Singapore" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "BE", label: "Belgium" },
  { value: "DK", label: "Denmark" },
  { value: "NO", label: "Norway" },
  { value: "NZ", label: "New Zealand" },
  { value: "OTHER", label: "Other" },
];
