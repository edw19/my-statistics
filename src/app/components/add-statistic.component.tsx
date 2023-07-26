"use client"

import { useState } from "react";
import { createStatistic } from "../actions/add-statistic.action"
import { NumberInput, Button } from "@tremor/react";
import { revalidateTag } from "next/cache";

export function AddStatisticsButton({ categoryId }: { categoryId: number }) {
    const [value, setValue] = useState<number | undefined>(undefined)

    return <div className="flex w-1/3 gap-x-2">
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
                createStatistic(value!, categoryId)
                setValue(undefined)
                revalidateTag("statictics")
            }}>
            Add Value
        </Button>
    </div>
}