import "../styles.css";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavMenu from "./NavMenu";
import Modal from "./CustomModal";

export default function Layout(props) {
	const [modalActive, setActive] = useState(false);
	return (
		<div>
			<Header />

			<NavMenu {...props} />
				<div className="content">{props.children}</div>
				<p onClick={() => setActive(true)} className="questionButon">
				<img src="/img/MasageImg.png" alt="SMS" />
				<span>Задати питання</span>
				</p>
			<Footer />

			<Modal active={modalActive} setActive={setActive} size="small" bgColor="#016b81" additionalClass="ask_question">
				<div>
					<h2>Задати питання</h2>
					<form className="mt-1" id="questionForm">
					<input placeholder="Прізвище, ім’я, по батькові" type="text" id="clientName" className="form-control mt-2" />
					<input placeholder="Телефон" type="number" id="phoneNumber" className="form-control mt-2" />
					<input placeholder="Тема" type="text" id="topic" className="form-control mt-2" />
					<textarea placeholder="Зміст" type="text" id="contentMessage" className="form-control mt-2" />
					<button className="mt-2 w-100 form-control"
						onClick={(e) => {
						e.preventDefault();
						const form = document.querySelector("#questionForm"),
							alertMsg = document.createElement("p");
						form.querySelector("button").disabled = true;
						alertMsg.classList.add("notice_box");
						alertMsg.innerHTML = "Ваша заявка була відправлена!";
						form.insertAdjacentElement("beforebegin", alertMsg);
						setTimeout(() => {
							alertMsg.remove();
							form.reset();
							form.querySelector("button").disabled = false;
						}, 10000);
						}}
					>
						Відправити
					</button>
					</form>
				</div>
			</Modal>
		</div>
	);
}
