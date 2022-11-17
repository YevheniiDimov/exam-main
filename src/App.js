import "./styles.css";
import "./modal.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { useCookies } from "react-cookie";
import { UserContext } from "./services/context";
import CircularProgress from "@mui/material/CircularProgress";
import HomePage from "./components/HomePage";
import OnlineServices from "./components/OnlineServices";
import possiblyGetToken from "./services/tokenHelper";
import AdminService from "./components/AdminService";
import AdminServiceFullInfo from "./components/AdminServiceFullInfo";
import Contacts from "./components/Contacts";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutCnap from "./components/AboutCnap";
import PublicInfo from "./components/PublicInfo";
import NewsTextPage from "./components/NewsTextPage";

export default function App(props) {
  const [cookies, setCookie] = useCookies(["cookie-name"]);
  const [token, setToken] = useState(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    // Get token for the whole app
    possiblyGetToken(cookies, setCookie, setToken, token);
  }, []);

  // token can be null until fetch is done, so show `loading...` before re-render.
  if (token === null) {
    return (
      <div>
        <h1>Loading</h1>
        <div>
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  }

  return (
	<QueryClientProvider client={queryClient}>
	  <UserContext.Provider
		value={{
			contextToken: token,
			setContextToken: (val) => setToken(val)
		}}
	  >
		<Router>
		  <div className="App">
			<Layout {...props}>
			  <Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/public" component={PublicInfo} />
				<Route exact path="/online" component={OnlineServices} />
				<Route exact path="/about" component={AboutCnap} />
				<Route exact path="/contacts" component={Contacts} />
				<Route exact path="/adminservice/:id" component={AdminService} />
				<Route exact path="/newstextpage/:id" component={NewsTextPage} />
				<Route
				  exact
				  path="/adminservicefull/:id"
				  component={AdminServiceFullInfo}
				/>

				<Route render={() => <NotFound />} />
			  </Switch>
			</Layout>
		  </div>
		</Router>
	  </UserContext.Provider>
	  <ReactQueryDevtools />
	</QueryClientProvider>
  );
}
