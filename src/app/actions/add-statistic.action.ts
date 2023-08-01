"use server"

import prisma from "@/utils/prisma"

export async function createStatistic(value: number, categoryId: string, username: string, date: Date) {
    await prisma.stadistic.create({ data: { value, categoryId, username, createdAt: date } })
}
