import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getGameDetails } from "../../Api/games-api";
import Carousel from "react-bootstrap/Carousel";
import Loading from "../Loading/Loading";
import defImage from "../assets/default.jpeg";

export default function GameDetails() {
  let params = useParams();
  const [game, setGame] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    getGameDetails(params.p, (data) => {
      setGame(data);
      setLoad(false);
    });
  }, [params.p]);

  return (
    <>
      <Loading bool={load} />
      <div className="row">
        <div className="col-md-4">
        {game.thumbnail ? <img src={game.thumbnail} alt="" className="img-fluid rounded-2"/>: <img src={defImage} alt="" className="img-fluid rounded-2"/> }
          <div className="row my-2 p-2">
            <div className="col-3 p-0">
              <div className="btn btnFree btn-block">
                Free
              </div>
            </div>
            <div className="game-url col p-0">
              <a className="btn btnPlayNow btn-block w-100" href={game.game_url} target="blank">
                play now <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="h2">{game.title}</h1>
          <h2 className="h6">About {game.title}</h2>
          <p>{game.description}</p>
          {game.screenshots?.length > 1 ? (
            <Carousel variant="dark" className="my-4 carousel-games">
              {game.screenshots.map((img, index) => {
                return (
                  <Carousel.Item key={index + img.id}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          ) : game.screenshots?.length === 1 ? (
            <img alt={game.title} src={game.screenshots[0].image}></img>
          ) : (
            <></>
          )}
          <h2 className="h4 mb-3">Additional Information</h2>
          <div className="row gx-2 gy-4">
            {game.title ? (
              <div className="col-md-4">
                <div className="info-head">Title</div>
                <div className="info-body"> {game.title}</div>
              </div>
            ) : (
              <></>
            )}
            {game.developer ? (
              <div className="col-md-4">
                <div className="info-head">Developer</div>
                <div className="info-body"> {game.developer}</div>
              </div>
            ) : (
              <></>
            )}
            {game.publisher ? (
              <div className="col-md-4">
                <div className="info-head">Publisher</div>
                <div className="info-body"> {game.publisher}</div>
              </div>
            ) : (
              <></>
            )}
            {game.release_date ? (
              <div className="col-md-4">
                <div className="info-head">Release Date</div>
                <div className="info-body"> {game.release_date}</div>
              </div>
            ) : (
              <></>
            )}
            {game.genre ? (
              <div className="col-md-4">
                <div className="info-head">Genre</div>
                <div className="info-body"> {game.genre}</div>
              </div>
            ) : (
              <></>
            )}
            {game.platform ? (
              <div className="col-md-4">
                <div className="info-head">Platform</div>
                <div className="info-body"> {game.platform}</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
