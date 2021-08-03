import React from 'react';

// Libraries
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

// import styles from '../client-search-options/client-search-options.module.scss'

const ClientSearchOptions = ({data}) => {
  return (
    <div>
      <Toast>
        <ToastHeader>
          {data.name} {data.firstName} {data.lastName}
        </ToastHeader>
        <ToastBody>
          <b>Phone:</b> {data.phone} <br/> <b>Email:</b> {data.email}
        </ToastBody>
      </Toast>
    </div>
  )
}

export default ClientSearchOptions



