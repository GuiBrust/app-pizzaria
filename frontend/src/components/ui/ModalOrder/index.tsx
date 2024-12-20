import Modal from 'react-modal';
import styles from './styles.module.scss';

import { IoMdCloseCircle } from 'react-icons/io'

import { OrderItemProps } from '../../../pages/dashboard'

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishedOrder: (order_id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishedOrder }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >

      <button
        type="button"
        onClick={onRequestClose}
        className='react-modal-close'
        style={{ background: 'transparent', border: 0 }}
      >
        <IoMdCloseCircle size={24} color='f34748' />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do Pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map(item => (
          <section key={item.id} className={styles.containerItem}>
            <span>{item.amount} - <strong>{item.product.name}</strong></span>
            <span className={styles.description}>{item.product.description}</span>
          </section>
        ))}

        <button className={styles.buttonOrder} onClick={() => handleFinishedOrder(order[0].order_id)}>
          <span>Finalizar Pedido</span>
        </button>


      </div>

    </Modal>
  )
}