import { headers } from "next/headers";

/**
 * Extract client IP from request headers.
 * Priority: Netlify header > Cloudflare > X-Forwarded-For > fallback
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();

  // Netlify
  const netlifyIp = headersList.get("x-nf-client-connection-ip");
  if (netlifyIp) return netlifyIp;

  // Cloudflare
  const cfIp = headersList.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // Standard proxy header
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  // Real IP header
  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp;

  return "0.0.0.0";
}
