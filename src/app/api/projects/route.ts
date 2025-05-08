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
  const { title, description, statuses } = body;
  const supabase = await createClient();
  try {
    const {data: projectData} = await supabase.from(entitiesNames.project).insert({ title, description }, {count: "exact"}).select();
    const statusesRows = statuses.map((status) => ({name: status, description: status, project_id: projectData?.[0].id }))
    await supabase.from(entitiesNames.statuses).insert(statusesRows);   
    return Response.json({ message: `Project ${title} created successfully` }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ message: "Unable to create new project", error: error }, { status: 500 });

  }
}
