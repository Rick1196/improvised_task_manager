import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
  req: NextApiRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const supabase = await createClient();
  const id = (await params).id;
  const { data: tickets } = await supabase
    .from("ticket")
    .select(
      `id,title, description, story_points, acceptance_criteria, project_id, status_id`,
    )
    .eq("project_id", id);
  return Response.json({ tickets });
}
