import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
export async function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select();
  console.log("projects", projects);
  return Response.json({ projects });
}
