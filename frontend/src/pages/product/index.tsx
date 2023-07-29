/* eslint-disable @next/next/no-img-element */
import { useState, FormEvent, ChangeEvent } from 'react'
import Head from 'next/head'
import { Header } from "../../components/ui/Header"
import styles from './styles.module.scss'
import Image from 'next/image'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { FcAddImage } from 'react-icons/fc'

export default function Product() {
  const [imageUrl, setImageUrl] = useState('');
  const [imageProd, setImage] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files)
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0]

    if (!file) {
      return;
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
    } else {
      toast.error('Formato de imagem inválido!')
    }
  }

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category_id, setCategory] = useState('')
  const [description, setDescription] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (!name || !price || !category_id || !description) {
      toast.error('Preencha todos os campos!')
      return
    }

    try {
      const api = setupAPIClient()
      await api.post('/products', {
        name,
        price,
        category_id,
        description
      })

      toast.success('Produto cadastrado com sucesso!')
      setName('')
      setPrice('')
      setCategory('')
      setDescription('')
    } catch (error) {
      toast.error('Erro ao cadastrar produto!')
    }
  }

  return (
    <>
      <Head>
        <title>Produtos - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Produtos</h1>

          <form className={styles.form} onSubmit={handleRegister}>

            <label className={styles.labelImage}>
              <span>
                <FcAddImage size={30} />
              </span>

              <input type='file' accept='image/png, image/jpeg' onChange={handleFile} />

              {imageUrl && (
                <img
                  className={styles.previewImage}
                  src={imageUrl}
                  alt="Imagem do produto"
                  width={250}
                  height={250}
                />
              )}

            </label>

            <select>
              <option value="1">Pizza</option>
              <option value="2">Bebida</option>
              <option value="3">Sobremesa</option>
            </select>

            <input
              type="text"
              placeholder='Produto'
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder='Preço'
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder='Descrição'
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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