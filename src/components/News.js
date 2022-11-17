import "../styles.css";
import React, { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";
import  Carousel  from "react-bootstrap/Carousel";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';




export default function News() {
  const [imgUrl, setImgUrl] = useState("https://picsum.photos/400");
  const { contextToken /*, setContextToken*/ } = useContext(UserContext);

  const styleTupography = {"fontFamily":"'Oswald'","fontStyle":"normal","fontWeight":"500","fontSize":"24px",
  "lineHeight":"36px","textAlign":"center","letterSpacing":"0.05em","color":"#008080"};

  const useStyles = makeStyles(() => ({
	ul: {
	  "& .MuiPaginationItem-root": {
		color: "#016b81",
		//background:"#E7D63F"
		
	  },
	  "& .Mui-selected": {
		color: "#016b81",
		background:"#E7D63F"
		
	  }
	  
	}
  }));
  const classesPagination = useStyles();
  
  const [page, setPage] = useState(1);

  const PER_PAGE = 5;

  const handleChange = (e, p) => {
		if (!isPreviousData) {
			setPage(p);
	    }
	};

  const { data: newsCounts } = useQuery('newsCounts', () => {
	return fetch("https://api.kremen.org.ua/api/cnap/news/getnewscount", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  body: `usernetwork=%3A%3A1&access_token=${contextToken}`
	}).then((r) => r.json()).then((data) => JSON.parse(data));;
  }, { staleTime: 86400 });

  let { isIdle, isLoading, isError, error, data: newsInfo, isPreviousData, }
   = useQuery(['newsPage', page], () => {
	return fetch("https://api.kremen.org.ua/api/cnap/news/getnewspage", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  body: `page=${page-1}&pagesize=${PER_PAGE}&
	  totalCount=${newsCounts.count}&usernetwork=%3A%3A1&access_token=${contextToken}`
	})
	  .then((r) => r.json()).then((data) => JSON.parse(data));
  }, { enabled: !!newsCounts, staleTime: 86400 });

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

  function formatNewsDate(string) {
	const d = new Date(string);
	// do not specify first parameter to get local date format automatically
	return d.toLocaleDateString("uk-UA", {
	  month: "numeric",
	  day: "numeric",
	  year: "numeric"
	  // do not add year, to make coherency with specified design in figma
	});
  }

  return (
	<div className="news">
	  <div className="wrapper">
		<div className="news-header">
		  <h1>Новини</h1>
		</div>
		<div className="news-block">
		  <div className="news-image">
		  	<Carousel>
				<Carousel.Item>
				<img
				className="d-block w-100"
				src="/img/carusel2.png"
				/>
				</Carousel.Item>
				<Carousel.Item>
				<img
				className="d-block w-100"
				src="/img/carusel1.png"
				/>
				</Carousel.Item>   
				<Carousel.Item>
				<img
				className="d-block w-100"
				src="/img/carusel3.png"
				/>
				</Carousel.Item>   
			</Carousel> 
		    </div>
		    <div className="news-list">
			{newsInfo.rows.map((e, i) => (
			  <div
				key={i}
				className="news-entry"
			  >
				<span className="news-date">
				  {formatNewsDate(e.date_public)}
				</span>
				<p className="news-title">
					<a href={"/newstextpage/" + e.id} className="news-title"> 
				  		{capitalizeFirstLetter(e.title.toLowerCase())}
                	</a>
				</p>
				
			  </div>
			))}
			<Stack spacing={2}>
				<Pagination count={Math.ceil(newsCounts.count / PER_PAGE)} 
					variant="outlined" shape="rounded" onChange={handleChange} page={page}
					classes={{ ul: classesPagination.ul }}
					/>
        	</Stack>
		  </div>
		</div>
	  </div>
	</div>
  );
}
