import "../styles.css";

export default function Header() {
  return (
    <header className="header">
      <div className="wrapper">
      <a className="whiteUrl" href="/">
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
          <h1 className="title">Центр надання адміністративних послуг</h1>
        </div>
        </a>

        <div className="numbers">
          <div className="phone">
            <img src="/img/phone.png" alt="phone" />
          </div>
          <ul>
            <li>
              <a href="tel:0523571251">(05235) 7-12-51</a>
            </li>
            <li>
              <a href="tel:0682785727">(068) 278-57-27</a>
            </li>
            <li>
              <a href="tel:0800404445">0 800 40 44 45</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
