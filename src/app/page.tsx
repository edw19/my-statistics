import { CategoryChart } from "./components/line-chart.component"

export const revalidate = 1 // revalidate every hour

export default async function Home() {
  const categories: any = await fetch("http://localhost:3000/categories", {
    next: { tags: ["categories"] },
  })
    .then((res) => res.json())

  return <div>
    <h1 className="my-3 text-4xl text-center ">Your Statistics</h1>
    <section className="grid grid-cols-1 mx-4 gap-y-2">
      {categories.data.map((category: any) => {
        return <CategoryChart
          name={category.name}
          categoryId={category.id}
          key={category.id}
        />
      })}
    </section>
  </div>
}
