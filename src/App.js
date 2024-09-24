import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProjectState from "./projectcontext/ProjectState";
import Home from "./home/Home";
import Admin from "./AdminComponents/Admin";
import AboutUs from "./About/AboutUs";
import RaisedTicket from "./About/RaisedTicket";
import Feedback from "./About/Feedback";
import YourCart from "./yourcart/YourCart";
import MyraisedTicket from "./RaisedTicket/MyraisedTicket";
import PeopleFeedbacks from "./RaisedTicket/PeopleFeedbacks";
import MyOrder from "./yourcart/MyOrder";
import UserOrders from "./AdminComponents/AdminServices/UserOrders";
import UserTickets from "./AdminComponents/AdminServices/UserTickets";
import Givefeedback from "./About/Givefeedback/Givefeedback";
import UserTicketStatus from "./AdminComponents/AdminServices/UserTicketStatus";
import UserOrderStatus from "./AdminComponents/AdminServices/UserOrderStatus";
import PaymentConfirmation from "./yourcart/PaymentConfirmation";
import Confirmation from "./yourcart/Confirmation";
import Adminhome from "./AdminComponents/AdminDashboard/Adminhome";
import RegestrationForm from "./Authetication/Signup/RegestrationForm"
import PersonalInfo from "./Authetication/Signup/PersonalInfo"
import Loginuser from "./Authetication/Loginuser";
import Preview from "./Authetication/Signup/Preview"
import UserSignup from "./Authetication/Signup/UserSignup"
import Myprofile from "./Authetication/profile/Myprofile";
function App() {
  const check_out_step = [
    {
      name: "Regestration",
      Component: () => <RegestrationForm />,
    },
    {
      name: "Personal Information",
      Component: () => <PersonalInfo />,
    },
    {
      name: "Preview",
      Component: () => <Preview />,
    },
  ];
  return (
    <>
      <Router>
        <ProjectState>
          <Routes>
            <Route exact path="/myprofile" element={<Myprofile />} />
            <Route exact path="/usersignup" element={<UserSignup stepConfig={check_out_step}/>} />
            <Route exact path="/adminhome" element={<Adminhome />} />
            <Route exact path="/paymentconfiramtion" element={<PaymentConfirmation />} />
            <Route exact path="/userorderstatus" element={<UserOrderStatus />} />
            <Route exact path="/peoplefeedback" element={<PeopleFeedbacks />} />
            <Route exact path="/myraisedticket" element={<MyraisedTicket />} />
            <Route exact path="/yourcart" element={<YourCart />} />
            <Route exact path="/raisedticket" element={<RaisedTicket />} />
            <Route exact path="/feedback" element={<Feedback />} />
            <Route exact path="/aboutus" element={<AboutUs />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/confirmation" element={<Confirmation />} />
            {/* <Route
              exact
              path="/productcategory"
              element={<ProductCategory />}
            /> */}
            <Route exact path="/userlogin" element={<Loginuser />} />
            <Route exact path="/userticketstatus" element={<UserTicketStatus />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/userorders" element={<UserOrders />} />
            <Route exact path="/usertickets" element={<UserTickets />} />
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/productdetails" element={<ProductinfoCard />} />
            <Route exact path="/products" element={<Products />} /> */}
            <Route exact path="/givefeedback" element={<Givefeedback />} />
            <Route exact path="/admin" element={<Admin />} />
          </Routes>
        </ProjectState>
      </Router>
    </>
  );
}

export default App;
