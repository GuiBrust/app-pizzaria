import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Image from 'next/image'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link'
import { sign } from 'crypto'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === '') {
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="SujeitoPizza" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='E-mail'
              type='text'
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <Input
              placeholder='Senha'
              type='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <Button
              type='submit'
              Loading={loading}
            >
              Entrar
            </Button>
            <Link href="/signup">
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
