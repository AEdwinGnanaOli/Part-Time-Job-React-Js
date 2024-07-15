import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import '../App.css'
import Layout from '../Components/layout/Layout';
function VendorProductFullDedails() {
  const { id, token } = useParams()
  const navigate = useNavigate();
  const [vendorProducts, setVendorProducts] = useState([])
  const userId = sessionStorage.getItem('userid')
   useEffect(() => {
    axios.get(`http://localhost:3000/productfulldetails/${id}/${token}`).then(product => {
      console.log(product)
      setVendorProducts([product.data.vendorProductDetails])
    })
  }, [])

  const handleCard = (vendorId) => {
    axios.post(`http://localhost:3000/usercart/${userId}/${vendorId}/${id}`).then((card) => {
    navigate('/userhome')
    }).catch(err => {
      console.log(err)
    })
    axios.post(`http://localhost:3000/userdetails/${userId}/${vendorId}/${id}`).then((result) => {
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <Layout title={'Home'}>
      {
        vendorProducts.map((vendor) => (
          <Col className=''>
            {/* Product Details Card Start */}
            <Card style={{}} className='card-header'>
              <div className="fulldetails">
                <div className="shop-img">
                  <Card.Img variant="top" src={`http://localhost:3000/images/${vendor.image}`}/>
                </div>
                <div className="card-body">
                  <Card.Body >
                    <Card.Title className='card-title'>{vendor.shopname}</Card.Title>
                    <div className="vendor-fulldetails">
                      <label><span>Email </span> <span>:</span></label>
                      <Card.Text>{vendor.email}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails address">
                    <label><span>Address</span> <span>:</span> </label>
                      <Card.Text>{vendor.shopaddress}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails">
                    <label><span>Contect Us</span> <span>:</span> </label>
                      <Card.Text>{vendor.shopmobilenumber}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails ">
                    <label><span>Work</span> <span>:</span> </label>
                      <Card.Text>{vendor.work}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails">
                    <label><span>Price</span> <span>:</span> </label>
                      <Card.Text>{vendor.price}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails ">
                    <label><span>Start Time</span> <span>:</span> </label>
                      <Card.Text>{vendor.starttime}</Card.Text>
                    </div>
                    <div className="vendor-fulldetails">
                    <label><span>End Time</span> <span>:</span> </label>
                      <Card.Text>{vendor.endtime}</Card.Text>
                    </div>
                    <Button variant="success" onClick={()=>handleCard(vendor.ProductId)} >apply</Button>
                  </Card.Body>
                </div>
              </div>
            </Card>
            {/* Product Details Card End */}
          </Col>
        ))
      }
    </Layout>
  )
}

export default VendorProductFullDedails