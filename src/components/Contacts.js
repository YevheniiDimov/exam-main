import "../styles.css";

export default function Contacts() {
  return (
    <div className="admin-services">
      <div className="contacts">
        <div className="wrapper">
          <div className="contacts-boxInfo">
            
            <p>
              <b>
                {" "}
                Начальник управління дозвільно – погоджувальних процедур та
                адміністративних послуг міської ради, адміністратор:
              </b>
              <br />
              Яременко Світлана Петрівна, <a className="contact-url" href="tel:0523573857">(05235) 7-38-57</a>
            </p>
            
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b>
                {" "}
                Заступник начальника управління дозвільно – погоджувальних
                процедур та адміністративних послуг міської ради:
              </b>
              <br />
              Левандовська Тетяна Станіславівна, <a className="contact-url" href="tel:0523573857">(05235) 7-38-57</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b>Гаряча лінія: </b> <a className="contact-url" href="tel:0523571251">(05235) 7-12-51</a>,{" "} <a className="contact-url" href="tel:0682785727">(068) 27-857-27</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b> Державні реєстратори з реєстрації нерухомого майна: </b> <a className="contact-url" href="tel:0523572830">(05235) 7-28-30</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b> Адміністратори з реєстрації місця проживання: </b><a className="contact-url" href="tel:0523571800"> (05235) 7-18-00</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b>Державні реєстратори з реєстрації бізнесу: </b><a className="contact-url" href="tel:0523570395"> (05235) 7-03-95</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b> Електронна пошта: </b><a className="contact-url" href="mailto:cnap@olexrada.gov.ua"> cnap@olexrada.gov.ua</a>,{" "}
              <a className="contact-url" href="mailto:cnap@omvk.kr-admin.gov.ua">cnap@omvk.kr-admin.gov.ua</a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b>Місце розташування: </b> проспект Соборний, 59 , І–й поверх кім.
              101 – 110{" "}
              <a
                className="contacts-map-hreaf-page"
                target="_blank"
                rel="noreferrer"
                href="https://goo.gl/maps/uaqcurHF6zQA3bxR7"
              >
                (карта)
              </a>
            </p>
          </div>
          <div className="contacts-boxInfo">
            <p>
              <b>Поштова адреса: </b>28000, Кіровоградська обл., м. Олександрія,
              проспект Соборний, 59, Центр надання адміністративних послуг у м.
              Олександрії
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
