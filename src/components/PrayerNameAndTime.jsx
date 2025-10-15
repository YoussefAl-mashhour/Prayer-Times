function PrayerNameAndTime({ name, time }) {
  return (
    <div className="name-and-time">
      <div className="line"></div>
      <h4>{name}</h4>
      <p>{time}</p>
    </div>
  );
}
export default PrayerNameAndTime;
