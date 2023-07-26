import prisma from "@/utils/prisma"
import { CategoryChart } from "./components/line-chart.component"

export default async function Home() {
  const categoriesAndStadistics = await prisma.category.findMany({
    include: {
      stadistics: {
        orderBy: {
          createdAt: "desc"
        },
        take: 10
      }
    }
  })

  const data = categoriesAndStadistics.map((category) => {
    return {
      ...category,
      stadistics: category.stadistics.map((sta) => {
        return {
          [category.name]: sta.value,
          date: Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(sta.createdAt))
        }
      })
    }
  })

  return <div>
    <h1 className="my-3 text-4xl text-center ">Your Statistics</h1>
    <section className="grid grid-cols-1 mx-4 gap-y-2">
      {data.map((category) => {
        return <CategoryChart
          data={category.stadistics}
          name={category.name}
          categoryId={category.id}
          key={category.id}
        />
      })}
    </section>
  </div>
}
