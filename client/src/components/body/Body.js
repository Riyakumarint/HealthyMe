import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";
import ForgotPass from "./auth/ForgotPassword";
import ResetPass from "./auth/ResetPassword";
import Category from "./page/Categories";
import Speciality from "./page/Speciality";
import City from "./page/City";
import Profile from "../body/profile/Profile";
import Issue from "./page/issue";
import Contact from "./page/Contact";
import About from "./page/AboutUs";
import Appointments from "./page/Appointments";
import Appointment_doctor from "./page/Appointment_doctor";
import Appointment_patient from "./page/Appointment_patient";
import Create_appointment from "./page/Create_appointment";
import Find_doctor from "./page/Find_doctor";
import Doctor from "./page/Doctor";
import EditUser from "./profile/EditUser";
import Home from "./home/Home";
import Create_Slots from "./create_Slot/Create_Slot";
import Book_Slots from "./book_Slots/Book_Slots";
import Specialist from "./page/Specialist";
import Medical_profile from "./profile/Medical_Profile";
import SymptomChecker from "./page/SymtomChecker";
import Medical_history from "./profile/Medical_History";
import Megical_history_doc from "./meddical_history_doc/Medical_histor_doc";
import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isDoctor } = auth;

  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/symptom_checker" component={SymptomChecker} exact />
        <Route path="/issue/:issueId" component={Issue} exact />
        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Register}
          exact
        />

        <Route
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPass}
          exact
        />
        <Route
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPass}
          exact
        />

        <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        />

        <Route path="/profile" component={isLogged ? Profile : Login} exact />

        <Route
          path="/medical_profile"
          component={isLogged ? Medical_profile : Login}
          exact
        />
        <Route
          path="/medical_history"
          component={isLogged ? Medical_history : Login}
          exact
        />
        <Route
          path="/medicalhistory/:user"
          component={isLogged ? Megical_history_doc : Login}
          exact
        />

        <Route path="/category" component={isLogged ? Category : Login} exact />
        <Route
          path="/speciality"
          component={isLogged ? Speciality : Login}
          exact
        />
        <Route path="/city" component={isLogged ? City : Login} exact />
        <Route
          path="/create_appointments"
          component={isLogged ? Create_appointment : Login}
          exact
        />
        <Route
          path="/get_appointments"
          component={isLogged ? Appointments : Login}
          exact
        />
        <Route
          path="/appointment/:caseId"
          component={
            isLogged && isDoctor ? Appointment_doctor : Appointment_patient
          }
          exact
        />
        <Route
          path="/createSlot"
          component={isLogged && isDoctor ? Create_Slots : NotFound}
          exact
        />
        <Route path="/find_doctor" component={Find_doctor} exact />
        <Route path="/doctor/:doctorId" component={Doctor} exact />
        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </section>
  );
}

export default Body;
