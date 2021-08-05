import { useState, useEffect, Fragment } from 'react'

// NextJS
import Link from 'next/link'

// Custom Components
import ClientSearchOptions from '../../components/shared/client-search-options/client-search-options';
import FormInput from '../../components/shared/form-input/form-input';


// Libraries
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { List, ListInlineItem } from 'reactstrap';

// Styles
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Utils
import API from '../../utils/api'


const Orders = () => {
  const [isProductSearchDisabled, setIsProductSearchDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [client, setClient] = useState({});
  const [productDetails, setProductDetails] = useState({
    product: {},
    quantity: '',
    notes: '',
    total:  0
  });
  const [order, setOrder] = useState({
    client_details: {},
    product_details: [],
    total: 0
  });

  const handleClientSearch = (query) => {
    setIsLoading(true);
    const getClients = async () => {
      const { data }  = await API.getRequest('/clientes', { params: { name_contains: query } })
      const options = data.map((client) => ({
        id: client.id,
        name: client.name,
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        email: client.email
      }));
      setClientOptions(options);
      setIsLoading(false);
    }
    getClients()
  };
  
  const handleProductSearch = (query) => {
    setIsLoading(true);
    const getProducts = async () => {
      const { data }  = await API.getRequest('/products', { params: { name_contains: query } })
      const options = data.map((product) => ({
        thumbnail: process.env.NEXT_PUBLIC_BASE_URL + product.photo[0].formats.thumbnail.url,
        id: product.id,
        name: product.name,
        price: product.price
      }));
      setProductOptions(options);
      setIsLoading(false);
    }
    getProducts()
  };
  
  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const handleChange = (e, index) => {
    const {name, value} = e.target;
    if(typeof index !== 'undefined') {
      order.product_details[index].quantity = value;
      setOrder({...order})
      getTotalOrder();
    } else {
      setProductDetails({...productDetails, [name]: value})
    }
  }
  
  const addProduct = e => {
    e.preventDefault()
    const temp = order.product_details;
    temp.push(productDetails);
    setOrder({...order, product_details: temp});
    setProductDetails({
      product: {},
      quantity: '',
      notes: '',
      total: 0
    })
    getTotalOrder();
  }
  
  const removeProduct = index => {
    order.product_details.splice(index, 1);
    setOrder({...order, product_details: order.product_details})
    getTotalOrder();
  }

  const editProduct = index => {
    // const productSelected = order.product_details[index];
    // console.log(productSelected);
    // setIsProductSearchDisabled(false)
  }

  const getTotalOrder = () => {
    if(order.product_details.length) {
      const orderProductDetails = order.product_details;
      const subtotal = orderProductDetails.map(item => parseInt(item.product.price) * parseInt(item.quantity))
      const total = subtotal.reduce((accumulator, currentValue) => accumulator + currentValue)
      setOrder({...order, total});
    } else {
      setOrder({...order, total: 0});
    }
  }

  return (
    <div>
      <AsyncTypeahead
        filterBy={filterBy}
        id="search-client"
        isLoading={isLoading}
        labelKey="name"
        minLength={3}
        onSearch={handleClientSearch}
        options={clientOptions}
        placeholder="Search client..."
        onChange={(selected) => {
          if(selected.length) {
            setClient(selected[0]);
            setOrder({...order, client: selected[0]})
          }
        }}
        renderMenuItemChildren={(selected) => (
          <ClientSearchOptions data={selected} />
        )}
      />
      {
        client?.name ?
        (
          <List type="inline">
            <ListInlineItem className="test">
              <p>
                <span className="title">Client:</span>
                {client.name} {client.firstName} {client.lastName}
              </p>
              <p>
                <span className="title">Phone:</span>
                {client.phone}
              </p>
              <p>
                <span className="title">Phone:</span>
                {client.email}
              </p>
              <p>
                <span className="title">WhatsApp Me:</span>
                <Link href={`https://api.whatsapp.com/send?phone=${client.phone}`}>
                  <a target="_blank" rel="noopener noreferrer">WhatsApp Me</a>
                </Link>
              </p>
            </ListInlineItem>
          </List>
        )
        : <p>Please select a client...</p>
      }
      <AsyncTypeahead
        disabled={isProductSearchDisabled}
        filterBy={filterBy}
        id="search-product"
        isLoading={isLoading}
        labelKey="name"
        minLength={3}
        onSearch={handleProductSearch}
        options={productOptions}
        placeholder="Search products..."
        onChange={(selected) => { 
          if(selected.length) {
            setProductDetails({...productDetails, product: selected[0]})
          }
        }}
        renderMenuItemChildren={(selected) => (
          <Fragment>
            <img
              src={selected.thumbnail}
              style={{
                height: '70px',
                marginRight: '10px',
                width: '70px',
              }}
            />
            <span>{selected.name}</span>
          </Fragment>
        )}
      />
      <List type="inline">
        {
          Object.keys(productDetails.product).length ?
            (
            <ListInlineItem className="test">
              <FormInput
                name="quantity"
                type="number"
                label="Quantity"
                value={productDetails.quantity}
                handleChange={handleChange}
                required
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
              <FormInput
                name="notes"
                type="text"
                label="Notes"
                value={productDetails.notes}
                handleChange={handleChange}
                required
              />
              <a
              onClick={addProduct}
              >Add product</a>
            </ListInlineItem> 
            )
          : ''
        }
      </List>
      <hr/>
      {
        order.product_details.length ? <h2 className="text-center mb-5">Product List</h2> : ''
      }
      <List type="inline">
        {
          order.product_details.length ?
            order.product_details.map((productDetails, index) => {
              return (
                <ListInlineItem className="test" key={index}>
                  <FormInput
                    name="quantity"
                    type="number"
                    label="Quantity"
                    value={productDetails.quantity}
                    handleChange={() => handleChange(event, index)}
                    required
                    // disabled={true}
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
                    ₡ { productDetails.product.price * productDetails.quantity }
                  </p>
                  <FormInput
                    name="notes"
                    type="text"
                    label="Notes"
                    value={productDetails.notes}
                    handleChange={handleChange}
                    required
                    disabled={true}
                  />
                  <a
                  onClick={() => {editProduct(index)}}
                  >Edit product</a> -  
                  <a
                  onClick={() => {removeProduct(index)}}
                  >Remove product</a>
                </ListInlineItem> 
              )
            })
          : ''
        }
      </List>
      {
        !order.product_details.length ? <p className="text-center">There are not products.</p> : ''
      }
      <hr/>
      <p className="total-order">Total order: <span>₡ {order.total}</span></p>
    </div>
  )
}

export default Orders
