import React from 'react'
import {Navbar,Container,Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate }from 'react-router-dom'
import Layout from '../Components/layout/Layout';
// import Footer from './Footer';
function Index() {
  const navigate=useNavigate();
  return (
<Layout>
  <div className="index-header" >
   {/* <!-- Start Hero Section --> */}
    <div className="hero " id='#home'>
      <Container>
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>Part-Time Job Opportunities</h1>
              <p className="mb-4">part-time employment for students, such as gaining valuable work experience, developing time management skills, and earning extra income.</p>
              <div className=''>
                <Button className="hero-btn-user mx-3" variant='success' onClick={e=>navigate('/signup')}>Applied</Button></div>
            </div>
          </div>
          <div className="col-lg-7">
          </div>
        </div>
      </Container>
    </div>
        {/* <!-- End Hero Section --> */}
  </div>
  
  </Layout>
  )
}

export default Index