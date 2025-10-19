import "./App.css";
import PrayerNameAndTime from "./components/PrayerNameAndTime";
import { useEffect, useState } from "react";

function formatTime(time24) {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  let h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
}

function App() {
  const [timings, setTimings] = useState({});
  const [city, setCity] = useState("Cairo");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimings(data.data.timings);
        setDate(data.data.date.gregorian.date);
      })
      .catch((err) => console.log(err));
  }, [city]);

  return (
    <>
      <div className="parent">
        <div className="black">
          <div className="times-prayer">
            <div className="city">
              <h3>المدينة</h3>
              <select
                className="select"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value="Cairo">القاهرة</option>
                <option value="Alexandria">الإسكندرية</option>
                <option value="Giza">الجيزة</option>
                <option value="Faiyum">الفيوم</option>
                <option value="Aswan">أسوان</option>
                <option value="Luxor">الأقصر</option>
                <option value="Mansoura">المنصورة</option>
                <option value="Tanta">طنطا</option>
                <option value="Sohag">سوهاج</option>
              </select>
            </div>

            <div className="date">
              <h3>التاريخ</h3>
              <p>{date}</p>
            </div>

            {timings.Fajr ? (
              <>
                <PrayerNameAndTime
                  name={"الفجر"}
                  time={formatTime(timings.Fajr)}
                />
                <PrayerNameAndTime
                  name={"الظهر"}
                  time={formatTime(timings.Dhuhr)}
                />
                <PrayerNameAndTime
                  name={"العصر"}
                  time={formatTime(timings.Asr)}
                />
                <PrayerNameAndTime
                  name={"المغرب"}
                  time={formatTime(timings.Maghrib)}
                />
                <PrayerNameAndTime
                  name={"العشاء"}
                  time={formatTime(timings.Isha)}
                />
              </>
            ) : (
              <p>جاري تحميل البيانات...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
