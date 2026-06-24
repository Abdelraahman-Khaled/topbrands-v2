const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches page data from the external API.
 * @param {string} page - The page slug (e.g., 'home')
 * @param {string} locale - The current locale (e.g., 'ar' or 'en')
 * @returns {Promise<Object>} The page data
 */
export async function getPageData(page, locale) {
  console.log("locale", locale);

  try {
    console.log(`Fetching ${page} data with locale: ${locale}`);
    const res = await fetch(`${BASE_URL}/web_site/get_page?page=${page}`, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh — instant dashboard updates
    });

    if (!res.ok) {
      console.error(`Failed to fetch page data for ${page}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching page data for ${page}:`, error);
    return null;
  }
}

/**
 * Fetches specific brand details and its products.
 * @param {string|number} id - The brand ID
 * @param {string} locale - The current locale
 * @returns {Promise<Object>} The brand data
 */
export async function getBrandProducts(id, locale) {
  const fetchPage = async (page) => {
    const url = new URL(`${BASE_URL}/web_site/show_brand_products/${id}`);
    if (page) url.searchParams.set("page", page);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch brand products for ID ${id} (page ${page || 1}): ${res.statusText}`,
      );
    }

    return res.json();
  };

  try {
    // First page tells us how many pages exist (API paginates at 20/page
    // and ignores items_per_page/per_page overrides).
    const firstPage = await fetchPage(1);
    const totalPages = firstPage?.pagination?.total_pages || 1;

    if (totalPages <= 1) {
      return firstPage;
    }

    // Fetch the remaining pages in parallel and merge their products.
    const remaining = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2)),
    );

    const allProducts = [
      ...(firstPage.products || []),
      ...remaining.flatMap((p) => p?.products || []),
    ];

    return { ...firstPage, products: allProducts };
  } catch (error) {
    console.error(`Error fetching brand products for ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all FAQs from the external API.
 * @param {string} locale - The current locale
 * @returns {Promise<Array>} List of FAQs
 */
export async function getFaqs(locale) {
  try {
    const res = await fetch(`${BASE_URL}/web_site/get_all_faqs`, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

/**
 * Fetches company contact data from the external API.
 * @param {string} locale - The current locale
 * @returns {Promise<Object>} Company data
 */
export async function getCompanyData(locale) {
  try {
    const res = await fetch(`${BASE_URL}/web_site/get_company_data`, {
      method: "GET",
      headers: {
        locale,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch company data: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching company data:`, error);
    return null;
  }
}
