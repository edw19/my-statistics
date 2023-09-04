import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { startOfMonth, endOfMonth, startOfDay, endOfDay, sub, getDay, getDate } from 'date-fns'
import { log } from "console";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


interface Value {
    label: string
    sum: number
    repetitions: number
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('categoryId') as any
    const queryby = searchParams.get('queryby')
    const username = searchParams.get('username')
    const isWeekly = queryby === "weekly"
    const isMonthly = queryby === "montly"

    const category = await prisma.category.findUnique({
        where: {
            id: id
        }
    })

    if (!category || !username) return new NextResponse(JSON.stringify({ data: [] }), { status: 404 })

    if (isWeekly) {
        const date = new Date()
        const results: Value[] = []

        const today = getDay(date)
        const takeDays = [...days.slice(0, today + 1).reverse()]
        const addMissingDays = [...days.slice(today + 1, days.length).reverse()]
        const daysToShow = [...takeDays, ...addMissingDays]

        let subtract = 0

        for (const day of daysToShow) {
            const currentDate = sub(date, { days: subtract })
            const dayToShow = getDate(currentDate)

            const gte = startOfDay(currentDate).toISOString()
            const lte = endOfDay(currentDate).toISOString()

            const query = await prisma.stadistic.aggregate({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    categoryId: id,
                    username,
                    createdAt: {
                        gte,
                        lte
                    }
                },
                _sum: {
                    value: true
                },
                _count: {
                    _all: true
                }
            })

            results.push({
                label: `${day} ${dayToShow}`,
                sum: query._sum?.value ?? 0,
                repetitions: query._count?._all ?? 0
            })

            subtract++
        }
        return new NextResponse(JSON.stringify({ data: results, total: results.reduce((acc, curr) => acc + curr.sum, 0) }))
    }

    if (isMonthly) {
        const date = new Date()
        const foundMonths = months.slice(date.getMonth() - 2, date.getMonth() + 1)
        const monthsToConsult = [...foundMonths.reverse()]
        const results = []

        for (const month of monthsToConsult) {

            const indexMonth = months.indexOf(month)

            const date = new Date().setMonth(indexMonth)

            const query = await prisma.stadistic.aggregate({
                where: {
                    categoryId: id,
                    username,
                    createdAt: {
                        gte: startOfMonth(date).toISOString(),
                        lte: endOfMonth(date).toISOString()
                    }
                },
                _sum: {
                    value: true
                }
            })

            const result = {
                sum: query._sum?.value ?? 0,
                label: month,
            }

            results.push(result)
        }

        return new NextResponse(JSON.stringify({ data: results }))
    }

}