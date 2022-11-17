import "../styles.css";
import React, { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";

export default function AdminService(props) {
  const { contextToken /*, setContextToken*/ } = useContext(UserContext);
  const id = props.match.params.id;

  const { isLoading, isError, error, data: services } = useQuery('services', () => {
    return fetch("https://api.kremen.org.ua/api/cnap/metadata/getquestionsbysubgroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `access_token=${contextToken}&stgtid=${id}`
      }
    ).then((r) => r.json())
      .then((data) => {
        data = JSON.parse(data);
        if (data.error) {
          throw new Error(`Error in getting AdminServices: ${data}`);
        }
        return data;
      })
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

  return (
    <div className="online-services">
      <div className="wrapper">
        <div className="service-block">
          <div className="news-list">
            {services.rows.map((e, i) => (
              <div key={i} className="service-entry">
                <span className="service-numb">{e.toap_num}</span>
                <a href={"/adminservicefull/" + e.id_toap} className="news-title">
                  {e.toap_name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
