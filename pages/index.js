import Layout from "@/components/layout"
import { API_URL } from "@/config/index"

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default HomePage


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {
      events,
      revalidate: 1
    }
  }
}