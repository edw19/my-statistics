'use server'

import { cookies } from 'next/headers'

export async function setCookie(username: string) {
    cookies().set('username', username)
}