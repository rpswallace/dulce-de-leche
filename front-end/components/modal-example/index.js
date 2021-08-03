import { motion } from 'framer-motion'
import Modal from '../shared/ModalBase'

// Utils
import { fadeInUp, stagger } from '../../utils/animations'

// Styles
import styles from './index.module.scss'

const ModalExample = () => {
  return (
    <div className={styles.wrapper} variants={stagger}>
      <motion.h1 variants={fadeInUp} className='my-5'>
        Modal Examples
      </motion.h1>
      <Modal type='simple' buttonLabel='Simple Modal' title='Simple Modal'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a
          porta ex, bibendum elementum libero. Nunc ut dolor et lacus bibendum
          semper. In aliquet ex eros, et pretium lorem vehicula et. Nulla sed
          ligula egestas, iaculis metus et, cursus turpis. Nam dictum elit eu
          enim malesuada molestie. Donec id lacus scelerisque, rutrum orci eget,
          sagittis urna. Phasellus et erat rutrum, finibus est sit amet, finibus
          ipsum. Suspendisse fringilla velit quam, nec commodo est gravida non.
        </p>
      </Modal>
      <Modal
        type='exit'
        exitTo='https://www.google.com/'
        buttonLabel='Exit Link'
      />
    </div>
  )
}

export default ModalExample
