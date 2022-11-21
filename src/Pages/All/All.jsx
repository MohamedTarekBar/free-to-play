import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllGames } from "../../Api/games-api";
import GameCard from "../GameCard/GameCard";
import Loading from "../Loading/Loading";
import MoreGamesButton from '../MoreGamesButton/MoreGamesButton';

export default function All() {
  const limit = 20;
  const [games, setGames] = useState([]);
  const [gamesPaginated, setGamesPaginated] = useState([]);
  const [page, setPage] = useState(limit);
  const [load, setLoad] = useState(true);

  function getGames() {
    setLoad(true)
    getAllGames((data) => {
      setGames(data);
      setGamesPaginated(data.slice(0, limit));
      setLoad(false)
    });
  }

  function seeMoreButtonTapped() {
    if (games.slice(page, page + limit).length === limit) {
      setGamesPaginated(games.slice(page, page + limit));
      setPage(page + limit);
    } else {
      if(games.slice(page, games.length).length !== 0) {
        setGamesPaginated(games.slice(page, games.length));
        setPage(page + limit)
      } else {
        setGamesPaginated(games.slice(0,limit));
        setPage(limit)
      }
    }
  }

  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Loading bool={load} />
      <div className="row">
        {gamesPaginated.map((gamesPaginated, index) => {
          return (
            <div className="col-md-3" key={gamesPaginated.title + index}>
              <GameCard game={gamesPaginated} />
            </div>
          );
        })}
        <MoreGamesButton games={games} action={seeMoreButtonTapped} page={page} limit={limit}/>
      </div>
    </>
  );
}
