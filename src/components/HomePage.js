import AdminServices from "./AdminServices";
import News from "./News";

export default function HomePage() {
  return (
    <>

      <AdminServices />

      <News />

      <div className="map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBBarBHo40zymvFIzoMW9oQSuI1UbgL77M&amp;q=
                    ЦНАП%20міста%20Кременчука
                    +ЦНАП%20міста%20Кременчука%20(Крюківський%20район)
                    +Viddalene%20Roboche%20Mistse%20Tsnap%20M.%20Kremenchuka
                    &amp;language=uk"
          allowFullScreen="1"
          frameBorder="0"
          height="500px"
          loading="lazy"
        ></iframe>
      </div>

      {/* <div className="actions">
          <div>
            <img src="#" alt="Viber" />
            <p>Viber</p>
          </div>
          <div>
            <img src="#" alt="list" />
            <p>List</p>
          </div>
          <div>
            <img src="#" alt="list" />
            <p>List</p>
          </div>
          <div>
            <img src="#" alt="list" />
            <p>List</p>
          </div>
          <div>
            <img src="#" alt="list" />
            <p>List</p>
          </div>
        </div> */}
    </>
  );
}
