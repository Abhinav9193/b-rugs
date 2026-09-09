import {
  getCloudinaryVideoUrl,
  getCloudinaryImageUrl,
} from "../../../lib/cloudinary";

/**
 * Manufacturing Process 5-stage data
 * Exact on-screen copy matching Page 4 of the Content & Typography Brief.
 *
 * Configured with Cloudinary video optimization and local file fallback.
 */
export const processVideos = [
  {
    id: 1,
    step: "01",
    title: "DESIGN & DEVELOPMENT",
    description:
      "Every project begins with the brief: design, colour, dimensions, construction and material are developed before production.",
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_MFG_DESIGN ||
          "bunaai/manufacturing/Design_and_Sketch",
      ) || "/videos/Design & Sketch.mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_DESIGN ||
        "/images/manufacturing/Design & Development .png",
    ),
    duration: "00:30",
  },
  {
    id: 2,
    step: "02",
    title: "YARN PREPARATION",
    description:
      "Selected fibres are prepared for production through the appropriate sorting, spinning, winding, washing or dyeing process.",
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_MFG_YARN ||
          "bunaai/manufacturing/Yarn_Preparation",
      ) || "/videos/Yarn Preparation.mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_YARN ||
        "/images/manufacturing/Yarn Prepration .jpg",
    ),
    duration: "00:30",
  },
  {
    id: 3,
    step: "03",
    title: "WEAVING",
    description:
      "Skilled artisans translate the approved design into the rug, working carefully through each section of the construction.",
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_MFG_WEAVING ||
          "bunaai/manufacturing/Waving_Proccess",
      ) || "/videos/Waving Proccess.mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_WEAVING ||
        "/images/manufacturing/Weaving Rug Thumbnail.jpg",
    ),
    duration: "00:30",
  },
  {
    id: 4,
    step: "04",
    title: "FINISHING & CARE",
    description:
      "The finished rug is refined through the appropriate trimming, washing, brushing, edge finishing and inspection processes.",
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_MFG_FINISHING ||
          "bunaai/manufacturing/Washing_and_Finishing",
      ) || "/videos/Washing & Finishing .mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_FINISHING ||
        "/images/manufacturing/Finishing & Care .jpg",
    ),
    duration: "00:30",
  },
  {
    id: 5,
    step: "05",
    title: "PACKING & DISPATCH",
    description:
      "Completed rugs are checked, prepared and packed for safe handling and delivery according to the order requirements.",
    video:
      getCloudinaryVideoUrl(
        import.meta.env.VITE_CLOUDINARY_MFG_PACKING ||
          "bunaai/manufacturing/Comp_1_1",
      ) || "/videos/Comp 1_1.mp4",
    poster: getCloudinaryImageUrl(
      import.meta.env.VITE_CLOUDINARY_POSTER_PACKING ||
        "/images/manufacturing/Packing & Dispatch .jpg",
    ),
    duration: "00:30",
  },
];

/* Page 02 — Section introduction copy */
export const MANUFACTURING_PAGE_COPY = {
  eyebrow: "MANUFACTURING PROCESS",
  headline: "From Fibre to Finished Rug.",
  intro:
    "Every stage is guided by skilled hands, careful specification and proven techniques to create rugs made for your requirements.",
  verticalMotif: {
    line1: "TRADITION",
    line2: "IN MOTION",
  },
};
