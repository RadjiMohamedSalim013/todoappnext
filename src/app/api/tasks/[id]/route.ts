import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { lireTacheParId, modifierTache, supprimerTache } from "@/gateway/taskGateway";

type Context = { params: { id: string } };

export async function GET(request: Request, context: Context) {
  const id = context.params.id;
  if (!id) return NextResponse.json({ message: "ID manquant" }, { status: 400 });

  await connectDB();

  const tache = await lireTacheParId(id);
  if (!tache) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json(tache);
}

export async function PUT(request: Request, context: Context) {
  const id = context.params.id;
  if (!id) return NextResponse.json({ message: "ID manquant" }, { status: 400 });

  await connectDB();

  const data = await request.json();

  const tacheModifiee = await modifierTache(id, data);
  if (!tacheModifiee) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json(tacheModifiee);
}

export async function DELETE(request: Request, context: Context) {
  const id = context.params.id;
  if (!id) return NextResponse.json({ message: "ID manquant" }, { status: 400 });

  await connectDB();

  const tacheSupprimee = await supprimerTache(id);
  if (!tacheSupprimee) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json({ message: "Tâche supprimée" });
}
