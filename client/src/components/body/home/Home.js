import React, { useState, useEffect ,useSelector} from "react";
import axios from "axios";
import './home.css'

const GetDiagnosis = () => {
  const [token, setToken] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [currSymptomsID, setcurrSymptomsID] = useState([10, 15]); // testing on symptom id 10, i.e, abdominal pain
  const [gender, setGender] = useState("Male");
  const [yob, setYob] = useState(22);
  const [diagResult, setDiagResult] = useState();
  const [callback, setCallback] = useState(0);

  //   fetching token
  useEffect(() => {
    window.scrollTo({ top: 0 });
    var data = "";

    var config = {
      method: "post",
      url: "https://authservice.priaid.ch/login",
      headers: {
        Authorization: "Bearer i3C8Y_UWATERLOO_CA_AUT:UNYkk7S+VPiPcQDSeZ9hpQ==", // Bearer `ID`:`PASS` ,,, save it in .env file
        Cookie: "ASP.NET_SessionId=fhxjv4ggydwkidpsbttuhmaf",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setToken(response.data.Token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [callback,token]);

  //   fetching symptoms
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://healthservice.priaid.ch/symptoms?token=${token}&format=json&language=en-gb`,
      headers: {
        Cookie: "ASP.NET_SessionId=ttsj5fqvfnrvl400bglt2zbd",
      },
    };

    axios(config)
      .then(function (response) {
        setSymptoms(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [callback, token]);

  //   getting diagnosis result
  const GetDiag = async () => {
    var config = {
      method: "get",
      url:
        "https://healthservice.priaid.ch/diagnosis?symptoms=[" +
        currSymptomsID +
        "]&gender=" +
        gender +
        "&year_of_birth=" +
        yob +
        "&token=" +
        token +
        "&format=json&language=en-gb",
      headers: {
        Cookie: "ASP.NET_SessionId=ttsj5fqvfnrvl400bglt2zbd",
      },
    };

    axios(config)
      .then(function (response) {
        setDiagResult(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* <header> */}
        <div class="header-row">
            <a href="./index.html">
                <div class="logo">
                    <img src="./images/logo.png" alt="Symptor Checker Icon"/>
                    <h1>QuickCheck</h1>
                </div>
            </a>

            <ul>
                <li class="underline"><a href="./index.html">Home</a></li>
                {/* <li><a href="./takeTheTest.html">Take the Test</a></li> */}
            </ul>
        </div>
    {/* </header> */}


    <section class="hero full-screen-width">
        <div class="text-area">
            <p>QuickCheck is an online symptom checker that allows users to receive a preliminary diagnosis,
                based on the symptoms they report from the comfort of their home.</p>
            <div class="button-area">
                {/* <a href="./takeTheTest.html"> */}
                    {/* <div class="btn-grey">
                        Take the test <img src="./images/arrow.png" alt="Right Arrow"/>
                    </div>
                </a> */}
            </div>
        </div>
        <div class="image-area">
            <img src="./images/homeImage.png" alt="Home Image"/>
        </div>
    </section>
    <section class="cards-section full-screen-width">
        <div class="card">
            <img src="./images/free.png" alt="Free"/>
            <div class="text">
                <h2>Free</h2>
                <p>QuickCheck cares about you. That’s why our service is free!</p>
            </div>
        </div>
        <div class="card">
            <img src="./images/accessible.png" alt="Free"/>
            <div class="text">
                <h2>Accessible</h2>
                <p>QuickCheck is accessible to everyone all over the world!</p>
            </div>
        </div>
        <div class="card">
            <img src="./images/easyToUse.png" alt="Free"/>
            <div class="text">
                <h2>Easy To Use</h2>
                <p>QuickCheck software is intuitive and simple to use. Take the test to find out!</p>
            </div>
        </div>
    </section>

    <p class="disclaimer" >Diclaimer: This is not real medical advice. Please contact a professional
        doctor for a proper
        diagnosis </p>

    {/* <footer> */}
        <p>Made with &nbsp;<img src="./images/heart.png" alt="Free"/>&nbsp;at DubHacks</p>
    {/* </footer> */}
      {/* <p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        diagnosis
        <i
          className="fas fa-plus-circle"
          title="Add"
          onClick={() => GetDiag()}
        ></i>
        <br />
        <br />
        <p>{JSON.stringify(diagResult)}</p>
      </p> */}
    </>
  );
};

export default GetDiagnosis;
