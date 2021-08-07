import { useState } from 'react'

// Utils
import API from '../../utils/api'
import { applyCurrencyFormat } from '../../utils/utils';
import { productDetailInit, orderDetailInit } from '../../utils/const';

// Custom Components
import ClientSearchOptions from '../../components/shared/client-search-options/client-search-options';
import ClientPreview from '../../components/shared/client-preview/client-preview';
import ProductList from '../../components/shared/product-list/product-list';
import ProductOptions from '../../components/shared/product-options/product-options';

// Libraries
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

// Styles
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Orders = () => {
  // States Section
  const [isLoading, setIsLoading] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [productDetails, setProductDetails] = useState(productDetailInit);
  const [order, setOrder] = useState(orderDetailInit);

  // Search a client using the Strapi API to create the options for the client autocomplete. 
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
  
  // Search a product using the Strapi API to create the options for the product autocomplete. 
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

  // Manage changes for inputs
  const handleChange = (e, index, isProductPreview) => {
    const { name, value } = e.target;
    if(!isProductPreview) {
      order.product_details[index][name] = value;
      setOrder({ ...order });
      getTotalOrder();
    } else {
      productDetails[index][name] = value;
      setProductDetails([...productDetails]);
    }
  }
  
  // Add product to an Order
  const addProduct = e => {
    e.preventDefault();
    const temp = order.product_details;
    temp.push(productDetails[0]);
    setOrder({ ...order, product_details: temp });
    setProductDetails(productDetailInit)
    getTotalOrder();
  }
  
  // Remove product to an Order
  const removeProduct = index => {
    order.product_details.splice(index, 1);
    setOrder({ ...order, product_details: order.product_details });
    getTotalOrder();
  }
  
  // Update product from an Order
  const updateProduct = index => {
    const productSelected = order.product_details[index];
    productSelected.isDisabled = !productSelected.isDisabled;
    order.product_details[index] = productSelected;
    setOrder({ ...order });
  }

  // Get total price of the order
  const getTotalOrder = () => {
    if(order.product_details.length) {
      const orderProductDetails = order.product_details;
      const subtotal = orderProductDetails.map(item => parseInt(item.product.price) * parseInt(item.quantity));
      const total = subtotal.reduce((accumulator, currentValue) => accumulator + currentValue);
      setOrder({ ...order, total });
    } else {
      setOrder({ ...order, total: 0 });
    }
  }

  return (
    <div>
      <AsyncTypeahead
        filterBy={ filterBy }
        id="search-client"
        isLoading={ isLoading }
        labelKey="name"
        minLength={3}
        onSearch={ handleClientSearch }
        options={ clientOptions }
        placeholder="Search client..."
        onChange={(selected) => {
          if(selected.length) {
            setOrder({ ...order, client: selected[0] })
          }
        }}
        renderMenuItemChildren={(selected) => (
          <ClientSearchOptions data={ selected } />
        )}
      />
      {
        order.client?.name ?
          <ClientPreview client={ order.client }/>
        : <p>Please select a client...</p>
      }
      <AsyncTypeahead
        filterBy={ filterBy }
        id="search-product"
        isLoading={ isLoading }
        labelKey="name"
        minLength={3}
        onSearch={ handleProductSearch }
        options={ productOptions }
        placeholder="Search products..."
        onChange={(selected) => { 
          if(selected.length) {
            setProductDetails([{ ...productDetails, product: selected[0] }])
          }
        }}
        renderMenuItemChildren={(selected) => (
          <ProductOptions data={ selected }/>
        )}
      />
      {
        productDetails.length ?
          <ProductList
            productDetails={ productDetails }
            eventsHandle={{ addProduct }}
            handleChange={ handleChange }
          />
        : ''
      }
      <hr/>
      {
        order.product_details.length ? <h2 className="text-center mb-5">Product List</h2> : ''
      }
      {
        order.product_details.length ?
          <ProductList
            productDetails={ order.product_details }
            eventsHandle={{ updateProduct, removeProduct }}
            handleChange={ handleChange }
          />
        : ''
      }
      {
        !order.product_details.length ? <p className="text-center">There are not products.</p> : ''
      }
      <hr/>
      <p className="total-order">Total order: <span>₡ { applyCurrencyFormat(order.total) }</span></p>
    </div>
  )
}

export default Orders
