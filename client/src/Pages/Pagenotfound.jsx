import React from "react";
import Layout from "../Components/layout/Layout";
import { Link } from "react-router-dom";
import '../css/pagenotfound.css'
function Pagenotfound() {
  return (
    <Layout title={"go-back Page-not-found"}>
      <div className="page-not-found">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">Go to Home</Link>
      </div>
    </Layout>
  );
}

export default Pagenotfound;
