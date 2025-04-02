import { entitiesNames } from "@/utils/constant";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server"


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const { body } = await req.json();
  const { status_id, title } = body.ticket;
  const supabase = await createClient();
  try {
    await supabase.from(entitiesNames.tickets).update({ status_id }).eq("id", id);
    return Response.json({ message: `"${title}" ticket have been updated` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: `Unable to update "${title}" ticket`, error: error }, { status: 500 });
  }
}
