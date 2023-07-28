"use client"

import { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import { Card, Title, LineChart, Flex, Select, SelectItem } from "@tremor/react"
import { AddStatisticsButton } from "./add-statistic.component"

const options = [
    { value: "weekly", label: "Weekly" },
    { value: "montly", label: "Montly" }
]

function useStatistics(categoryId: number, queryBy: string) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchStatistics() {
            const { data } = await fetch(`http://localhost:3000/statictics?categoryId=${categoryId}&queryby=${queryBy}`).then((res) => res.json())
            setData(data)
        }
        fetchStatistics()
    }, [queryBy])

    return {
        statistics: data
    }
}

export function CategoryChart({ name, categoryId }: { name: string, categoryId: number }) {
    const [queryBy, setQueryBy] = useState("weekly")
    const { statistics } = useStatistics(categoryId, queryBy)

    return <Card>
        <Flex>
            <Title>Your progress in {name}</Title>
            <div className="w-48">
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
            </div>
            <AddStatisticsButton categoryId={categoryId} />
        </Flex>
        <LineChart
            data={statistics}
            className="mt-6"
            index="label"
            // categories={queryBy === "montly" ? ["sum"] : [name]}
            categories={["sum"]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
        />
    </Card>
}

