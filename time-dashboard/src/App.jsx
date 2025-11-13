import { useState, useEffect } from "react";
import data from "./data.json";
import avatarMale from "./assets/avatar_male.png";

export default function App() {
  const [period, setPeriod] = useState("weekly");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadData(period);
  }, [period]);

  function loadData(selected) {
    const newCards = data.map((item) => {
      const { current, previous } = item.timeframes[selected];
      return {
        title: item.title,
        className: item.title.replace(/\s/g, ""),
        current,
        previous,
        prevTitle: selected === "daily" ? "Yesterday" : "Last Week",
      };
    });
    setCards(newCards);
  }

  return (
    <main className="dashboard">
      {/* LEFT PROFILE CARD */}
      <section className="profile-card">
        <div className="profile-top">
          <img src={avatarMale} alt="User Avatar" className="avatar" />
          <div className="profile-info">
            <p className="report-for">Report for</p>
            <h1 className="name">
              Jeremy <br /> Robson
            </h1>
          </div>
        </div>

        <div className="period-selector">
          {["daily", "weekly"].map((p) => (
            <button
              key={p}
              className={`period-btn ${period === p ? "active" : ""}`}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* RIGHT CARDS GRID */}
      <section className="cards-container">
        {cards.map((card, i) => (
          <div key={i} className={`card ${card.className}`}>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p className="hours">{card.current}hrs</p>
              <p className="previous">
                {card.prevTitle} – {card.previous}hrs
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
