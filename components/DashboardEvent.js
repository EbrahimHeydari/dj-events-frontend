import styles from '@/styles/DashboardEvent.module.css'
import Image from "next/image"
import Link from "next/link"

const DashboardEvent = ({ evt, evt: { attributes }, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${attributes.slug}`}>
          <a>{attributes.name}</a>
        </Link>
      </h4>

      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <Image src='/images/icon/edit.png'
            width={18}
            height={18}
            alt='edit' />
          <span>Edit Event</span>
        </a>
      </Link>

      <a href='#' className={styles.delete} onClick={() => handleDelete(evt.id)}>
        <Image src='/images/icon/remove.png'
          width={18}
          height={18}
          alt='delete' />
        <span>Delete Event</span>
      </a>
    </div>
  )
}

export default DashboardEvent