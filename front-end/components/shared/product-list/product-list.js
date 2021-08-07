// NextJS
import Image from 'next/image'

// Utils
import { applyCurrencyFormat } from '../../../utils/utils';

// Custom Components
import FormInput from '../../../../front-end/components/shared/form-input/form-input';

// Libraries
import { List, ListInlineItem } from 'reactstrap';

const ProductList = ({ productDetails, eventsHandle, handleChange }) => {

  const { addProduct, updateProduct, removeProduct } = eventsHandle;
  const isProductPreview = typeof addProduct !== 'undefined'

  return (
    <List type="inline">
      {
        productDetails.length ? 
          productDetails.map((productDetails, index) => {
            return (
              <ListInlineItem className="test" key={index}>
                <FormInput
                  name="quantity"
                  type="number"
                  label="Quantity"
                  value={productDetails.quantity}
                  handleChange={() => handleChange(event, index, isProductPreview)}
                  required
                  disabled={ productDetails.isDisabled && !isProductPreview }
                />
                <img src={ productDetails.product.thumbnail }/> 
                <p>
                  <span className="title">UID</span>
                  { productDetails.product.id }
                </p>
                <p>
                  <span className="title">Product</span>
                  { productDetails.product.name }
                </p>
                <p>
                  <span className="title">Price</span>
                  ₡ { productDetails.product.price }
                </p>
                <p>
                  <span className="title">Total</span>
                  ₡ { applyCurrencyFormat(productDetails.product.price * productDetails.quantity) }
                </p>
                <FormInput
                  name="notes"
                  type="text"
                  label="Notes"
                  value={productDetails.notes}
                  handleChange={() => handleChange(event, index, isProductPreview)}
                  required
                  disabled={ productDetails.isDisabled && !isProductPreview }
                />
                {
                  productDetails.quantity && isProductPreview ? 
                    <a onClick={ addProduct }>
                      <Image
                        src="/icons/add.svg"
                        // className={styles.shopping_icon}
                        width={24}
                        height={24}
                      />
                    </a>
                  : ''
                }
                {
                  typeof updateProduct !== 'undefined' ?
                    productDetails.isDisabled ? 
                      <a className='actions' onClick={() => { updateProduct(index)} }>
                        <Image
                          src="/icons/edit.svg"
                          // className={styles.shopping_icon}
                          width={24}
                          height={24}
                        />
                      </a>
                    : 
                      <a className='actions' onClick={() => { updateProduct(index)} }>
                        <Image
                          src="/icons/save.svg"
                          // className={styles.shopping_icon}
                          width={24}
                          height={24}
                        />
                      </a>
                  : ''
                }
                {
                  typeof removeProduct !== 'undefined' ? 
                    <a className='actions' onClick={() => { removeProduct(index)} }>
                      <Image
                        src="/icons/remove.svg"
                        // className={styles.shopping_icon}
                        width={24}
                        height={24}
                      />
                    </a>
                  : ''
                }
              </ListInlineItem>
            )
          })
        : ''
      }
    </List>
  )
}

export default ProductList



