import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('categoryId')
    const queryby = searchParams.get('queryby')

    const date = new Date()

    let gte
    let lte

    if (queryby === "daily") {
        gte = startOfDay(date).toISOString()
        lte = endOfDay(date).toISOString()
    }

    if (queryby === "weekly") {
        gte = startOfWeek(date).toISOString()
        lte = endOfWeek(date).toISOString()
    }

    if (queryby === "monthly") {
        gte = startOfMonth(date).toISOString()
        lte = endOfMonth(date).toISOString()
    }

    const categories = await prisma.stadistic.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            categoryId: Number(id),
            createdAt: {
                gte,
                lte
            }
        },
        take: 10
    })

    return new NextResponse(JSON.stringify({ data: categories }))
}