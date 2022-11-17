import "../styles.css";
import React, { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";

export default function AdminServices() {
  const { contextToken /*, setContextToken*/ } = useContext(UserContext);

  const { isLoading, isError, error, data: subgroups } = useQuery('subgroups', () => {
    return fetch("https://api.kremen.org.ua/api/cnap/metadata/getsubgroups", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `access_token=${contextToken}`
    }).then((r) => r.json())
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
    <div className="admin-services">
      <div className="wrapper">
        <div className="admin-header">
          <h1>Адміністративні послуги</h1>
        </div>
        <div className="group-list">
          {subgroups.rows.map((e, i) => (
            <a
              key={i}
              className="group-entry"
              href={"/adminservice/" + e.id_stgt}
            >
              <img
                src={"../img/groups/" + e.id_stgt + ".png"}
                alt={e.id_stgt}
              />
              <span>{e.stgt_name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
