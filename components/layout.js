import Head from 'next/head'
import styles from '../styles/Layout.module.css'

const layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div class={styles.container}>{children}</div>
    </div>
  )
}

export default layout

layout.defaultProps = {
  title: 'DJ Events',
  description: 'find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events'
}