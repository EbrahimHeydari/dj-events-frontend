import DashboardEvent from "@/components/DashboardEvent"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from '@/styles/Dashboard.module.css'

const DashboardPage = ({ events }) => {
  const { data } = events.data.attributes

  const deleteEvent = id => {
    console.log(id)
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
      events
    }
  }
}