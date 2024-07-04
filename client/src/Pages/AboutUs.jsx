import React from "react";
import "../css/about.css";
import Layout from "../Components/layout/Layout";
function AboutUs() {
  return (
    <Layout title={'About-us'}>
    <div className="about-page" style={{minHeight:'100vh'}}>
      <h1>About Us</h1>

      <div className="about-content">
        <p>
          Welcome to FoodTruck, your go-to destination for delicious
          street food on wheels. Our passion for food and dedication to quality
          drive everything we do. From mouthwatering tacos to gourmet burgers,
          we're committed to serving up memorable dining experiences.
        </p>
        <p>
          At Food Truck , we believe in using only the freshest, locally
          sourced ingredients to create our culinary creations. Each dish is
          crafted with love and attention to detail, ensuring that every bite is
          bursting with flavor.
        </p>
        <p>
          But Food Truck is more than just a food truck - it's a
          community. We're proud to be a part of your neighborhood and to share
          our love for food with you. Whether you're a loyal customer or a
          first-time visitor, we welcome you to join us on this delicious
          journey!
        </p>
      </div>
    </div>
    </Layout>
  );
}

export default AboutUs;
