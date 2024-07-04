import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Card, Col } from 'react-bootstrap';
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { FcShop } from "react-icons/fc";
import { CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { BsDatabaseDown } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import '../admin/admin.css'
function AdminHome({ colors }) {
    const color = colors
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [datavalue, setValueData] = useState([]);
    const [admin, setId] = useState()
    const [submitSuccess, setsubmitSuccess] = useState(false);
    cookies.token = localStorage.getItem('atoken');
    sessionStorage.setItem('adminId',admin)
   
    useEffect(() => {
        const verifyCookies = async () => {
            if (!cookies.token) {
                navigate('/login');
            };
            const { data } = await axios.post('https://part-time-job-react-js.onrender.com/adminhome', {},
                { withCredentials: true });
            const { status } = data
            setId (data.user._id)
            setValueData([data.user])
            return status ? toast(`hello`, {
                position: 'top-right'
            }) : (removeCookie('token'),
                navigate('/login')
            )
        }
        verifyCookies()
    }, [cookies, navigate, removeCookie])
    const Logout = () => {
        removeCookie('token');
        navigate('/')
        localStorage.clear('atoken')
    }
    const accountDetails = () => {
        setsubmitSuccess(true)
    }
    const handleAdminUpdate = (id) => {
        navigate('/admin/user/update', sessionStorage.setItem('adminuupdateid', id))
    }

    return (
        <div >
            <Navbar expand="md" className="bg-body-tertiary navbar-header">
                <Container fluid>
                    <Navbar.Brand href="#home">PTJP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/adminhome">Home</Nav.Link>
                            <Nav.Link href="/vendorproduct">Shops</Nav.Link>
                            <Nav.Link href="/footer">About Us</Nav.Link>
                            <Nav.Link onClick={accountDetails}   >< IoMdContact /></Nav.Link>
                            <Button variant={'success'} onClick={Logout}>Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="admin-data">
                {submitSuccess && (
                    <div className="admin-profile-container">

                        <div className="admin-profile">
                            {
                                datavalue.map((user) => (
                                    <div className="user-profile">
                                        <div className="profile-name" style={{ background: color }}>
                                            <div className="first-letter">
                                                {user.name[0]}
                                            </div>
                                        </div>
                                        <ul className='profile-details'>
                                            <li>{user.name}</li>
                                            <li>{user.email}</li>
                                            <li>{user.phone}</li>
                                        </ul>
                                        <div className="btns d-flex justify-content-between p-2">
                                            <Button className="edit-btn button-update" variant="success" onClick={e => handleAdminUpdate(user._id)}><i><MdModeEdit className='edit-icon' /></i><i>Edit</i></Button>
                                            <Button className="edit-btn button-update" variant="success" onClick={e => handleAdminDelete(user._id)}><i><MdDelete className='edit-icon' /></i><i>Delete</i></Button>
                                        </div>
                                    </div>))
                            }
                            <Button variant='' className='button-close' onClick={() => setsubmitSuccess(false)} ><IoClose /></Button>
                        </div>
                    </div>)}
            </div>


            <section id='admin'>
                <div className='details-btns'>
                    <div className="btn-user btn-icon" onClick={()=>navigate('/userdetails')}>
                        <icon className='icon'><CiUser /></icon>
                        <Link to={`/userdetails`}>User</Link>
                    </div>
                    <div className="btn-vendor btn-icon" onClick={()=>navigate('/vendordetails')}>
                        <icon className='icon'><FcShop /></icon>
                        <Link to='/vendordetails'>Vendor</Link>
                    </div>
                    <div className="btn-user btn-icon" onClick={()=>navigate('/vendorproduct')}>
                        <icon className='icon'><MdProductionQuantityLimits /></icon>
                        <Link to='/vendorproduct'>Vendor Product</Link>
                    </div>
                    <div className="btn-user btn-icon" onClick={()=>navigate('/userlogindata')}>
                        <span className='icon'><BsDatabaseDown /></span>
                        <Link to='/userlogindata'>User Login Data</Link>
                    </div>
                    <div className="btn-user btn-icon" onClick={()=>navigate('/vendorlogindata')}>
                        <span className='icon'><BsDatabaseDown /></span>
                        <Link to='/vendorlogindata'>Vendor Login Data</Link>
                    </div>

                </div>
                <div className="details-btns">
                    

                </div>
            </section>
        </div>
    )
}


export default AdminHome