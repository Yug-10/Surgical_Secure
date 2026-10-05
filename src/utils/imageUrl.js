const SERVER_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function getImageUrl(value) {
  if (!value) return "";

  const url = String(value).trim();
  if (!url) return "";

  // Browser-generated previews and absolute URLs must be used as-is.
  if (/^(https?:|blob:|data:)/i.test(url)) return url;

  // Files in the React public folder should stay on the frontend origin.
  if (url.startsWith("/images/") || url.startsWith("/favicon")) return url;

  // Backend upload paths are returned by the API as /uploads/...
  if (url.startsWith("/")) return `${SERVER_URL}${url}`;

  return `${SERVER_URL}/${url}`;
}

export { SERVER_URL };
export default getImageUrl;
