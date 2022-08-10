import Link from "next/link"
import Layout from "@/components/layout"
import styles from '@/styles/404.module.css'
import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <Layout title='Page Not Found!'>
      <div className={styles.error}>
        <h1>
          <Image src='/images/icon/exclamation.svg'
            width={40}
            height={40}
            alt='exclumation' /> 404
        </h1>
        <h4>Sorry, There is nothing here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage