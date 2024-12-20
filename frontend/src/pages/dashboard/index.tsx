import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';

import { Header } from '../../components/ui/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

import { ModalOrder } from '../../components/ui/ModalOrder'

import Modal from 'react-modal';
import { toast } from 'react-toastify';

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {

  const [orderList, setOrderList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleClosedModal() {
    setModalIsOpen(false)
  }

  async function handleOpenModalView(order_id: string) {
    const apiClient = setupAPIClient();

    const response = await apiClient.get(`/orders/detail`, {
      params: {
        order_id
      }
    })

    setModalItem(response.data)
    setModalIsOpen(true)
  }

  async function handleFinishedOrder(order_id: string) {
    const apiClient = setupAPIClient();

    await apiClient.put(`/orders/finish`, {
      order_id
    })

    const response = await apiClient.get('/orders');
    setOrderList(response.data)

    setModalIsOpen(false)
    toast.success('Pedido finalizado com sucesso!')
  }

  async function handleRefreshOrders() {
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/orders');
    setOrderList(response.data)

    toast.success('Pedidos atualizados!')
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>Nenhum pedido em aberto...</span>
            )}

            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}

          </article>
        </main>

        {modalIsOpen && (
          <ModalOrder
            isOpen={modalIsOpen}
            onRequestClose={handleClosedModal}
            order={modalItem}
            handleFinishedOrder={handleFinishedOrder}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data
    }
  }
})