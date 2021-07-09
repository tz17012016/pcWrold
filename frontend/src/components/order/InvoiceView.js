import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const thStyle = {
  fontFamily: 'Anton',
  fontWeight: 'normal',
  fontStyle: 'normal',
};

const ComponentToPrint = () => {
  return (
    <table>
      <thead style={thStyle}>
        <th>column 1</th>
        <th>column 2</th>
        <th>column 3</th>
      </thead>
      <tbody>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
        <tr>
          <td>data 1</td>
          <td>data 2</td>
          <td>data 3</td>
        </tr>
      </tbody>
    </table>
  );
};

const InvoiceView = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default InvoiceView;
