import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dashboard from "./Dashboard";


function AdminProductUpdate() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const id= sessionStorage.getItem('adminpid')
    const [userData, setUserData] = useState({  shopname: "", email: '', shopmobilenumber: '', shopaddress: "", starttime: "",endtime:"", price: "", work: "", file: "", role: 'VendorProduct' })
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/getproductdetails/' + id).then(user => {
            setUserData({
                shopname: user.data.pdls.shopname,
                email: user.data.pdls.email,
                shopmobilenumber: user.data.pdls.shopmobilenumber,
                shopaddress: user.data.pdls.shopaddress,
                starttime: user.data.pdls.starttime,
                endtime: user.data.pdls.endtime,
                price: user.data.pdls.price,
                work: user.data.pdls.work,
                
            })
        }).catch(err => {
           console.log(err)
       })
    }, [])
    
    const onSubmit = async (e) => {
        try {
            setsubmitSuccess(true)
            await new Promise((resolve) => { setTimeout(resolve, 2000) })
            const formData = new FormData();
            formData.append("shopname", userData.shopname)
            formData.append('email', userData.email)
            formData.append('shopmobilenumber', userData.shopmobilenumber)
            formData.append('shopaddress', userData.shopaddress)
            formData.append('starttime', userData.starttime)
            formData.append('endtime', userData.endtime)
            formData.append('price', userData.price)
            formData.append('work',userData.work)
            formData.append('role', userData.role)
            formData.append('file', userData.file);
            axios.put('http://localhost:3000/productupdate/'+id, formData).then((user) => {
                if (user.data.message === "Product update Successfully") {
                    navigate("/adminhome")
                } else {
                    
                }
            }).catch((err) => { console.log(err) })
            
        } catch (error) {
            setError("root", { message: "User already exists" })
        }
    }

    return (
        <Dashboard>
        <Container>
        <Row className="login-row " >
            <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                <h1 className="text-center">Product Update</h1>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Shop Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter The Shopname"  name="shopname" className={errors.shopname && "regi-inp-err"}
                            {...register("name", {
                                required: "Name is Required",
                                validate: (value) => {
                                    if (value[0].trim() === value[0].toUpperCase()) {
                                        return true
                                    }
                                    return 'First letter is capital '
                                }
                            })}
                            value={userData.shopname} onChange={e => setUserData({ ...userData, shopname: e.target.value })} />
                        {errors.name && <div className="text-danger">{errors.name.message}</div>}

                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" name="email" className={errors.email && "regi-inp-err"}
                            {...register("email", {
                                required: "Email is required",
                                validate: (value) => {
                                    if (!value.includes("@")) { return "must includes in @" }
                                    return true
                                }
                            })}
                            value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}

                    </Form.Group>
                </Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Shop Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter shop address" name="address" className={errors.address && "regi-inp-err"}
                        {...register("address", {
                            required: "Address is Required",
                        })}
                        value={userData.shopaddress} onChange={e => setUserData({ ...userData, shopaddress: e.target.value })} />
                    {errors.address && <div className="text-danger">{errors.email.message}</div>}

                </Form.Group>
                <Col>
                    <Row>
                        <Form.Group as={Col} className="" >
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working StartTime" name="starttime" className={errors.starttime && "regi-inp-err"}
                                {...register("starttime", {
                                    required: "StartTime is Required",
                                })}
                                value={userData.starttime} onChange={e => setUserData({ ...userData, starttime: e.target.value })} />
                            {errors.starttime && <div className="text-danger">{errors.starttime.message}</div>}

                        </Form.Group>
                        <Form.Group as={Col} className="" >
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="time" placeholder="Enter working time" name="endtime" className={errors.endtime && "regi-inp-err"}
                                {...register("endtime", {
                                    required: "StartTime is Required",
                                })}
                                value={userData.endtime} onChange={e => setUserData({ ...userData, endtime: e.target.value })} />
                            {errors.endtime && <div className="text-danger">{errors.endtime.message}</div>}

                        </Form.Group>
                    </Row>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter the worker salary" name="price" className={errors.price&& "regi-inp-err"}
                            {...register("price", {
                                required: "Price is Required",
                            })}
                            value={userData.price} onChange={e => setUserData({ ...userData, price: e.target.value })} />
                        {errors.price && <div className="text-danger">{errors.price.message}</div>}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Shop Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter The shop mobile number"  name="phone" className={errors.phone && "regi-inp-err"}
                            {...register("phone", {
                                required: " is Required",
                            })}
                            value={userData.shopmobilenumber} onChange={e => setUserData({ ...userData, shopmobilenumber: e.target.value })} />
                        {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Work</Form.Label>
                        <Form.Control type="text" placeholder="what the work for your shop" name="work" className={errors.work && "regi-inp-err"}
                            {...register("work", {
                                required: "Work is Required",
                            })}
                            value={userData.work} onChange={e => setUserData({ ...userData, work: e.target.value })} />
                        {errors.work && <div className="text-danger">{errors.work.message}</div>}
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Choose Image</Form.Label>
                        <Form.Control type="file" placeholder="Enter The Phone Number"
                            {...register("image", {
                                required: "Image is Required",
                            })}
                            onChange={e => setUserData({ ...userData, file: e.target.files[0] })} />
                        {errors.image && <div className="text-danger">{errors.image.message}</div>}
                    </Form.Group>
                </Col>
                <Col className="login-btn">
                    <Button variant="success" className="text text-" type="submit" >Update</Button>
                </Col>
            </Form>
            {submitSuccess && (
                <div className="popup-container">
                    <div className="popup">
                        <p>Form submitted successfully!</p>
                        <button onClick={() => setsubmitSuccess(false)}>Close</button>
                    </div>
                </div>)}
        </Row>
    </Container>
    </Dashboard>
    )
}
export default AdminProductUpdate