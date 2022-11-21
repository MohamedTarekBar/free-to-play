import React from "react";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import defImage from "../assets/default.jpeg";
import { Link } from "react-router-dom";
import { BsWindow, BsWindows } from "react-icons/bs";

export default function GameCard(props) {
  const [game, setGame] = useState({
    id: 0,
    image: defImage,
    title: "...",
    short_description: "...",
    genere: "...",
    os: "...",
  });

  useEffect(() => {
    let game = props.game;
    setGame({
      id: game.id,
      image: game.thumbnail,
      title: game.title,
      short_description: game.short_description.substring(0,25).concat('...'),
      genere: game.genre,
      os: game.platform,
    });
  }, [props.game]);

  return (
    <Link to={`/gameDetails/${game.id}`}>
      <Card className="bg-transparent text-white game-details">
        <Card.Img variant="top" src={game.image} />
        <Card.Body className="body">
          <Card.Title className="title">{game.title}</Card.Title>
          <Card.Text className="desc">{game.short_description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <div className="d-flex justify-content-end align-items-center gap-2">
            {game.os.includes("Browser") ? <BsWindow /> : <></>}
            {game.os.includes("Windows") ? <BsWindows /> : <></>}
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}
