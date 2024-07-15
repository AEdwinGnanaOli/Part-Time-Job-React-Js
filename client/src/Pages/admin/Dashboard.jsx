import React, { useEffect, useRef, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { BsCart3, BsDatabaseDown } from "react-icons/bs";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Button, Layout, Menu, theme, Flex } from "antd";
import axios from "axios";
import {
  MdDelete,
  MdModeEdit,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./css/header.css";
import { ToastContainer, toast } from 'react-toastify'
import { IoClose } from "react-icons/io5";
import AdminLayout from "./Index";
import { Helmet } from "react-helmet";
import { Footer } from "antd/es/layout/layout";
// import Footers from "./Footer";
const { Header, Sider, Content } = Layout;
const Dashboard = ({ colors, children, title, description, keyword, author }) => {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const color = colors;
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [datavalue, setValueData] = useState([]);
  const [admin, setId] = useState();
  const [submitSuccess, setsubmitSuccess] = useState(false);
  cookies.token = localStorage.getItem("atoken");
  sessionStorage.setItem("adminId", admin);
  useEffect(() => {
    const verifyCookies = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://part-time-job-react-js.onrender.com/adminhome",
        {},
        { withCredentials: true }
      );
      const { status } = data;
      setId(data.user._id);
      setValueData([data.user]);
      return status
        ? toast(`hello`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookies();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
    localStorage.clear("atoken");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const accountDetails = () => {
    setsubmitSuccess(true);
  };

  return (
    <div>
    <Layout style={{ width: "100%", height: "45rem" ,}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          style={{ paddingBottom: "20px", display: "flex", flexWrap: "wrap" }}
          items={[
            {              
              icon: <BsCart3 className="icon icon-logo" />,
              label: "SHOP",
              onClick:()=>navigate('/admin/layout')
              
            },
            { 
              icon: <UserOutlined />,
              label: "User" ,
              onClick:()=>navigate('/userdetails')
            },
            {
              icon: <TeamOutlined />,
              label: "Vendor",
              onClick:()=>{navigate('/vendordetails')}
            },
            {
              icon: <MdProductionQuantityLimits />,
              label: "Products",
              onClick:()=>{navigate('/vendorproduct')}
            },
            {
              icon: <BsDatabaseDown />,
              label: "UserLoginData",
              onClick:()=>{navigate('/userlogindata')}
            },
            {
              icon: <BsDatabaseDown/>,
              label: "VendorLoginData",
              onClick:()=>{navigate('/vendorlogindata')}
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            width: "100% !mportant",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Navbar expand="md" className="bg-body-tertiary navbar-header colors">
            <Container fluid>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link onClick={()=>navigate('/admin/about')}>About Us</Nav.Link>
                  <Nav.Link onClick={()=>navigate('/admin/contect')}>Contect Us</Nav.Link>
                  <Nav.Link onClick={accountDetails}>
                    <IoMdContact />
                  </Nav.Link>
                  <Button type="primary" onClick={Logout} className="ad-logout">
                    Logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* User Profile Start */}
          <div className="admin-data">
            {submitSuccess && (
              <div className="admin-profile-container">
                <div className="admin-profile">
                  {datavalue.map((user) => (
                    <div className="user-profile">
                      <div
                        className="profile-name"
                        style={{ background: color }}
                      >
                        <div className="first-letter">{user.name[0]}</div>
                      </div>
                      <ul className="profile-details">
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                        <li>{user.phone}</li>
                      </ul>
                      <div className="btns d-flex justify-content-between p-2">
                        <Button
                          className="edit-btn button-update"
                          variant="success"
                          onClick={(e) => handleAdminUpdate(user._id)}
                        >
                          <i>
                            <MdModeEdit className="edit-icon" />
                          </i>
                          <i>Edit</i>
                        </Button>
                        <Button
                          className="edit-btn button-update"
                          variant="success"
                          onClick={(e) => handleAdminDelete(user._id)}
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

          <div className="dash-main">
            {children}
          </div>
        </Content>
        <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
      </Layout>
    </Layout>
    <Helmet>
      
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={author}/>
          <title>{title}</title>
      </Helmet>
    </div>
  );
};
Dashboard.defaultProps={
  title:'Food Truck-App',
  keyword:'HTML,CSS,REACT,JAVASCRIPT,NODE.JS MERN STACK',
  author:'Edwin'
}

export default Dashboard;
