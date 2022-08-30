import EventItem from "@/components/EventItem"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { useRouter } from "next/router"
import Link from "next/link"
import qs from 'qs'

const SearchPage = ({ events }) => {
  const router = useRouter()

  return (
    <Layout title='Search Result'>
      <Link href='search'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
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

export default SearchPage

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term }, },
        { venue: { $contains: term }, },
        { performers: { $contains: term } },
        { description: { $contains: term } }
      ]
    }
  })

  const res = await fetch(`${API_URL}/api/events?${query}&populate=%2A`)
  const events = await res.json()

  return {
    props: {
      events: events.data,
    }
  }
}