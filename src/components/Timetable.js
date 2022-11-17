export default function Timetable() {
    return (
      <div className="info">
        <div className="wrapper text-white">
          <div className="schedule">
            <h3>Графік роботи</h3>
            <table className="table text-white">
              <tbody>
                <tr>
                  <td>Понеділок</td>
                  <td>08:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Вівторок</td>
                  <td>08:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Середа</td>
                  <td>08:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Четвер</td>
                  <td>08:00 - 17:00</td>
                </tr>
                <tr>
                  <td>П’ятниця</td>
                  <td>08:00 - 17:00</td>
                </tr>
                <tr>
                  <td>Субота</td>
                  <td>вихідний день</td>
                </tr>
                <tr>
                  <td>Неділя</td>
                  <td>вихідний день</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="scheduleInfo mt-4">
            <h3>Графік прийому</h3>
            <p>
              Погоджувальна комісія, до складу якої входять представники
              підприємств, що мають на балансі мережі міста, проводять погодження
              схем розміщення земельних ділянок та ордерів на земельні роботи
              щосереди з 9.00 до 12.00 години, каб. 108.
            </p>
          </div>
        </div>
      </div>
    );
  }
  