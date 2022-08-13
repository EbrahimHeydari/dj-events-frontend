import 'react-toastify/dist/ReactToastify.css'
import Layout from "@/components/Layout"
import styles from '@/styles/Form.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import { API_URL } from '@/config/index'
import Image from "next/image"
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

const EditEventPage = ({ evt, evt: { attributes } }) => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: attributes.name,
    venue: attributes.venue,
    address: attributes.address,
    performers: attributes.performers,
    description: attributes.description,
    date: attributes.date,
    time: attributes.time
  })

  const [imagePreview, setImagePreview] = useState(
    attributes.image.data ? attributes.image.data.attributes.formats.thumbnail.url : null
  )

  const [showModal, setShowModal] = useState(false)

  const imageUploaded = async id => {
    const res = await fetch(`${API_URL}/api/events?populate=%2A`)
    const events = await res.json()
    const evt = events.data.find(event => event.id === Number(id))

    setImagePreview(evt.attributes.image.data.attributes.formats.thumbnail.url)
    setShowModal(false)
    toast.success('Successfully Changed')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validation
    const hasEmptyField = Object.values(values).some(element => element.trim() === '')
    if (hasEmptyField)
      toast.error('please fill all fields')

    else {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: values })
      })

      if (!res.ok) {
        toast.error('Something Went Wrong!')
      }
      else {
        const evt = await res.json()
        router.push(`/events/${evt.data.attributes.slug}`)
      }
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Edit Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
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
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image Preview</h2>
      {imagePreview ? <Image src={imagePreview} height={100} width={170} />
        : <div>
          <p>No Image Uploaded...</p>
        </div>}

      <button className="btn-secondary" onClick={() => setShowModal(true)}>
        <Image src='/images/icon/image.png' width={16} height={16} />
        <span>Set Image</span>
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  )
}

export default EditEventPage


export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events?populate=%2A`)
  const events = await res.json()
  const evt = events.data.find(event => event.id === Number(id))

  return {
    props: {
      evt
    }
  }
}