import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/Event.module.css'
import EventMap from '@/components/EventMap/'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css';

const EventPage = ({ evt: { attributes } }) => {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(attributes.date).toLocaleDateString('en-US')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        {attributes.image && (
          <div className={styles.image}>
            <Image
              src={attributes.image.data ? attributes.image.data.attributes.formats.small.url : '/images/event-default.png'}
              width={960}
              height={600}
              alt='event-image' />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description:</h3>
        <p>{attributes.description}</p>
        <h3>{attributes.venue}</h3>
        <p>{attributes.address}</p>

        <EventMap />

        <Link href='/events'>
          <a className={styles.back}>
            {'<'} Go Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default EventPage

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.data.map(evt => ({
    params: { slug: evt.attributes.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?filters[slug]=${slug}&populate=%2A`)
  const events = await res.json()

  const evt = events.data.find(item => item.attributes.slug == slug)

  return {
    props: {
      evt
    }
  }
}