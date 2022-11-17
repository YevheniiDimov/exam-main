import "../styles.css";
import React, { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";
import  Carousel  from "react-bootstrap/Carousel";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function NewsTextPage(props) {
	const { contextToken /*, setContextToken*/ } = useContext(UserContext);
	const id = props.match.params.id;

	let { isLoading, isError, error, isIdle, data: newsText } = useQuery('text', () => {
		return fetch("https://api.kremen.org.ua/api/cnap/news/getnews", {
			method: "POST",
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `id=${id}&usernetwork=%3A%3A1&access_token=${contextToken}`
		}).then((r) => r.json())
		.then((data) => JSON.parse(data));
	}, { staleTime: 86400 });

	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	function formatNewsDate(string) {
		console.log(string);
		const d = new Date(string);
		// do not specify first parameter to get local date format automatically
		return d.toLocaleDateString("uk-UA", {
			month: "numeric",
			day: "numeric",
			year: "numeric"
			// do not add year, to make coherency with specified design in figma
		});
	}

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
	} else {
		console.log(newsText);
	}

	return (
		<div className="admin-services news-text"> 
			<div className="wrapper">
				<div>
					<span className="news-date">{formatNewsDate(newsText.item.date_public)}</span>
					<div className="contacts-boxInfo mt-3">
						<td dangerouslySetInnerHTML={{__html: newsText.item.body_html}} />
					</div>
				</div>
			</div>
		</div>
	);
}
