import React from 'react';
import { Table } from 'reactstrap';

const DataTable = ({ orders }) => {
  console.log(orders);
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
          <th>Table heading</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map((orderItem, index) => {
            return (
              <tr key={ index }>
                <th scope="row">{ index }</th>
                <td>{ orderItem.clientName }</td>
                <td>{ orderItem.notes }</td>
                <td>{ orderItem.clientFirstName }</td>
                <td>{ orderItem.clientLastName }</td>
                <td>{ orderItem.name }</td>
                <td>{ orderItem.name }</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

export default DataTable;