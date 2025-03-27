import { createClient } from "@/utils/supabase/server";
import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const supabase = await createClient();
  const id = (await params).id;
  const { data: statuses } = await supabase
    .from("status")
    .select("name, id")
    .eq("project_id", id);
  return Response.json({ statuses });
}
