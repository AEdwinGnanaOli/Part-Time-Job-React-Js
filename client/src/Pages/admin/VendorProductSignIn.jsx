import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dashboard from "./Dashboard";
import './css/signup.css'
function ProductSignIn() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { vendorId } = useParams()
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const email = sessionStorage.getItem('avemail')
    const [userData, setUserData] = useState({ shopname: "", email: email, shopmobilenumber: '', shopaddress: "", starttime: "", endtime: "", price: "", work: "", file: "", role: 'VendorProduct' })
    const navigate = useNavigate()
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
            formData.append('work', userData.work)
            formData.append('price', userData.price)
            formData.append('role', userData.role)
            formData.append('file', userData.file);
            axios.post(`https://part-time-job-react-js.onrender.com/productregister/${vendorId}`, formData).then((user) => {
                if (user.data === "User already exists") {
                    throw new Error()
                } else {
                    navigate("/adminhome")
                }
            }).catch((err) => { console.log(err) })

        } catch (error) {
            setError("root", { message: "User already exists" })
        }
    }
    return (
        <Dashboard title={'Product-Sign-Up'}>
        <Container>
            <Row  >
                <Col className="form-header">
                    <Form className="signup-form" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                        <h1 className="text-center">ProductRegister</h1>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Shop Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter The Shop Name" name="shopname" className={errors.shopname && "regi-inp-err"}
                                    {...register("shopname", {
                                        required: "Name is Required",
                                        validate: (value) => {
                                            if (value[0].trim() === value[0].toUpperCase()) {
                                                return true
                                            }
                                            return 'First letter is capital '
                                        }
                                    })}
                                    value={userData.shopname} onChange={e => setUserData({ ...userData, shopname: e.target.value })} />
                                {errors.shopname && <div className="error-color">{errors.shopname.message}</div>}

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" disabled  name="email" className={errors.email && "regi-inp-err"}
                                    
                                    value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                                

                            </Form.Group>
                        </Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Shop Address</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter shop address" name="address" className={errors.address && "regi-inp-err"}
                                {...register("address", {
                                    required: "Address is Required",
                                })}
                                value={userData.shopaddress} onChange={e => setUserData({ ...userData, shopaddress: e.target.value })} />
                            {errors.address && <div className="error-color">{errors.address.message}</div>}

                        </Form.Group>
                        <Col>
                            <Row>
                                <Form.Group as={Col} className="" >
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control type="time" placeholder="Enter working time" name="starttime" className={errors.starttime && "regi-inp-err"}
                                        {...register("starttime", {
                                            required: "StartTime is Required",
                                        })}
                                        value={userData.starttime} onChange={e => setUserData({ ...userData, starttime: e.target.value })} />
                                    {errors.starttime && <div className="error-color">{errors.starttime.message}</div>}

                                </Form.Group>
                                <Form.Group as={Col} className="" >
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control type="time" placeholder="Enter working time" name="endtime" className={errors.endtime && "regi-inp-err"}
                                        {...register("endtime", {
                                            required: "StartTime is Required",
                                        })}
                                        value={userData.endtime} onChange={e => setUserData({ ...userData, endtime: e.target.value })} />
                                    {errors.endtime && <div className="error-color">{errors.endtime.message}</div>}

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
                                {errors.price && <div className="error-color">{errors.price.message}</div>}

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Shop Mobile Number</Form.Label>
                                <Form.Control type="number" placeholder="Enter The shop mobile number" name="phone" className={errors.phone && "regi-inp-err"}
                                    {...register("phone", {
                                        required: " Phone is Required",
                                    })}
                                    value={userData.shopmobilenumber} onChange={e => setUserData({ ...userData, shopmobilenumber: e.target.value })} />
                                {errors.phone && <div className="error-color">{errors.phone.message}</div>}
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
                                {errors.work && <div className="error-color">{errors.work.message}</div>}
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
                                {errors.image && <div className="error-color">{errors.image.message}</div>}
                            </Form.Group>
                        </Col>
                        <Col className="login-btn">
                            <Button variant="success" className="text text-" type="submit" disabled={isSubmitting} >{isSubmitting ? "loading....." : "submit"}</Button>
                        </Col>
                        {submitSuccess && (
                            <div className="popup-container">
                                <div className="popup">
                                    <p>Form submitted successfully!</p>
                                    <button onClick={() => setsubmitSuccess(false)}>Close</button>
                                </div>
                            </div>)}
                    </Form>
                </Col>
            </Row>
        </Container>
        </Dashboard>
    )
}
export default ProductSignIn