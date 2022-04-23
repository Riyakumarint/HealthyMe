import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Doctor_dash() {
  const auth = useSelector((state) => state.auth);
  const { user, isAdmin, isDoctor } = auth;
  
  const [appointments, setAppointments] = useState([]);
  const [callBack, setcallBack] = useState(false);
  const [numberPatient, setNumberPatient] = useState(0);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const getdata1 = async () => {
      try {
        const temp = await axios.get("appointments/getdata1/" + user);
        // console.log("hello:  " + temp);
      } catch (err) {
        console.log(err);
      }
    };
    getdata1();
    const getdata2 = async () => {
      try {
        const res = await axios.get("/appointments/fetchAppointments", {
          headers: { Authorization: token },
        });
        // console.log(res.data);
        setAppointments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getdata2();
  }, [callBack]);

  function countUnique(iterable) {
    return new Set(iterable).size;
  }

  
  return (
    <>
      <h1>Patient Number: {numberPatient}</h1>
      <Charts
        barData={barData}
        chartData={pieData}
        chartData2={pieData2}
        location="Massachusetts"
        legendPosition="bottom"
      />
    </>
  );
}
