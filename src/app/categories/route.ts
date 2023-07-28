import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')

    if (!username) return new NextResponse(JSON.stringify({ data: [] }), { status: 404 })

    const categories = await prisma.category.findMany({
        where: {
            username
        }
    })

    return new NextResponse(JSON.stringify({ data: categories }))
}