// Styles
import styles from './index.module.scss'

const Footer = () => {
  return (
    <footer className={styles['footer-wrapper']}>
      <div className='centered-container'>
        <div className={styles['inner-wrapper']}>
          <h4>Footer</h4>
        </div>
      </div>
    </footer>
  )
}

export default Footer
