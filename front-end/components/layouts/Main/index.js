import { motion } from 'framer-motion'

// Components
import Header from '../../shared/Header'
import Footer from '../../shared/Footer'
import ISI from '../../shared/ISI'

const Main = ({ children, ...props }) => {
  return (
    <motion.div
      {...props}
      exit={{ opacity: 0 }}
      initial='initial'
      animate='animate'
    >
      <Header />
      {children}
      <ISI />
      <Footer />
    </motion.div>
  )
}

export default Main
