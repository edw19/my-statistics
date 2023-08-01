"use client"

import { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import { Card, Title, LineChart, Select, SelectItem } from "@tremor/react"
import { AddStatisticsButton } from "./add-statistic.component"
import { useUser } from "../state/use-user";

const options = [
    { value: "weekly", label: "Weekly" },
    { value: "montly", label: "Montly" }
]

function useStatistics(categoryId: string, queryBy: string) {
    const [data, setData] = useState([])
    const [total, setTotal] = useState<number | undefined>()
    const { user } = useUser()

    useEffect(() => {
        async function fetchStatistics() {
            const { data, total } = await fetch(`/statictics?categoryId=${categoryId}&queryby=${queryBy}&username=${user}`).then((res) => res.json())
            setData(data)
            setTotal(total)
        }
        fetchStatistics()
    }, [queryBy])

    return {
        statistics: data,
        total
    }
}

export function CategoryChart({ name, categoryId }: { name: string, categoryId: string }) {
    const [queryBy, setQueryBy] = useState("weekly")
    const { statistics, total } = useStatistics(categoryId, queryBy)
    
    return <Card>
        <div className="flex flex-col items-center my-1 lg:my-0 lg:flex-row lg:justify-around">
            <Title>Your {queryBy} progress in {name} {queryBy === "weekly" && `(${total})`}</Title>
            <div className="flex flex-col lg:flex-row gap-x-2">
                <Select
                    value={queryBy}
                    onValueChange={setQueryBy}
                >
                    {options.map((option) => <SelectItem
                        key={option.value}
                        value={option.value}
                        icon={QuestionMarkCircleIcon}
                    >
                        {option.label}
                    </SelectItem>)}
                </Select>
                <AddStatisticsButton categoryId={categoryId} />
            </div>
        </div>
        <LineChart
            data={statistics}
            className="mt-2"
            index="label"
            // categories={queryBy === "montly" ? ["sum"] : [name]}
            categories={["sum"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
        />
    </Card>
}

