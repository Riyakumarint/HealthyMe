import React, { useState, useEffect ,useSelector} from "react";
import axios from "axios";

const SymtomChecker = () => {
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
  }, [callback]);

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
      
      <p>
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
      </p>
      <header>
        <div class="header-row">
            <a href="./index.html">

                <div class="logo">

                    <img src="./images/logo.png" alt="Symptor Checker Icon"/>
                    <h1>QuickCheck</h1>
                </div>
            </a>

            <ul>
                <li><a href="./index.html">Home</a></li>
                <li class="underline"><a href="./takeTheTest.html">Take the Test</a></li>
            </ul>
        </div>
    </header>

    <main>
        <p>Answer Some Basic Questions first</p>
        <p class="disclaimer">Diclaimer: This is not real medical advice. Please contact a
            professional
            doctor for a proper
            diagnosis </p>
        <div class="form-area">
            <div class="error"> <img src="./images/cross.png" alt="cross"/> Please fill out all fields correctly </div>
            <div class="searchInput">
                <input type="text" name="year-of-birth" required/>

                <label for="year-of-birth" class="label-name"> <span class="content-name">
                        Year of Birth
                    </span></label>
            </div>
            <div class="searchInput">
                <input type="text" name="gender" required/>

                <label for="gender" class="label-name"> <span class="content-name">
                        Gender
                    </span></label>
            </div>


            <div class="all-symptoms-autogenerate">
                <div class="dropdown-container">
                    <div class="searchInput">
                        <input class="dropdown" type="text" name="Symptoms" required/>

                        <label for="Symptoms" class="label-name"> <span class="content-name">
                                Symptoms
                            </span></label>
                    </div>
                </div>
            </div>
            <div class="dropdown-options">
                <ul>

                </ul>
            </div>
            <div class="add-symptoms">
                <img class="image" src="./images/plus.png" alt="Add Button"/>Add More Symptoms
            </div>

            <div class="btn-container">
                <div class="button button-see-results">See Results</div>
            </div>
        </div>
    </main>
    </>
  );
};

export default SymtomChecker;
