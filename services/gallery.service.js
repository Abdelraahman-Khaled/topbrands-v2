const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches the list of gallery albums from the external API.
 * @param {Object} options
 * @param {string} [options.category] - Category slug (e.g. 'operation'). Omit for all.
 * @param {number} [options.page=1] - Page number.
 * @param {number} [options.items=100] - Items per page.
 * @param {string} locale - The current locale ('ar' | 'en').
 * @returns {Promise<{ data: Array, pagination: Object }>} Galleries and pagination.
 */
export async function getGalleries({ category, page = 1, items = 100 } = {}, locale) {
  try {
    const params = new URLSearchParams({ page: String(page), items: String(items) });
    if (category) params.set("category", category);

    const res = await fetch(`${BASE_URL}/web_site/get_all_galleries?${params}`, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch galleries: ${res.statusText}`);
      return { data: [], pagination: null };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return { data: [], pagination: null };
  }
}

/**
 * Fetches a single gallery album including all of its photos.
 * @param {string|number} id - The gallery ID.
 * @param {string} locale - The current locale ('ar' | 'en').
 * @returns {Promise<Object|null>} The gallery with its `photos[]`, or null on error.
 */
export async function getGallery(id, locale) {
  try {
    const res = await fetch(`${BASE_URL}/web_site/show_gallery/${id}`, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch gallery ${id}: ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching gallery ${id}:`, error);
    return null;
  }
}
