import {
  getCloudinaryVideoUrl,
  getCloudinaryImageUrl,
} from "../../../lib/cloudinary";

/**
 * Heritage section video sequence data
 * Exact on-screen copy and 5-video narrative sequence from brief (Page 3).
 *
 * Configured with Cloudinary video optimization and local file fallback.
 */
export const heritageVideos = [
  {
    id: 1,
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_HERITAGE_SKILL ||
          "bunaai/heritage/Waving_VIdeo",
      ) || "/videos/Waving VIdeo .mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_WEAVING ||
        "/images/manufacturing/Weaving Rug Thumbnail.jpg",
    ),
    label: "HUMAN SKILL",
    message: "Human skill.",
    tagline: "HANDS\nTHAT WEAVE\nA BETTER\nTOMORROW",
  },
  {
    id: 2,
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_HERITAGE_FINISHING ||
          "bunaai/heritage/Washing_and_finishing_aep",
      ) || "/videos/Washing and finishing .aep.mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_FINISHING ||
        "/images/manufacturing/Finishing & Care .jpg",
    ),
    label: "ATTENTION AFTER WEAVING",
    message: "Attention after weaving.",
    tagline: "WHERE\nTRADITION\nMEETS\nPRECISION",
  },
  {
    id: 3,
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_HERITAGE_PACKING ||
          "bunaai/heritage/Packing_and_Folding",
      ) || "/videos/Packing & Folding .mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_PACKING ||
        "/images/manufacturing/Packing & Dispatch .jpg",
    ),
    label: "READY FOR THE WORLD",
    message: "Ready for the world.",
    tagline: "EXCELLENCE\nIN\nEVERY\nSTEP",
  },
];

/* Page 01 — Final recommended copy */
export const HERITAGE_PAGE_COPY = {
  eyebrow: "OUR HERITAGE",
  headline: {
    line1: "Real People.",
    line2: "Real Process.",
    line3Italic: "Exceptional Rugs.",
  },
  body: "Step inside our manufacturing journey and see how traditional craft, skilled hands and modern production practices come together to create rugs for the world.",
  cta: "WATCH OUR MANUFACTURING STORY",
  verticalMotif: {
    line1: "TRADITION",
    line2: "IN MOTION",
  },
};
