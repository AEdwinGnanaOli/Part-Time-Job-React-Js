import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { GiShoppingCart } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { IoMdContact } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Card } from "antd";
import "../css/card.css";
import Layout from "../Components/layout/Layout";

function Home({ colors }) {
  // const color = colors;
  const { Meta } = Card;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [cookies, removeCookie] = useCookies([]);
  const [vendorId, setvendorId] = useState({});
  const [userId, setuserId] = useState();
  const [submitSuccess, setsubmitSuccess] = useState(false);
  const [vendorProducts, setVendorProducts] = useState([]);
  sessionStorage.setItem("userid", userId);
  useEffect(() => {
    axios.get("https://part-time-job-react-js.onrender.com").then((data) => {
      console.log(data);
      setVendorProducts(data.data.vendorProducts);
    });
  }, []);

  const handleUserUpdate = (id) => {
    navigate("/user/update", sessionStorage.setItem("uupdateid", id));
  };
  const handleUserDelete = (id) => {
    axios
      .delete(`https://part-time-job-react-js.onrender.com/user/delete/${id}`)
      .then((user) => {
        window.location.reload();
        Logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout title={"Home"}>
      {/* Product Card Start  */}
      <section id="card">
        {vendorProducts.map((vendor) => (
          <Card
            hoverable="red"
            className="carts"
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
              <span
                onClick={(e) =>
                  navigate(`/productfulldetail/${vendor._id}/${cookies.token}`)
                }
              >
                more
              </span>,
            ]}
          >
            <Meta title={vendor.shopname} description={vendor.shopaddress} />
          </Card>
        ))}
      </section>

      {/* Product Card End */}
    </Layout>
  );
}

export default Home;
