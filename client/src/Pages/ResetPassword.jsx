import { Container, Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";

function ResetPassword() {
    const{id,token}=useParams()
    const { register, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [userData, setUserData] = useState({ password: "", conformpassword: "" });
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const onSubmit = async (e) => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 2000)
            })
            if (userData.password !== userData.conformpassword) {
                throw new Error()
            } else {
                axios.post(`http://localhost:3000/resetpassword/${id}/${token}`, userData).then((user) => {
                    if (user.data.message === 'The password reset Successfully') {
                        navigate('/login')
                    } 
                }).catch(err => {
                    console.log(err)
                })
            }
        } catch (err) {
            setError('root', {
                message: 'not macth password'
            })
        }
    }
    return (
        <Layout>
        <Container className="" >
            <Row className="login-row " >
                {/* Reset Password Form Start */}
                <Form className="first-col form-login  col-md-6 col-lg-6" style={{ width: '25rem' }} onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="text-center">Reset password</h1>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" name="newpassword"
                                className={errors && "valitate-error"}
                                {...register("newpassword", {
                                    required: "password is required",
                                    pattern: {
                                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long',
                                    }
                                })}
                                value={userData.password}
                                onChange={e => setUserData({ ...userData, password: e.target.value })} />
                            {errors.newpassword && <div className="text-danger">{errors.newpassword.message}</div>}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>ConformPassword</Form.Label>
                            <Form.Control type="password" placeholder=" Enter the conform password" name="conformpassword"
                                {...register('conformpassword', {
                                    required: "password is required",
                                })}
                                onChange={e => setUserData({ ...userData, conformpassword: e.target.value })}
                            />
                            {errors.conformpassword && <div className="text-danger">{errors.conformpassword.message}</div>}
                        </Form.Group>
                    </Col>
                    {errors.root && <div className="text-danger">{errors.root.message}</div>}
                    <Col className="login-btn">
                        <Button variant="success" type="submit">Reset</Button>
                    </Col>
                </Form>
                {/* Reset Password Form End */}
            </Row>
        </Container>
        </Layout>
    )
};

export default ResetPassword