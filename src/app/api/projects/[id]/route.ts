import { entitiesNames } from "@/utils/constant";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const supabase = await createClient();
  const id = (await params).id;
  try {
    const { data: tickets } = await supabase
      .from(entitiesNames.tickets)
      .select(
        `id,title, description, story_points, acceptance_criteria, project_id, status_id`,
      )
      .eq("project_id", id);
    return Response.json({ tickets }, { status: 200 });

  } catch (error) {
    return Response.json({ message: `Unable to fetch tickets for project_id ${id}`, error }, { status: 404 })
  }
}

