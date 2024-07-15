import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Container, Nav, Button, Col } from "react-bootstrap";
import { Card } from "antd";
import Layout from "../Components/layout/Layout";
import { useAuth } from "../Context/auth";
function UserCard() {
  const { Meta } = Card;
  const [auth, setAuth] = useAuth();
  const [userCart, setCart] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://part-time-job-react-js.onrender.com/usercartdisplay/${auth.user._id}/${auth.token}`
      )
      .then((product) => {
        setCart(product.data.userCart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userCart]);
  const handleDelete = (id, vendorId) => {
    axios
      .delete(`https://part-time-job-react-js.onrender.com/usercartdelete/${id}/${vendorId}`)
      .then((user) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout title={"Cart"}>
      <div className="cart-header">
        {/* User Cart Start */}
        <section id="card">
          {userCart.map((vendor) => (
            <Card
              hoverable
              style={{
                width: 300,
              }}
              key={vendor._id}
              cover={
                <img
                  alt="example"
                  src={`https://part-time-job-react-js.onrender.com/images/${vendor.image}`}
                  style={{ height: "300px" }}
                />
              }
              actions={[
                <Button
                  variant="success"
                  onClick={(e) => handleDelete(auth.user._id, vendor.ProductId)}
                >
                  Cancel
                </Button>,
              ]}
            >
              <Meta title={vendor.shopname} description={vendor.shopaddress} />
            </Card>
          ))}
        </section>
        {/* User Cart End */}
      </div>
    </Layout>
  );
}

export default UserCard;
