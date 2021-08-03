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
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [product, setProduct] = useState([]);
  const [client, setClient] = useState({});
  const [productDetails, setProductDetails] = useState({
    product: {},
    quantity: '',
    notes: ''
  });
  const [order, setOrder] = useState({
    client_details: {
      client: {
      }
    },
    product_details: []
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

  const handleChange = e => {
    const {name, value} = e.target;
    setProductDetails({...productDetails, [name]: value})
  }
  
  const addProduct = e => {
    e.preventDefault()
    setProductDetails({...productDetails, product})
    order.product_details.push(productDetails)
    setOrder(order);
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
            order.client_details.client = selected[0];
            setOrder(order)
          }
        }}
        renderMenuItemChildren={(selected) => (
          <ClientSearchOptions data={selected} />
        )}
      />

      <List type="inline">
        <ListInlineItem>{client.name} {client.firstName} {client.lastName} {client.phone} {client.email}</ListInlineItem>
        <ListInlineItem>
          <Link href={`https://api.whatsapp.com/send?phone=${client.phone}`}>
            <a target="_blank" rel="noopener noreferrer">WhatsApp Me</a>
          </Link>
        </ListInlineItem>
      </List>

      <AsyncTypeahead
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
            // const found = product.find(product => product.id === selected[0].id)
            // if(!found?.id) {
              const temp = product;
              temp.push(selected[0])
              setProduct(temp)
              setCount(count + 1)
            // }    
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
        product.length ?
          product.map((productItem, index) => {
            return (
              <ListInlineItem className="test" key={index}>
                <FormInput
                  name="quantity"
                  type="number"
                  label="Quantity"
                  value={productDetails.quantity}
                  handleChange={handleChange}
                  required
                />
                <img src={ productItem.thumbnail }/> 
                <p>
                  <span className="title">UID</span>
                  {productItem.id}
                </p>
                <p>
                  <span className="title">Product</span>
                  {productItem.name}
                </p>
                <p>
                  <span className="title">Price</span>
                  ₡ {productItem.price}
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
          })
        : ''
      }
      </List>
    </div>
  )
}

export default Orders
