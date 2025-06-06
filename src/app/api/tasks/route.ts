// src/app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { creerTache, lireToutesLesTaches } from "@/gateway/taskGateway";

export async function GET() {
  await connectDB();

  try {
    const taches = await lireToutesLesTaches();
    return NextResponse.json(taches);
  } catch {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const { title } = await req.json();
    const tache = await creerTache(title);
    return NextResponse.json(tache, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
