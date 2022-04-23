import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Issue = (prop) => {
  const { issueId } = useParams();

  const [token, setToken] = useState("");
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

  //   fetching issue info
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://healthservice.priaid.ch/issues/${issueId}/info?token=${token}&format=json&language=en-gb`,
      headers: {
        Cookie: "ASP.NET_SessionId=ttsj5fqvfnrvl400bglt2zbd",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setIssue_info(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [callback, token]);

  return (
    <>
       <div className="continer-symptom">
        <div className="pro">
      <h1>{issue_info.Name}</h1>
      <h3>Short Description</h3>
      {issue_info.DescriptionShort}
      <br />
      <hr />
      <h3>Description</h3>
      {issue_info.Description}
      <br />
      <hr />
      <h3>Medical Condition</h3>
      {issue_info.MedicalCondition}
      <br />
      <hr />
      <h3>Possible Symptoms</h3>
      {issue_info.PossibleSymptoms}
      <br />
      <hr />
      <h3>Other Names</h3>
      {issue_info.ProfName}
      {issue_info.Synonyms}
      <br />
      <hr />
      <h3>Treatment Description</h3>
      {issue_info.TreatmentDescription}
      <br />
        <hr />
        </div></div>
    </>
  );
};

export default Issue;
