import { useState, FormEvent } from 'react'
import Head from 'next/head'
import { Header } from "../../components/ui/Header"
import styles from './styles.module.scss'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category() {
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    if (!name) {
      toast.error('Preencha a descrição da Categoria!')
      return
    }

    try {
      const api = setupAPIClient()
      await api.post('/categories', {
        name
      })

      toast.success('Categoria cadastrada com sucesso!')
      setName('')
    } catch (error) {
      toast.error('Erro ao cadastrar categoria!')
    }
  }

  return (
    <>
      <Head>
        <title>Categorias - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Categorias</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type="text"
              placeholder='Descrição Categoria'
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>

          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => { 
  return {
    props: {}
  }
})