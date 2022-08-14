import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import AuthContext from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(AuthContext)

  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = async e => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='User Login'>
      <ToastContainer theme='colored' />
      <div className={styles.auth}>
        <h1>
          <Image src='/images/icon/user.png' height={32} width={32} />
          <span>Log In</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Login" className='btn' />
          <p>
            Don't Have an account?
            <Link href='/account/register'> Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage