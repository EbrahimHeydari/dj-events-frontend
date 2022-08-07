import Layout from '@/components/layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'

const EventPage = ({ evt }) => {
  const deleteEvent = () => {
    console.log('deleted')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`events/edit/${evt.id}`}>
            <a>
              <Image src='/images/icon/edit.png'
                width={16}
                height={16}
                alt='edit' />Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <Image
              src='/images/icon/remove.png'
              height={16}
              width={16}
              alt='delete' />Delete Event
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image}
              width={960}
              height={600}
              alt='event-image' />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>{evt.venue}</h3>
        <p>{evt.address}</p>

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

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0]
    }
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//       revalidate: 1
//     }
//   }
// }