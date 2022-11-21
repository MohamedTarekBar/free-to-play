import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../Api/games-api";
import GameCard from "../GameCard/GameCard";
import Loading from "../Loading/Loading";

export default function Home() {
  const [games, setGames] = useState([]);
  const [load, setLoad] = useState(true);

  let navigate = useNavigate();

  function browseGamesButtonTapped() {
    navigate("/all");
  }

  useEffect(() => {
    setLoad(true);
    getAllGames((data) => {
      let random = Math.floor(Math.random() * data.length);
      setGames(data.slice(random, random + 3));
      setLoad(false);
    });
  }, []);

  return (
    <>
      <Loading bool={load} />
      <div className="hero">
        <h1>Find & track the best free-to-play games!</h1>
        <p>
          Track what you've played and search for what to play next! Plus get
          free premium loot!
        </p>
        <button className="btn" onClick={browseGamesButtonTapped}>
          Browse Games
        </button>
      </div>
      <div className="container">
        <h1 className="h3">
          {" "}
          <i className="fas fa-robot mr-2"></i> Personalized Recommendations
        </h1>
        <div className="row">
          {games.map((game, index) => {
            return (
              <div className="col-md-4" key={game.title + index}>
                <GameCard game={game} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
