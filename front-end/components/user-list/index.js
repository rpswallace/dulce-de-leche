import Link from 'next/link'
import { motion } from 'framer-motion'

// Utils
import { fadeInUp, stagger } from '../../utils/animations'

// Styles
import styles from './index.module.scss'

const UserList = ({ users }) => {
  return (
    <div className={styles['user-list-wrapper']}>
      <motion.h2 variants={fadeInUp}>Users List</motion.h2>
      {users && users.length > 0 && (
        <motion.ul variants={stagger}>
          {users.map((user) => {
            return (
              <motion.li
                key={user.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/user/${user.id}`}>
                  <a>
                    <h2>{user.name}</h2>
                  </a>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      )}
    </div>
  )
}

export default UserList
