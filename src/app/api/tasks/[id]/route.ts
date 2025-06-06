import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { lireTacheParId, modifierTache, supprimerTache } from "@/gateway/taskGateway";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const tache = await lireTacheParId(context.params.id);
  if (!tache) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json(tache);
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const data = await request.json();

  const tacheModifiee = await modifierTache(context.params.id, data);
  if (!tacheModifiee) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json(tacheModifiee);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  await connectDB();

  const tacheSupprimee = await supprimerTache(context.params.id);
  if (!tacheSupprimee) return NextResponse.json({ message: "Tâche non trouvée" }, { status: 404 });

  return NextResponse.json({ message: "Tâche supprimée" });
}
