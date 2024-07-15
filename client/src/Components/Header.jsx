import React, { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { useAuth } from "../Context/auth";
import{ ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [submitSuccess, setsubmitSuccess] = useState(false);
  const [datavalue, setValueData] = useState([auth.user]);
  const Logout = () => {
    navigate("/");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.clear("utoken");
  };
  const accountDetails = () => {
    setsubmitSuccess(true);
    setValueData([auth.user])
  };

  return (
    <div>
    <Navbar expand="md" className="bg-body-tertiary navbar-header">
      <Container fluid>
        <Navbar.Brand onClick={(e) => navigate("/")} className="logo">
          PTJP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!auth.user ? (
              <Nav.Link onClick={(e) => navigate("/")}>Home</Nav.Link>
            ) : (
              <Nav.Link onClick={(e) => navigate("/userhome")}>Home</Nav.Link>
            )}
            <Nav.Link onClick={(e) => navigate("/about-us")}>About Us</Nav.Link>
            <Nav.Link onClick={(e) => navigate("/contect-us")}>
              Contact Us
            </Nav.Link>
            {!auth.user ? (
              <>
                <Button
                  variant={"success"}
                  className="signin-btn"
                  onClick={(e) => navigate("/signup")}
                >
                  SignIn
                </Button>
                <Button
                  variant={"success"}
                  className="login-btn"
                  onClick={(e) => navigate("/login")}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <div className="user-p-c">
                  <UserOutlined className='user-profile' onClick={accountDetails}/>
                  <ShoppingCartOutlined className='user-cart' onClick={()=>navigate('/usercart')}/>
                </div>
                <Button variant={"success"} onClick={Logout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {/* User Profile Start */}
     <div className="user-data">
        {submitSuccess && (
          <div className="user-profile-container">
            <div className="users-profile">
              {datavalue.map((user) => (
                <div className="user-profile">
                  {console.log(user.name)}
                  <div
                    className="user-profile-name"
                    style={{ background:'red'}}
                  >
                    <div className="user-first-letter">{user.name[0]}</div>
                  </div>
                  <ul className="user-profile-details">
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.phone}</li>
                  </ul>
                  <div className="btns d-flex justify-content-between p-2">
                    <Button
                      className="edit-btn button-update"
                      variant="success"
                      onClick={(e) => handleUserUpdate(user._id)}
                    >
                      <i>
                        <MdModeEdit className="edit-icon" />
                      </i>
                      <i>Edit</i>
                    </Button>
                    <Button
                      className="edit-btn button-update"
                      variant="success"
                      onClick={(e) => handleUserDelete(user._id)}
                    >
                      <i>
                        <MdDelete className="edit-icon" />
                      </i>
                      <i>Delete</i>
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant=""
                className="button-close"
                onClick={() => setsubmitSuccess(false)}
              >
                <IoClose />
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* User Profile End */}
    </div>
  );
}

export default Header;
