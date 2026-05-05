"use client";
import { useParams } from "next/navigation";
import { defaultLocale } from "../i18n/config";

/**
 * A drop-in replacement for <a> that auto-prefixes the current locale to the href.
 * External URLs (http/https/mailto/tel/#) are passed through unchanged.
 */
export default function LocalizedLink({ href, children, ...props }) {
  const params = useParams();
  const locale = params?.locale || defaultLocale;

  const isExternal =
    !href ||
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel") ||
    href.startsWith("#");

  const localizedHref = isExternal ? href : `/${locale}${href.startsWith("/") ? href : `/${href}`}`;

  return (
    <a href={localizedHref} {...props}>
      {children}
    </a>
  );
}
