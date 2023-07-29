import { CategoryChart } from "./components/line-chart.component"
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'

const User = dynamic(() => import("./components/user.component"), { ssr: false })

export default async function Home() {
  const username = cookies().get("username")

  if (!username) return <User />

  const categories = await fetch(`${process.env.URL}/categories?username=${username?.value}`).then((res) => res.json())

  return <div>
    <section className="flex items-center justify-center">
      <div className="flex items-center gap-2 lg:w-2/5">
        <h1 className="w-full my-3 text-4xl text-white">Your Statistics</h1>
        <User />
      </div>
    </section>
    <section className="grid grid-cols-1 mx-6 gap-y-4">
      {categories.data?.map((category: any) => {
        return <CategoryChart
          name={category.name}
          categoryId={category.id}
          key={category.id}
        />
      })}
    </section>
  </div>
}
