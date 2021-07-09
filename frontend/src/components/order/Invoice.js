import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => {
  const { orderItems, shippingAddress } = order;
  console.log(order);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>React Redux Ecommerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Shipping</TableCell>
          </TableHeader>
        </Table>

        <Table data={orderItems}>
          <TableBody>
            <DataTableCell getContent={(orderItem) => orderItem.image} />
            <DataTableCell getContent={(orderItem) => orderItem.name} />
            <DataTableCell getContent={(orderItem) => `₪${orderItem.price}`} />
            <DataTableCell getContent={(orderItem) => orderItem.qty} />
            <DataTableCell getContent={(orderItem) => orderItem.shipping} />
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>PostalCode</TableCell>
            <TableCell>Country</TableCell>
          </TableHeader>
        </Table>

        <Table>
          <TableBody>
            <TableCell>{shippingAddress.address}</TableCell>
            <TableCell>{shippingAddress.city}</TableCell>
            <TableCell>{shippingAddress.postalCode}</TableCell>
            <TableCell>{shippingAddress.country}</TableCell>
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>
            Date: {'               '}
            {new Date(order.createdAt * 1000).toLocaleString()}
          </Text>
          {'\n'}
          <Text>
            Order Id: {'         '}
            {order._id}
          </Text>
          {'\n'}
          <Text>
            User Id: {'         '}
            {order.user}
          </Text>
          <Text>
            paid At: {'         '}
            {new Date(order.paidAt * 1000).toLocaleString()}
          </Text>
          {'\n'}
          <Text>
            Order Status: {'  '}
            {order.isDelivered}
          </Text>
          {'\n'}
          <Text>
            Total Tax Price: {'       '}
            {order.taxPrice}
          </Text>
          {'\n'}
          <Text>
            Total payment Method: {'       '}
            {order.paymentMethod}
          </Text>
          {'\n'}
          <Text>
            Total shipping Price: {'       '}
            {order.shippingPrice}
          </Text>
          {'\n'}
          <Text>
            Total totalPrice: {'       '}
            {order.totalPrice}
          </Text>
          {'\n'}
          <Text>
            Total is Paid: {'       '}
            {order.isPaid}
          </Text>
          {'\n'}
        </Text>

        <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default Invoice;
