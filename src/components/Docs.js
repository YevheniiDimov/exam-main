import React, { useContext, useState } from "react";
import { UserContext } from "../services/context";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "react-query";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';

// Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function Docs() {
    const { contextToken /*, setContextToken*/ } = useContext(UserContext);

    // const firebaseConfig = {
    //     apiKey: "AIzaSyAZW8lus99RVfO8rKTs-9qVYJxcN0aPDf4",
    //     authDomain: "cnap-85c96.firebaseapp.com",
    //     projectId: "cnap-85c96",
    //     storageBucket: "cnap-85c96.appspot.com",
    //     messagingSenderId: "377205788530",
    //     appId: "1:377205788530:web:72bdaf7721aae0930ad7eb",
    //     measurementId: "G-SQZXN3CR25"
    //   };
    // const app = initializeApp(firebaseConfig);
    // const storage = getStorage(app);

    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    // function getFileURL(sFileName) {
    //     const fileRef = ref(storage, `files/cloud/${sFileName}`);
    //     return getDownloadURL(fileRef);
    // }

    // FOR PAGER!

    // const {data: reportsCnt} = useQuery('reportsCnt', () => {
    //      return fetch("https://api.kremen.org.ua/api/cnap/zvit/getcount", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         body: `access_token=${contextToken}`
    //      })
    //     .then((r) => r.json()).then((data) => JSON.parse(data))
    // }, { staleTime: 86400 });

    const { isLoading, isError, error, isIdle, data: docs } = useQuery('regulationdocs', () => {
        return fetch("https://api.kremen.org.ua/api/cnap/regulationdocs/getlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `page=${page-1}&pageSize=${PER_PAGE}&access_token=${contextToken}`
        })
        .then((r) => r.json())
        .then((data) => JSON.parse(data))
    }, { staleTime: 86400 });

    // const { isLoading, isError, error, isIdle, data: docFiles } = useQuery('files', () => {
    //     const promise = new Promise(resolve => resolve());
    //     docs.rows.forEach(e => {
    //         promise.then((d) => getFileURL(e.files[0].file_name))
    //     })
    //     return promise;
    // }, { enabled: !!docs, staleTime: 86400 });

    
    if (isError) {
        console.log(error);
        return <h1 className="m-10">We got some troubles in getting important data. Try later, please.</h1>;
    }

    if (isIdle || isLoading) {
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
        <div className="news">
            <div className="wrapper">
                <div className="news-list">
                    {docs.rows.map((e, i) => (
                    <div
                        key={i}
                        className="news-entry"
                    >
                        <span className="news-date">
                        {e.num}
                        </span>
                        <p className="news-title mb-0">
                        {capitalizeFirstLetter(e.doc_title.toLowerCase())}
                        </p>
                        <a href={"https://cnap-kremen.gov.ua/files/cloud/"+ e.files[0].file_name}>
                        <Tooltip placement="left" title="??????????????????????">
                            <IconButton color="primary" aria-label="download picture" component="label" >
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        </a>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}