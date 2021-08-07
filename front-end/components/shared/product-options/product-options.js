// Styles
import styles from './product-options.module.scss'

const ProductOptions = ({ data }) => {
  return (
    <div className={ styles.product_option }>
      <img
        src={ data.thumbnail }
        className={ styles.search_thumbnail }
      />
      <span>{ data.name }</span>
    </div>
  )
}

export default ProductOptions



