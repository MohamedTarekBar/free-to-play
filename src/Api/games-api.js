import axios from "axios";

let getGameDetailsUrl =
  "https://free-to-play-games-database.p.rapidapi.com/api/game";
let getGamesUrl =
  "https://free-to-play-games-database.p.rapidapi.com/api/games";

let headers = {
  "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
};

export const platforms = {
  pc: "pc",
  browser: "browser",
};

export const sortby = {
  releaseDate: "release-date",
  popularity: "popularity",
  alphabetical: "alphabetical",
  relevance: "relevance",
};

export const categories = {
  racing: "racing",
  sports: "sports",
  social: "social",
  shooter: "shooter",
  openWorld: "open-world",
  zompie: "zombie",
  fantasy: "fantasy",
  actionRBG: "action-rpg",
  action: "action",
  flight: "flight",
  BattleRoyale: "battle-royale",
};

export async function getAllGames(cb) {
  let { data } = await axios.get(getGamesUrl, { headers: headers });
  cb(data);
}

export async function getByPlatforms(Platform, cb) {
  let { data } = await axios.get(getGamesUrl, {
    params: { "platform": Platform },
    headers: headers,
  });
  cb(data);
}

export async function getBySorting(sortby, cb) {
  let { data } = await axios.get(getGamesUrl, {
    params: { "sort-by": sortby },
    headers: headers,
  });
  cb(data);
}
export async function getByCategory(sortby, cb) {
  let { data } = await axios.get(getGamesUrl, {
    params: { "category": sortby },
    headers: headers,
  });
  cb(data);
}
export async function getGameDetails(id, cb) {
  let { data } = await axios.get(getGameDetailsUrl, {
    params: { "id": id },
    headers: headers,
  });
  cb(data);
}
