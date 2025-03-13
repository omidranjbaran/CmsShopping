import React from 'react'
import './ShowFetchDiscount.css'
import { Container,Alert} from "react-bootstrap";

export default function ShowFetchDiscount() {
  return (
    <Container style={{ height: "100vh " }}>
    <Alert variant='info' className='alertStyle'>
    هیچ تخفیفی وجود ندارد.
   </Alert>
</Container>
  )
}
