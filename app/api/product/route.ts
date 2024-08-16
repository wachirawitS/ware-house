import connectMongo from "@/app/libs/database";
import Product from "@/app/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectMongo();
  const products = await Product.find();
  return NextResponse.json({ result: products });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await connectMongo();
  await await Product.create(body);
  return NextResponse.json({ isSuccess: true });
}

export async function DELETE(req: NextRequest) {
  await connectMongo();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  await await Product.findByIdAndDelete(id);
  return NextResponse.json({ isSuccess: true });
}

export async function PUT(req: NextRequest) {
  await connectMongo();
  const { id, ...otherFields } = await req.json();
  await await Product.findByIdAndUpdate(id, otherFields);
  return NextResponse.json({ isSuccess: true });
}
