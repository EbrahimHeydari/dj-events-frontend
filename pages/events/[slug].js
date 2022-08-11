import Layout from '@/components/layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Image from 'next/image'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'

const EventPage = ({ evt, evt: { attributes } }) => {
  const router = useRouter()

  const deleteEvent = async () => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'delete'
      })

      const data = await res.json()

      if (!res.ok)
        toast.error(data ? data.message : 'Something Went Wrong!')
      else
        router.push('/events')
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <Image src='/images/icon/edit.png'
                width={18}
                height={18}
                alt='edit' />
              <span>Edit Event</span>
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <Image
              src='/images/icon/remove.png'
              height={18}
              width={18}
              alt='delete' />
            <span>Delete Event</span>
          </a>
        </div>

        <span>
          {new Date(attributes.date).toLocaleDateString('en-US')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        <ToastContainer />
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
    fallback: true
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