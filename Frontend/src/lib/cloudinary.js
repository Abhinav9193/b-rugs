/**
 * Cloudinary Media Helper & URL Generator
 *
 * Configurable via environment variables (VITE_CLOUDINARY_CLOUD_NAME)
 * Supports video delivery with auto format, quality, and streaming optimizations (f_auto, q_auto).
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";

/**
 * Builds an optimized Cloudinary video URL or falls back to the provided path/URL.
 *
 * @param {string} publicIdOrUrl - Cloudinary public ID (e.g., 'bunaai/manufacturing/design_sketch') or full URL/relative path fallback
 * @param {object} [options] - Transformations (quality, format, crop, etc.)
 * @returns {string} Fully qualified Cloudinary URL or original local fallback
 */
export function getCloudinaryVideoUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return "";

  // If it's already a full HTTP(S) URL (Cloudinary or external CDN), return as-is
  if (
    publicIdOrUrl.startsWith("http://") ||
    publicIdOrUrl.startsWith("https://")
  ) {
    return publicIdOrUrl;
  }

  // If Cloud Name is configured and path doesn't start with absolute root local slash, or if designated as Cloudinary public ID
  if (CLOUD_NAME && !publicIdOrUrl.startsWith("/")) {
    const transformations = [
      options.quality || "q_auto",
      options.format || "f_auto",
      options.crop ? `c_${options.crop}` : null,
      options.width ? `w_${options.width}` : null,
    ]
      .filter(Boolean)
      .join(",");

    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, "");
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformations ? transformations + "/" : ""}${cleanPublicId}`;
  }

  // Fallback to local path
  return publicIdOrUrl;
}

/**
 * Helper to build an optimized Cloudinary image/poster URL.
 *
 * @param {string} publicIdOrUrl - Cloudinary public ID or local fallback path
 * @param {object} [options] - Transformations
 * @returns {string} Cloudinary image URL or original path
 */
export function getCloudinaryImageUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return "";

  if (
    publicIdOrUrl.startsWith("http://") ||
    publicIdOrUrl.startsWith("https://")
  ) {
    return publicIdOrUrl;
  }

  if (CLOUD_NAME && !publicIdOrUrl.startsWith("/")) {
    const transformations = [
      options.quality || "q_auto",
      options.format || "f_auto",
      options.crop ? `c_${options.crop}` : null,
      options.width ? `w_${options.width}` : null,
    ]
      .filter(Boolean)
      .join(",");

    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, "");
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations ? transformations + "/" : ""}${cleanPublicId}`;
  }

  return publicIdOrUrl;
}
