import "../styles.css";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import Modal from "./CustomModal";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
var classNames = require("classnames");


const Search = styled("div")(({ theme }) => ({
	position: "relative",
	display: "flex",
	borderRadius: "8px",
	background: "linear-gradient(180deg, #006980 0%, #018081 100%);",
	marginTop: 20,
	marginBottom: 20,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "70%"
	}
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 1),
	height: "100%",
	color: "white",
	position: "relative",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		color: "white",
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "100%",
			"&:focus": {
				width: "100ch"
			}
		}
	}
}));

export default function NavMenu(props) {
	const pages = [
		{ name: "Головна", href: "/" },
		{ name: "Online послуги", href: "/online" },
		{ name: "Публічна інформація", href: "/public" },
		{ name: "Про ЦНАП", href: "/about" },
		{ name: "Контакти", href: "/contacts" }
	];

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [navHref, setNavHref] = useState(window.location.pathname);
	const [modalActive, setActive] = useState(false);

	let history = useHistory();
	const styleNavLink={"fontWeight":"500","fontSize":"1em","lineHeight":"22px", "color": "#008080","fontFamily":"'Noto Sans'"}

	const [authUser, setAuthUser] = useState(false);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleClickNavMenu = (event, value) => {
		setNavHref(value);

		history.push(value);
		setAnchorElNav(null);
		event.preventDefault();
	};

	const handleClickLogin = () => {
		window.open("https://api.kremen.org.ua/site/login", "_blank").focus();
	 
	};

	const handleClickLogout = () => {
		console.log("Logout");
		setAuthUser(false);
	};

	const handleClickRegistration = () => {
		console.log("Registration");
		setAuthUser(true);
	};

	const handleClickLowVision = () => {
		console.log("LowVision");
	};

	const makeSearchReq = (e) => {
		e.preventDefault();
		// CORS error again
		fetch(`https://cnap-kremen.gov.ua/poslugi/area/toapnumsrchajax?search=${e.target.querySelector('input[type="search"]').value}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
			.catch(e => console.log('Failed to fetch', e))
	};

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{authUser === false ? (
				<div>
					<MenuItem>
						<Button
							variant="contained"
							className="button"
							onClick={handleClickLogin}
						>
							Вхід
						</Button>
					</MenuItem>
					<MenuItem>
						<Button
							variant="contained"
							className="button"
							onClick={handleClickRegistration}
						>
							Реєстрація
						</Button>
					</MenuItem>
				</div>
			) : (
					<MenuItem>
						<Button
							variant="contained"
							className="button"
							onClick={handleClickLogout}
						>
							Вихід
						</Button>
					</MenuItem>
			)}
		</Menu>
	);

	return (
		<div>
			<AppBar className="topMenu" color="transparent" position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								style={{
									color: "#008080"
								}}
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" }
								}}
							>
								{pages.map((page) => (
									<MenuItem
										style={styleNavLink}
										className={classNames({
											navSelect: navHref === page.href
										})}
										key={page.name}
										onClick={(event) => handleClickNavMenu(event, page.href)}
									>
										{page.name}
									</MenuItem>
								))}
							</Menu>
						</Box>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								columnGap: "10px"
							}}
						>
							{pages.map((page) => (
								<Button
									style={styleNavLink} 
									className={classNames({
										navSelect: navHref === page.href
									})}
									key={page.name}
									onClick={(event) => handleClickNavMenu(event, page.href)}
								>
									{page.name}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 1 }}>
							<Toolbar>
								<Box sx={{ flexGrow: 1 }} />
								<Box sx={{ display: { xs: "none", md: "flex" } }}>
									<div className="buttonsContainer">
										{authUser === false ? (
											<>
												<Button
													variant="contained"
													className="button"
													onClick={handleClickLogin}
												>
													Вхід
												</Button>

												<Button
													variant="contained"
													className="button"
													onClick={handleClickRegistration}
												>
													Реєстрація
												</Button>
											</>
										) : (
											<div>
												<Button
													variant="contained"
													className="button"
													onClick={handleClickLogout}
												>
													Вихід
												</Button>
											</div>
										)}
										{/* <Button
											className="buttonsEye"
											aria-label="delete"
											onClick={handleClickLowVision}
										>
											<img src="/img/Eye.png" alt="Eye" />
										</Button> */}
										 <IconButton 
										 	onClick={() => setActive(true)} 
											 
											 aria-label="upload picture" component="label">
        									<SearchIcon fontSize="large" sx={{ color:"#006980" }} />
      										</IconButton>
										{/*<Button className="search-icon" onClick={() => setActive(true)}>&#x1F50D;</Button>*/}         
										<Modal active={modalActive} setActive={setActive} size="small" additionalClass="hide_close" >
											<form className="w-100" onSubmit={(e) => makeSearchReq(e)}>
												<input type="search" placeholder="Введіть запит" className="form-control w-100" />
												<button type="submit" className="mt-2 form-control w-100">Пошук</button>
											</form>
										</Modal>
									</div>
								</Box>
								<Box sx={{ display: { xs: "flex", md: "none" } }}>
									<IconButton
										size="large"
										aria-label="show more"
										aria-controls={mobileMenuId}
										aria-haspopup="true"
										onClick={handleMobileMenuOpen}
										style={{
											color: "#008080"
										}}
									>
										<MoreIcon />
									</IconButton>
								</Box>
							</Toolbar>

							{renderMobileMenu}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			{/* <div className="navAndSearch">
				<Search>
					<Button onClick={handleClickSearch}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
					</Button>
					<StyledInputBase
						placeholder="Пошук по сайту"
						inputProps={{ "aria-label": "Пошук по сайту" }}
					/>
				</Search>
			</div> */}
		</div>
	);
}
