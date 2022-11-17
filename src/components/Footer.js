import "../styles.css";
import React, { useState } from "react";
import Modal from "./CustomModal";

export default function Footer() {
  const [modalActive, setActive] = useState(false);
  return (
    <footer className="footer">
      <div className="footerUp">
        <div className="wrapper">
          <div>
            <h4>Консультації</h4>
            <ul>
                <li><a className="url" href="/info">графік прийому громадян</a></li>
            </ul>
          </div>

          <div>
            <h4>Адміністративні послуги</h4>
            <ul>
                <li><a className="url" href="/online">online послуги</a></li>
                <li><a className="url" href="https://dmsu.gov.ua/services/docstate.html">перевірити стан оформлення паспорту </a></li>
            </ul>
          </div>

          <div>
            <h4>Контакти</h4>
            <ul>
              <li>
                <b>Гаряча лінія:</b>{" "} <a className="url" href="tel:0523571251">(05235) 7-12-51</a>,{" "}
                <a className="url" href="tel:0682785727">(068) 27-857-27</a>
              </li>
              <li>
                <b>Державні реєстратори з реєстрації нерухомого майна:</b>{" "}
                <a className="url" href="tel:0523572830">(05235) 7-28-30</a>
              </li>
              <li>
                <b>Адміністратори з реєстрації місця проживання:</b>{" "}
                <a className="url" href="tel:0523571800">(05235) 7-18-00</a>
              </li>
              <li>
                <b>Державні реєстратори з реєстрації бізнесу:</b>{" "}
                <a className="url" href="tel:0523570395">(05235) 7-03-95</a>
              </li>
              <li>
               <b> Електронна пошта:</b>{" "}
                <a className="url" href="mailto:cnap@olexrada.gov.ua">cnap@olexrada.gov.ua</a>,{" "}
                <a className="url" href="mailto:cnap@omvk.kr-admin.gov.ua">
                  cnap@omvk.kr-admin.gov.ua
                </a>
              </li>
              <li>
                <b>Місце розташування:</b>{" "} проспект Соборний, 59 , І–й поверх кім. 101
                – 110 {" "}
                <a
              className="contacts-map-hreaf"
              target="_blank"
              rel="noreferrer"
              href="https://goo.gl/maps/uaqcurHF6zQA3bxR7"
            >(карта)</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footerDown">
        <div className="wrapper">
          <div className="images">
            <a href="https://president.gov.ua/">
              <img src="/img/president_2.png" alt="Президент України" />
            </a>
            <a href="https://kmu.gov.ua/">
              <img src="/img/kabmin_2.png" href="/" alt="Урядовий портал" />
            </a>
            <a href="https://www.rada.gov.ua/">
              <img src="/img/rada__1__2.png" href="/" alt="Верховна Рада" />
            </a>
            <p className="diia" onClick={() => setActive(true)}>
              <img src="/img/edia_all_2.png" alt="Сервіси" />
            </p>

            <Modal active={modalActive} setActive={setActive}>
              <div className="modal_header">
                <img src="/img/dia_logo.png" alt="Dia" />
              </div>
              <div className="modal_body">
                <ul>
                  <li>
                    <a target="blank" href="https://diia.gov.ua/">
                      Державні послуги онлайн
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://center.diia.gov.ua/">
                      Платформа Центрів
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://guide.diia.gov.ua/">
                      Гід з державних послуг
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://guide.diia.gov.ua/asc/">
                      Реєстр ЦНАП
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://vzaemo.diia.gov.ua/">
                      ВзаємоДія
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://osvita.diia.gov.ua/">
                      Цифрова освіта
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://diia.data.gov.ua/">
                      Відкриті дані
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://data.gov.ua/">
                      Портал відкритих даних
                    </a>
                  </li>
                  <li>
                    <a target="blank" href="https://business.diia.gov.ua/">
                      Бізнес
                    </a>
                  </li>
                  <li>
                    {" "}
                    <a target="blank" href="https://paperless.diia.gov.ua/">
                      Paperless
                    </a>
                  </li>
                </ul>
              </div>
              <div className="modal_footer"></div>
            </Modal>

            <a href="https://olexrada.gov.ua/">
              <img src="/img/gerb_2.png" alt="Олександрійська міська рада" />
            </a>
            <a href="https://igov.org.ua/">
              <img src="/img/igov_2.png" alt="iGov" />
            </a>
          </div>
          <p>© Веб-портал ЦНАп м. Олександрія, 2022</p>
        </div>
      </div>
    </footer>
  );
}
