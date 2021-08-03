import Link from 'next/link'
import { motion } from 'framer-motion'

// Utils
import { fadeInUp, stagger } from '../../utils/animations'

// Styles
import styles from './index.module.scss'

const UserInfo = ({ user }) => {
  return (
    <motion.section className={styles['user-info-wrapper']} variants={stagger}>
      <motion.h1 variants={fadeInUp}>{user.name}</motion.h1>
      <motion.img
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        src={`https://picsum.photos/id/${user.id * 10}/400/400`}
        alt=''
      />
      <motion.p variants={fadeInUp}>
        <strong>Username: </strong>
        {user.username}
      </motion.p>
      <motion.p variants={fadeInUp}>
        <strong>Email: </strong>
        {user.email}
      </motion.p>
      <motion.p variants={fadeInUp}>
        <strong>Phone: </strong>
        {user.phone}
      </motion.p>
      <motion.p variants={fadeInUp}>
        <strong>Website: </strong>
        {user.website}
      </motion.p>
      <Link href='/'>
        <motion.a variants={fadeInUp} className={styles.btn}>
          Back to List
        </motion.a>
      </Link>
    </motion.section>
  )
}

export default UserInfo
