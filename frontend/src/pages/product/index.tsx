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

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoriesList: ItemProps[]
}

export default function Product({ categoriesList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const [imageUrl, setImageUrl] = useState('');
  const [imageProd, setImage] = useState(null);

  const [categories, setCategories] = useState(categoriesList || [])
  const [categoriesSelected, setCategoriesSelected] = useState(0)

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

  function handleChangeCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategoriesSelected(Number(e.target.value))
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (!name || !price || !description || !imageProd ) {
      toast.error('Preencha todos os campos!')
      return;
    }

    try {
      const data = new FormData()

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('file', imageProd);
      data.append('category_id', categories[categoriesSelected].id);

      const apiClient = setupAPIClient();

      await apiClient.post('/products', data);

      toast.success('Produto cadastrado com sucesso!')
      setName('')
      setPrice('')
      setDescription('')
      setCategoriesSelected(null)
      setImageUrl('')
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

            <select value={categoriesSelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              type="text"
              placeholder='Nome do Produto'
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
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/categories')

  return {
    props: {
      categoriesList: response.data
    }
  }
})