"use client"

import { useState } from "react";
import { createStatistic } from "../actions/add-statistic.action"
import { NumberInput, Button } from "@tremor/react";
import { useUser } from "../state/use-user";

export function AddStatisticsButton({ categoryId }: { categoryId: string }) {
    const [value, setValue] = useState<number | undefined>(undefined)
    const { user } = useUser()

    return <div className="flex flex-col items-center gap-3 mt-3 lg:mt-0 lg:flex-row lg:w-1/3 gap-x-2">
        <NumberInput
            min={1}
            value={value ?? ""}
            onChange={(e) => {
                if (e.target.value === "") return setValue(undefined)
                setValue(Number(e.target.value))
            }}
            enableStepper={false}
        />
        <Button disabled={!value}
            onClick={() => {
                if (!user) return alert("You need to set a username first")
                createStatistic(value!, categoryId, user)
                setValue(undefined)
            }}>
            Add Value
        </Button>
    </div>
}