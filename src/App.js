import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./loginComponents/UserLogin";
import { useContext, useEffect } from "react";
import ProjectState from "./projectcontext/ProjectState";
import Products from "./products/Products";
import ProductinfoCard from "./products/ProductinfoCard";
import Home from "./home/Home";
import AdminLogin from "./Authentaction/AdminAuthentication/AdminLogin";
import AdminSignup from "./Authentaction/AdminAuthentication/AdminSignup";
import AuthDetails from "./Authentaction/AuthDetails";
import Dummy from "./genralComponent/Dummy";
import Admin from "./AdminComponents/Admin";
import ProductCategory from "./products/ProductCategory";
import AboutUs from "./About/AboutUs";
import RaisedTicket from "./About/RaisedTicket";
import Feedback from "./About/Feedback";
import YourCart from "./yourcart/YourCart";
import MyraisedTicket from "./RaisedTicket/MyraisedTicket";
import PeopleFeedbacks from "./RaisedTicket/PeopleFeedbacks";
import RaisedTicketComponent from "./RaisedTicket/RaisedTicketComponent";
import MyOrder from "./yourcart/MyOrder";

function App() {
  return (
    <>
      <Router>
        <ProjectState>
          <Routes>
            <Route exact path="/peoplefeedback" element={<PeopleFeedbacks />} />
            <Route exact path="/myraisedticket" element={<MyraisedTicket />} />
            <Route exact path="/yourcart" element={<YourCart />} />
            <Route exact path="/raisedticket" element={<RaisedTicket />} />
            <Route exact path="/feedback" element={<Feedback />} />
             <Route exact path="/aboutus" element={<AboutUs />} />
             <Route exact path="/myorder" element={<MyOrder />} />
            <Route
              exact
              path="/productcategory"
              element={<ProductCategory />}
            />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/dummy" element={<Dummy />} />
            <Route exact path="/authdetails" element={<AuthDetails />} />
            <Route exact path="/adminsignup" element={<AdminSignup />} />
            <Route exact path="/userlogin" element={<UserLogin />} />
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/productdetails" element={<ProductinfoCard />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/userlogin" element={<UserLogin />} />
          </Routes>
        </ProjectState>
      </Router>
    </>
  );
}

export default App;
