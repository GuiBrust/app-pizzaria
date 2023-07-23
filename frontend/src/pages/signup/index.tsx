import { useState, FormEvent, useContext } from 'react'
import Head from 'next/head'
import styles from '../../../styles/Home.module.scss'
import Image from 'next/image'

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos.');
      return;
    }

    setLoading(true);

    await signUp({ name, email, password })

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cadastrar</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="SujeitoPizza" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Nome'
              type='text'
              value={name}
              onChange={event => setName(event.target.value)}
            />

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
              Cadastrar
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
