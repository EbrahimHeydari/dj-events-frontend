import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout'
import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { register, error } = useContext(AuthContext)

  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      toast.error('Password do not match!')
      return
    }

    register({ email, password, username })
  }

  return (
    <Layout title='User Registeration'>
      <ToastContainer theme='colored' />
      <div className={styles.auth}>
        <h1>
          <Image src='/images/icon/user.png' height={32} width={32} />
          <span>Register</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" id='passwordConfirm' value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
          </div>
          <input type="submit" value="Register" className='btn' />
          <p>
            Already Have an account?
            <Link href='/account/login'> Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default RegisterPage