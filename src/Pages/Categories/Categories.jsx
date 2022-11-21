import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getByCategory, categories } from "../../Api/games-api";
import GameCard from "../GameCard/GameCard";
import Loading from "../Loading/Loading";
import MoreGamesButton from '../MoreGamesButton/MoreGamesButton';

export default function Categories() {
  let params = useParams();
  let navigate = useNavigate();
  const limit = 20;

  const [games, setGames] = useState([]);
  const [gamesPaginated, setGamesPaginated] = useState([]);
  const [page, setPage] = useState(limit);
  const [load, setLoad] = useState(true);

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
    if (categories[params.p]) {
      setLoad(true);
      getByCategory(categories[params.p], (data) => {
        setGames(data);
        setGamesPaginated(data.slice(0, limit));
        setLoad(false);
      });
    } else {
      navigate("/");
    }
  }, [params, navigate]);

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
