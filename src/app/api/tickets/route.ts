import { entitiesNames } from "@/utils/constant";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  console.log("debug", body)
  const { ticket, projectId } = body;
  const supabase = await createClient();
  try {
    await supabase.from(entitiesNames.tickets).insert({ title: ticket.title, description: ticket.description, story_points: ticket.storyPoints, acceptance_criteria: ticket.acceptanceCriteria, project_id: projectId, status_id: 1 });
    return Response.json({ message: `Ticket: ${ticket.title} added to the project` }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Something went wrong", error: error }, { status: 500 });
  }
}
