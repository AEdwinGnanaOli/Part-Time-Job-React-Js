import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "../Components/layout/Layout";
function SignIn() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [submitSuccess, setsubmitSuccess] = useState(false)
    const [userData, setUserData] = useState({ name: "", email: "", phone: '', password: "", role: 'user' })
    const navigate = useNavigate()
    const onSubmit = async (e) => { 
        try {
            setsubmitSuccess(true)
            await new Promise((resolve) => { setTimeout(resolve, 2000) })
            axios.post('http://localhost:3000/userRegister', { ...userData }).then((user) => {
                if (user.data.message === 'User already exists') {
                    throw new Error()
                } else {
                    navigate('/login')
                }
            }).catch((err) => {
                setError("root", {
                    message: "User already exists",
                }, null)
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <Layout title={'Sign-In'}>
            <Container className="container" >
                <Row className="d-flex justify-content-md̥-center login-row " >
                    <Col className=" first-col" md={6}>
                        {/* User SignIn Start */}
                        <form onSubmit={handleSubmit(onSubmit)} className=" form-register form-login">
                            <h1 className="text-center">SignUp</h1>
                            <Col>
                                <Form.Group className="mb-3 " >
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" name="firstname" className={errors.firstname&&'regi-inp-err'}
                                        {...register("firstname", {
                                            required: 'Name is required',
                                            validate: (value) => {
                                                console.log(value[0].toUpperCase())
                                                if (value[0].trim() === value[0].toUpperCase()) {
                                                    return true
                                                }
                                                return 'First letter is capital '
                                            }
                                        })}
                                        value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} />
                                    {errors.firstname && <div className="text-danger">{errors.firstname.message}</div>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3"  >
                                    <Form.Label>Email Id</Form.Label>
                                    <Form.Control type="email" name="email" className={errors.email&&'regi-inp-err'}
                                        {...register("email", {
                                            required: "Email is required",
                                            validate: (value) => {
                                                if (!value.includes("@")) {
                                                    return "must includes in @"
                                                }
                                                return true
                                            }

                                        })}
                                        value={userData.email}
                                        onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="Enter email example@gmail.com" />
                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" name="phone" className={errors.phone&&'regi-inp-err'}
                                        {...register('phone', {
                                            required: "Phone Number required",
                                            minLength: {
                                                value: 10,
                                                message: 'The phone number must contanin 10 numbers'
                                            }
                                        })}
                                        value={userData.phone}
                                        onChange={e => setUserData({ ...userData, phone: e.target.value })} placeholder="Enter The Phone Number" />
                                    {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Enter The Password" className={errors.password&&'regi-inp-err'}
                                        {...register('password', {
                                            required: 'Password in required',
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                                message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long',
                                            }
                                        })}
                                        value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                                    {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                </Form.Group>
                            </Col>
                            <Col className="login-f-d">
                                <Button variant="success" type="submit" disabled={isSubmitting} >{isSubmitting ? "loading....." : "SignUp"}</Button>
                                <Link to='/login'>do you have an account login ?</Link>
                                
                            </Col>
                            {errors.root && <div className="text-danger">{errors.root.message}</div>}

                        </form>
                        {/* User SingIn End */}
                        {/* PopUp Start */}
                        {submitSuccess && (
                            <div className="popup-container">
                                <div className="popup">
                                    <p>Form submitted successfully!</p>
                                    <button onClick={() => setsubmitSuccess(false)}>Close</button>
                                </div>
                            </div>)}
                        {/* PopUp End */}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
};
export default SignIn