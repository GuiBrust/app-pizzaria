import Head from 'next/head'
import styles from '../../../styles/Home.module.scss'
import Image from 'next/image'

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Cadastrar</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="SujeitoPizza" />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form>
          <Input
              placeholder='Nome'
              type='text'
            />

            <Input
              placeholder='E-mail'
              type='text'
            />

            <Input
              placeholder='Senha'
              type='password'
            />

            <Button
              type='submit'
              Loading={false}
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
