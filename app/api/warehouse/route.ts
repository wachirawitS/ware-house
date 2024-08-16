import connectMongo from "@/app/libs/database";
import Werehouse from "@/app/models/warehouse.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectMongo();
  const body = await req.json();
  const warehouse = await Werehouse.create(body);
  return Response.json({ result: warehouse });
}

export async function GET(request: NextRequest) {
  await connectMongo();
  const warehouses = await Werehouse.find();
  return Response.json({ result: warehouses });
}
