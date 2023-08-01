'use server'

import prisma from "@/utils/prisma"
import { cookies } from 'next/headers'


export async function createCategory(name: string) {
    const username = cookies().get('username')?.value

    if(!username) throw new Error('User not logged in')

    await prisma.category.create({ data: { name, username  } })
}