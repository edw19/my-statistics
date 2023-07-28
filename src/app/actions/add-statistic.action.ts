"use server"

import prisma from "@/utils/prisma"

export async function createStatistic(value: number, categoryId: number, username: string) {
    await prisma.stadistic.create({ data: { value, categoryId, username } })
}
