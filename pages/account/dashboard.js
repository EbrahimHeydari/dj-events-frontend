import DashboardEvent from "@/components/DashboardEvent"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from '@/styles/Dashboard.module.css'
import { useRouter } from "next/router"

const DashboardPage = ({ events, token }) => {
  const router = useRouter()
  const { data } = events.data.attributes

  const deleteEvent = async id => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok)
        toast.error(data ? data.message : 'Something Went Wrong!')
      else
        router.reload()
    }
  }

  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {data.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout >
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
      events,
      token
    }
  }
}