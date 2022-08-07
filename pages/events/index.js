import EventItem from "@/components/eventItem"
import Layout from "@/components/layout"
import { API_URL } from "@/config/index"

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}
      {events.map(evt => <EventItem key={evt.id} evt={evt} />)}
    </Layout>
  )
}

export default EventsPage


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