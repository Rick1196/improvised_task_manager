import { entitiesNames } from "@/utils/constant";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
export async function GET(req: NextApiRequest, res: NextApiResponse<any>) {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select();
  console.log("projects", projects);
  return Response.json({ projects });
}

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { title, description } = body;
  const supabase = await createClient();
  try {
    await supabase.from(entitiesNames.project).insert({ title, description });
    return Response.json({ message: `Project ${title} created successfully` }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Unable to create new project", error: error }, { status: 500 });

  }
}
