import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const fetchAdminData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const [assessRes, contactRes] = await Promise.all([
      supabase
        .from("assessments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (assessRes.error) throw new Error(assessRes.error.message);
    if (contactRes.error) throw new Error(contactRes.error.message);

    return {
      assessments: assessRes.data ?? [],
      contacts: contactRes.data ?? [],
    };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data, userId };
  });
