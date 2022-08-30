import styles from '@/styles/Form.module.css'
import { useState } from 'react'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'

const ImageUpload = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState(null)
  const [disable, setDisable] = useState(false)

  const handleSubmit = async e => {
    setDisable(true)
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'api::event.event')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      imageUploaded(evtId)
    }
    else if (res.status == 401 || res.status == 403) {
      toast.error('No Token Included')
      return
    }
    else {
      toast.error('Error to upLoad file')
    }
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <input type="submit" value="Upload" className='btn' disabled={disable} />
      </form>
    </div>
  )
}

export default ImageUpload