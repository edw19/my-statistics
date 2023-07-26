"use client"

import { Card, Title, LineChart, Flex } from "@tremor/react";
import { AddStatisticsButton } from "./add-statistic.component";

export function CategoryChart({ data, name, categoryId }: { data: any, name: string, categoryId: number }) {
    return <Card>
        <Flex>
            <Title>Your progress in {name}</Title>
            <AddStatisticsButton categoryId={categoryId} />
        </Flex>
        <LineChart
            className="mt-6"
            data={data}
            index="date"
            categories={[name]}
            colors={["emerald", "gray"]}
            yAxisWidth={40}
        />
    </Card>
}

