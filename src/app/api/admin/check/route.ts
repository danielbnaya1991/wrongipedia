import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return NextResponse.json({ isAdmin: isAdmin(user?.id) });
}
