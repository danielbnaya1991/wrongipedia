/**
 * Admin utility — checks if a user ID is in the admin list.
 * Set ADMIN_USER_IDS env var as comma-separated UUIDs.
 */
export function isAdmin(userId: string | null | undefined): boolean {
  if (!userId) return false;
  const adminIds = process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) || [];
  return adminIds.includes(userId);
}
