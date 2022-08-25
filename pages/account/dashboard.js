import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"

const DashboardPage = ({ events }) => {
  return (
    <Layout>
      <h1>Dashboard Page</h1>
    </Layout>
  )
}

export default DashboardPage

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/api/account/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json()

  return {
    props: {
      events
    }
  }
}