import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const categories = await prisma.category.findMany()

    return new NextResponse(JSON.stringify({ data: categories }))
}