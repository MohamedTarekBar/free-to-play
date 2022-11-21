import React, { useEffect, useState } from "react";

export default function MoreGamesButton(params) {
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 0,
    games: [],
    action: () => {},
  });

  useEffect(() => {
    setPagination({
      page: params.page,
      limit: params.limit,
      games: params.games,
      action: params.action,
    });
  }, [params]);

  return (
    <div className="pagination-form d-flex flex-column align-items-end my-4">
      <div className="pages my-2">{`page ${pagination.page / pagination.limit} from ${Math.round(
        pagination.games.length / pagination.limit.toFixed()
      )}`}</div>
      <button className="btn btn-info" onClick={pagination.action}>
        {pagination.games.slice(pagination.page, pagination.games.length).length === 0
          ? "back to page 1"
          : "see more"}
      </button>
    </div>
  );
}
