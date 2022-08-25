import 'react-toastify/dist/ReactToastify.css'
import Layout from "@/components/Layout"
import styles from '@/styles/Form.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'

const AddEventPage = ({ token }) => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: '',
    venue: '',
    address: '',
    performers: '',
    description: '',
    date: '',
    time: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    // Validation
    const hasEmptyField = Object.values(values).some(element => element.trim() === '')
    if (hasEmptyField)
      toast.error('please fill all fields')

    else {
      const res = await fetch(`${API_URL}/api/events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data: values })
      })
      const evt = await res.json()

      if (!res.ok) {
        if (res.status == 403 || res.status == 401) {
          toast.error('No Token Included')
          return
        }
        toast.error(evt ? evt.error.message : 'Something Went Wrong!')
      }
      else {
        router.push(`/events/${evt.data.attributes.slug}`)
      }
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer theme='colored' />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  )
}

export default AddEventPage

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: {
      token
    }
  }
}