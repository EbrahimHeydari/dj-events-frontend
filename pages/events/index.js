import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import Pagination from "@/components/Pagination"
import { API_URL, PER_PAGE } from "@/config/index"
const qs = require('qs')

const EventsPage = ({ events, page, total }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}
      {events.map(evt => <EventItem key={evt.id} evt={evt.attributes} />)}

      <Pagination total={total} page={page} />
    </Layout>
  )
}

export default EventsPage

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify({
    sort: ['date:asc'],
    populate: '*',
    pagination: {
      pageSize: PER_PAGE,
      page: +page,
    }
  })

  const res = await fetch(`${API_URL}/api/events?${query}`)
  const events = await res.json()

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total
    }
  }
}