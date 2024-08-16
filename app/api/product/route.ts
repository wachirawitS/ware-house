import connectMongo from "@/app/libs/database";
import Product from "@/app/models/product.model";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  const products = await Product.find();
  return Response.json({ result: products });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectMongo();
  await await Product.create(body);
  return Response.json({ isSuccess: true });
}