import connectMongo from "@/app/libs/database";
import Product from "@/app/models/product.model";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
  await connectMongo();
  const products = await Product.find();
  return Response.json({ result: products });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectMongo();
  await await Product.create(body);
  return Response.json({ isSuccess: true });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  await await Product.findByIdAndDelete(id);
  return Response.json({ isSuccess: true });
}

export async function PUT(req: NextRequest) {
  await connectMongo();
  const { id, ...otherFields } = await req.json();
  console.log('id', id);
  console.log('other f', otherFields);
  await await Product.findByIdAndUpdate(id, otherFields);
  return Response.json({ isSuccess: true });
}
