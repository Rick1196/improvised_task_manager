"use client"
import CreateProject from "@/views/project/create";
import Link from "next/link";

export default function Page() {
  return <div>
    <Link href="/">Back</Link>
    <CreateProject/>
  </div>
}
