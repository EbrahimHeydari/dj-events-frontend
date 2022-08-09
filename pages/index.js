import EventItem from "@/components/eventItem"
import Layout from "@/components/layout"
import { API_URL } from "@/config/index"
import Link from "next/link"

const HomePage = ({ events }) => {
  
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}

      {events.map(evt => <EventItem key={evt.id} evt={evt.attributes} />)}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export default HomePage


export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC_limit=3&populate=%2A`)
  const events = await res.json()

  return {
    props: {
      events: events.data,
      revalidate: 1
    }
  }
}