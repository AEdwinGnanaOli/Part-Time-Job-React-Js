import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify'
import Layout from '../Components/layout/Layout'
function ForgotPassword() {
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [userData, setUserData] = useState({email: ""});
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const onSubmit = async (e) => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000)
            })
            axios.post('http://localhost:3000/forgotpassword', userData).then((user) => {
                if (user.data.message !== 'User no existed') {
                    throw new Error()
                }else{
                    toast("link sent your email visit",{
                        position:'top-center',
                    })
                }
            }).catch(err => { 
                setError('root', {
                    message: 'Incorrect email'
                })
            })
        } catch (err) {
            console.log(err)
        }
        toast("link sent your email visit",{
            
            position:'top-center',
        })
    }
    return (
        <Layout title={'Forgot-Password'}>
        <Container className="" >
            <Row className="login-row " >
                <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-center">Reset Password</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                className={errors && "valitate-error"}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: (value) => {
                                        if (!value.includes("@")) { 
                                            return "must includes in @" 
                                        } return true
                                    }
                                })}
                                value={userData.email}
                                onChange={e => setUserData({ ...userData, email: e.target.value })} />
                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col className="login-btn">
                        <Button variant="success"  type="submit" disabled={isSubmitting}>{isSubmitting?'loading....':'Reset'}</Button>
                    </Col>
                </Form>
                <ToastContainer />
            </Row>
        </Container>
        </Layout>
    )
}

export default ForgotPassword