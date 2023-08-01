'use client'

import { Button, TextInput } from "@tremor/react"
import { createCategory } from "../actions/create-category.action"
import { useState } from "react"

export function CreateCategory() {
    const [name, setName] = useState("")

    return <div className="flex items-center gap-x-2">
        <TextInput placeholder="name" onChange={(e) => setName(e.target.value)} />
        <Button
            disabled={name.length === 0 || name.length > 20}
            onClick={async () => {
                await createCategory(name)
                setName("")
            }}>
            Create Category
        </Button>
    </div>
}