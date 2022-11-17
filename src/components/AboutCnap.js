import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
var classNames = require("classnames");
import Info from "./Info";
import "../styles.css";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Timetable from "./Timetable";






function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

export default function AboutCnap() {
    const { contextToken /*, setContextToken*/ } = useContext(UserContext);
    const styleTabs = {"fontFamily":"'Noto Sans'","fontStyle":"normal","fontSize":"1em","lineHeight":"24px",
  "textAlign":"center","letterSpacing":"0.05em","color":"#006980","textShadow":"0px 4px 4px rgba(0, 0, 0, 0.25)"}
 

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box className="tabs" sx={{height: "100%", bgcolor: "background.paper", width: "100%" }}>
      <AppBar color="transparent" position="static">
        <Tabs
          centered
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs example"
          TabIndicatorProps={{
            title: "indicator",
            sx: { backgroundColor: "#E7D63F",height:"2px" }
          }}
        >
          <Tab style={styleTabs} label="Загальна інформація"  {...a11yProps(0)}/>
          <Tab style={styleTabs} label="Графік роботи та прийому" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel className="tab-panel-background" value={value} index={0} dir={theme.direction}>
        <Info/>
        </TabPanel>
        <TabPanel className="tab-panel-background" value={value} index={1} dir={theme.direction}>
          <Timetable/>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
