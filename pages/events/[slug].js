import { useRouter } from 'next/router'
import Layout from '@/components/layout'

const EventPage = () => {
  const router = useRouter()
  return (
    <Layout>
      <h1>Events</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push('/')}>Go back</button>
    </Layout>
  )
}

export default EventPage