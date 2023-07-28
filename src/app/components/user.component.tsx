"use client"

import { useState } from "react"
import { Button, TextInput } from "@tremor/react"
import { useUser } from "../state/use-user"
import { setCookie } from "../actions/set-cookie"

export default function User() {
    const [username, setUsername] = useState("")
    const { user, setUser } = useUser()

    const handleSave = async () => {
        setUser(username)
        await setCookie(username)
    }

    if (!user) return <div className="flex gap-2">
        <TextInput placeholder="type your username" onChange={(e) => setUsername(e.target.value)} />
        <Button
            disabled={username.length === 0 || username.length > 20}
            onClick={handleSave}>Save</Button>
    </div>

    return <p className="my-3 text-4xl text-white">{user}</p>

}