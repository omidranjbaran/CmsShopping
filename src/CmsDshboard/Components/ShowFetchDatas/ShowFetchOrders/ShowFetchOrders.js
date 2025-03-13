import React from 'react'
import { Container,Alert} from "react-bootstrap";
import './ShowFetchOrders.css'
export default function ShowFetchOrders() {
  return (
    <Container style={{ height: "100vh " }}>
         <Alert variant='info' className='alertStyle'>
         سفارشات خالی می باشد
        </Alert>
    </Container>
  )
}
