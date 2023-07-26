"use client"

import { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import { Card, Title, LineChart, Flex, Select, SelectItem } from "@tremor/react"
import { AddStatisticsButton } from "./add-statistic.component"

const options = [
    // { value: "daily", label: "daily" },
    { value: "weekly", label: "Weekly" },
    { value: "montly", label: "montly" }
]

function useStatistics(categoryId: number, queryBy: string) {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchStatistics() {
            const response = await fetch(`http://localhost:3000/statictics?categoryId=${categoryId}&queryby=${queryBy}`, {
                next: { tags: ["statistics"] },
            })
            const data = await response.json()
            setData(data.data)
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
            data={
                statistics?.map((sta: any) => ({
                    [name]: sta.value,
                    date: Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(sta.createdAt)),
                }))
            }
            className="mt-6"
            index="date"
            categories={[name]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
        />
    </Card>
}

