import React, { useState, useEffect, useSelector } from "react";
import axios from "axios";
import Issue from "./issue";
// import "./home.css";

const SymptomChecker = () => {
  const [token, setToken] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [symptom, setSymptom] = useState({});
  const [issues, setIssues] = useState([]);

  const [currSymptomsID, setcurrSymptomsID] = useState([]); // testing on symptom id 10, i.e, abdominal pain
  const [gender, setGender] = useState("Male");
  const [yob, setYob] = useState();
  const [diagResult, setDiagResult] = useState([]);

  const [issue_id, setIssue_id] = useState(0);
  const [issue_info, setIssue_info] = useState({});

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

  // fetching issues
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://healthservice.priaid.ch/issues?token=${token}&format=json&language=en-gb`,
      headers: {
        Cookie: "ASP.NET_SessionId=ttsj5fqvfnrvl400bglt2zbd",
      },
    };

    axios(config)
      .then(function (response) {
        setIssues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [callback, token]);

  //   getting diagnosis result
  const symptom_checker = async () => {
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

  const handleChangeYOB = (e) => {
    const { name, value } = e.target;
    setYob(Number(value));
  };
  const handleChangeGender = (e) => {
    const { name, value } = e.target;
    setGender(value);
  };

  const handleChangeSymptom = async (e) => {
    const { name, value } = e.target;
    setSymptom({ ...symptom, [name]: value });
    setcurrSymptomsID([...currSymptomsID, Number(value)]);
  };

  const handleDeleteCurrSymptoms = async (symptomsID) => {
    try {
      const newSymptoms = currSymptomsID.filter((currSymptomID) => {
        return Number(currSymptomID) !== symptomsID;
      });
      setcurrSymptomsID(newSymptoms);
      setSymptom({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeIssue = async (e) => {
    const { name, value } = e.target;
    setIssue_id(Number(value));
  };

  // render selected symptoms
  const renderSymptoms = () => {
    if (currSymptomsID.length === 0) return "";
    return (
      <div className="col-right">
        <h5>Current symptoms</h5>
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currSymptomsID.map((symptomsID) => (
                <tr key={symptomsID}>
                  {symptoms.map((symptom) => (
                    <div>
                      {symptom.ID === symptomsID ? (
                        <div>
                          <td>{symptom.Name}</td>
                          <td>
                            <i
                              className="fas fa-trash-alt"
                              title="Remove"
                              onClick={() =>
                                handleDeleteCurrSymptoms(symptomsID)
                              }
                            ></i>
                          </td>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // render selected result
  const renderResult = () => {
    if (diagResult.length === 0) return "";
    return (
      <div className="col-right">
        <h5>Diagnosis Result</h5>
        <div style={{ overflowX: "auto" }}>
          <table className="medical">
            <thead>
              <tr>
                <th>Isue</th>
                <th>Chances</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {diagResult.map((result) => (
                <tr key={result.Issue.ID}>
                  <td>
                    <a href={"/issue/" + result.Issue.ID}>
                      {result.Issue.Name}
                    </a>
                  </td>
                  <td>{result.Issue.Accuracy}</td>
                  <td>
                    {result.Specialisation.map((Specialisation) => (
                      <div>{Specialisation.Name}, </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1> Symptom Checker</h1>
      <div className="input-field">
        <label htmlFor="Age">Year of birth</label>
        <input
          className="oxygenLevel"
          id="exampleInputage1"
          placeholder="YYYY"
          onChange={handleChangeYOB}
          value={yob}
          name=""
        />
      </div>
      <div>
        <label htmlFor="Gender">
          <span class="required-field"></span>Gender
        </label>
        <div className="Gender">
          <label for="Male">Male</label>
          <input
            type="radio"
            id="Male"
            onChange={handleChangeGender}
            name="Gender"
            defaultChecked
            value="Male"
            className="mode_o"
          />
          <label for="Female">Female</label>
          <input
            type="radio"
            id="Female"
            onChange={handleChangeGender}
            name="Gender"
            value="Female"
            className="mode_o"
          />
        </div>
      </div>
      <div class="col s12 m6 l4">
        <div className="form-group">
          <label htmlFor="add_symptoms">Add symptoms</label>
          <select
            className="form-control text-capitalize symptom"
            value={symptom.Name}
            name="ID"
            onChange={handleChangeSymptom}
          >
            <option value="">Select a Symptom</option>
            {symptoms.map((symptom) => (
              <option key={symptom.ID} value={symptom.ID}>
                {symptom.Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {renderSymptoms()}

      <button
        className="blog_post_btn mt-3 d-block mx-auto"
        onClick={symptom_checker}
      >
        Check
      </button>
      {renderResult()}

      <h1>Or</h1>
      <div class="col s12 m6 l4">
        <div className="form-group">
          <label htmlFor="Find_issue">Check Issues</label>
          <select
            className="form-control text-capitalize symptom"
            value={issue_id}
            name="ID"
            onChange={handleChangeIssue}
          >
            <option value="">Select a Issue</option>
            {issues.map((issue) => (
              <option key={issue.ID} value={issue.ID}>
                {issue.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <a href={"/issue/" + issue_id}>Check</a>
    </>
  );
};

export default SymptomChecker;
