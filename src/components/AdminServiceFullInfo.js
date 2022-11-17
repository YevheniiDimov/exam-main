import "../styles.css";
import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../services/context";
import { useQuery } from "react-query";
// Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function AdminServiceFullInfo(props) {
	const { contextToken /*, setContextToken*/ } = useContext(UserContext);
	const id = props.match.params.id;

	const firebaseConfig = {
		apiKey: "AIzaSyAZW8lus99RVfO8rKTs-9qVYJxcN0aPDf4",
		authDomain: "cnap-85c96.firebaseapp.com",
		projectId: "cnap-85c96",
		storageBucket: "cnap-85c96.appspot.com",
		messagingSenderId: "377205788530",
		appId: "1:377205788530:web:72bdaf7721aae0930ad7eb",
		measurementId: "G-SQZXN3CR25"
	};
	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);

	const { data: serviceBasicInfo } = useQuery('serviceFullInfo', () => {
		return fetch("https://api.kremen.org.ua/api/cnap/metadata/getquestion", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `idtoap=${id}&full=1&access_token=${contextToken}`
		})
			.then((r) => r.json())
			.then((data) => {
				data = JSON.parse(data);
				if (data.error) {
					console.log("Error in getting AdminServices:", data);
					throw new Error(data.error);
				}
				return data.item;
			})
	}, { staleTime: 86400 });

	const { isIdle, isLoading, isError, error, data: serviceDescription } = useQuery('apToDesc', () => {
		return fetch("https://api.kremen.org.ua/api/cnap/metadata/gettoapdesc", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `access_token=${contextToken}&idtoap=${serviceBasicInfo.id_toap}`
		})
			.then((r) => r.json())
			.then((data) => {
				data = JSON.parse(data);
				if (!data.success) return;
				const nodeTextarea = document.createElement("textarea");
				if (data.territory) {
					nodeTextarea.innerHTML = data.territory;
					data.territory = nodeTextarea.innerText;
				}
				if (data.description) {
					nodeTextarea.innerHTML = data.description;
					data.description = nodeTextarea.innerText;
				}
				return data;
			})
	}, { enabled: !!serviceBasicInfo, staleTime: 86400 });

	const { data: sInfoCardLink } = useQuery('info_card', () => 
	getFileURL(serviceBasicInfo.files_ik[0].file_name), { enabled:
		 !!serviceBasicInfo, staleTime: 86400 });
	const { data: servicePrices } = useQuery('price', () => {
		if (serviceBasicInfo.files_rach) {
			return Promise.all(
				serviceBasicInfo.files_rach.map(async (file) => {
					return await getFileURL(file.file_name);
				})
			);
		}
	}, { enabled: !!serviceBasicInfo, staleTime: 86400 });
	const { data: blankLinks } = useQuery('blanks', () => {
		if (serviceBasicInfo.forms[0].files) {
			return Promise.all(
				serviceBasicInfo.forms[0].files.map(async (file) => {
					const fileURL = await getFileURL(file.file_name);
					return {[serviceBasicInfo.forms[0].dtoap_name]: fileURL};
					// return await getFileURL(file.file_name);
				})
			);
		}
	}, { enabled: !!serviceBasicInfo, staleTime: 86400 });

	/**
	 * Get file URL from Firebase storage
	 * @param {string|Array} sFileName
	 */
	function getFileURL(sFileName) {
		const fileRef = ref(storage, `files/cloud/${sFileName}`);
		return getDownloadURL(fileRef);
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
	}

	return (
		<div className="wrapper">
			<div className="adminServiceFullInfoBody">
				<div className="left-container">
					<article className="card">
						<div className="card__content">
							<h1 className="card__title">Опис послуги</h1>
							<div className="card__desc">
								<span>
									<b>Код: </b>
								</span>
								<span>{serviceBasicInfo.toap_num}</span>
								<br />
								<span>
									<b>Назва: </b>
								</span>
								<span>{serviceBasicInfo.toap_name}</span>
								<br />
								<span>
									<b>Суб'єкт надання: </b>
								</span>
								<span>{serviceBasicInfo.subjects[0].stgt_name}</span>
								<br />
								<span>
									<b>Строк надання: </b>
								</span>
								<span>{serviceBasicInfo.term}</span>
								<br />
								<span>
									<b>Платність послуги: </b>
								</span>
								<span>
									{'undefined' !== typeof servicePrices && servicePrices.length
									? servicePrices.map((e, i) => <a key={i} href={e}>переглянути </a>)
									: 'безоплатно'}
								</span>
								<br />
								{'undefined' !== typeof sInfoCardLink
								? <> <span><b>Інформаційна картка: </b></span> <a href={sInfoCardLink} target="_blank" rel="noreferrer">завантажити</a> </>
								: ''}
							</div>
						</div>
					</article>
					<article className="card">
						<div className="card__content">
							<h1 className="card__title">Територіальність</h1>
							<div className="card__desc">
								<div
									dangerouslySetInnerHTML={{
										__html: serviceDescription.territory
									}}
								></div>
							</div>
						</div>
					</article>
					<article className="card">
						<div className="card__content">
							<h1 className="card__title">Необхідні документи</h1>
							<div className="card__desc">
								<div
									dangerouslySetInnerHTML={{
										__html: serviceDescription.description
									}}
								></div>
							</div>
						</div>
					</article>
					{'undefined' !== typeof blankLinks && blankLinks.length ? (
						<article className="card">
							<div className="card__content">
								<h1 className="card__title">Бланки заяв</h1>
								{blankLinks.map((b, i) => <a key={i} href={Object.values(b)[i]}>{Object.keys(b)[i]}</a>)}
							</div>
						</article>
					) : (
						""
					)}
				</div>
				<div className="right-container">
					{+serviceBasicInfo.to_online ? (
						<article className="card">
							<div className="card__content">
								<h1 className="card__title">Онлайн послуга</h1>
								<span>
									Сервіс, що надає змогу значно швидше отримати послугу
								</span>
								<img src="/img/docs1.png" alt="doc" />
								<div>
									<a href="https://api.kremen.org.ua/site/login">
										<button className="cardBtnGreen">Подати заяву</button>
									</a>
									<a href="https://api.kremen.org.ua/site/login">
										<button className="cardBtnYellow">Відео-інструкція</button>
									</a>
								</div>
							</div>
						</article>
					) : (
						""
					)}
					{+serviceBasicInfo.toap_ch ? (
						<article className="card">
							<div className="card__content">
								<h1 className="card__title">Електронна черга</h1>
								<span>
									Сервіс, що надає змогу забронювати дату та час прийому в офісі
									ЦНАП
								</span>
								<img src="/img/cherga.png" alt="doc" />
								<a href="https://api.kremen.org.ua/site/login">
									<button className="cardBtnGreen">Зареєструватися</button>
								</a>
							</div>
						</article>
					) : (
						""
					)}

					{+serviceBasicInfo.toap_redirect === 3 ? (
						<article>Bug</article>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
