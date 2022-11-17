import "../styles.css";
import React, { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";

export default function OnlineServices() {
  const { contextToken /*, setContextToken*/ } = useContext(UserContext);

  const { isLoading, isError, error, data: eServices } = useQuery('services', () => {
    return fetch("https://api.kremen.org.ua/api/cnap/metadata/getonlinequestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `&usernetwork=%3A%3A1&access_token=${contextToken}`
      }
    )
      .then((r) => r.json())
      .then((data) => JSON.parse(data))
  }, { staleTime: 86400 });

  if (isError) {
    console.log(error);
    return <h1 className="m-10">We got some troubles in getting important data. Try later, please.</h1>;
  }

  if (isLoading) {
    return (
      <div className="m-10">
        <h1>Loading</h1>
        <div>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="online-services">
      <div className="wrapper">
        <div className="service-block">
          <div className="news-list">
            {eServices.rows[Object.keys(eServices.rows)[0]].questions.map((e, i) => (
              <div key={i} className="service-entry">
                <span className="service-numb">{e.toap_num}</span>
                <a
                  href="https://api.kremen.org.ua/site/login"
                  target="_blank"
                  rel="noreferrer"
                  className="news-title"
                >
                  {capitalizeFirstLetter(e.toap_name.toLowerCase())}
                </a>
                <a
                  href={e.toap_redirect_path}
                  className="service-video"
                  target="_blank"
                  rel="noreferrer"
                >
                  Відео інструкція
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
