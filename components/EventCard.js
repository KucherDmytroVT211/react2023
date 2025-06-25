"use client";

import { useState, useCallback, memo } from "react";

const EventCard = ({ id, title, description, date, location, onSelect }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const handleSelect = useCallback(() => {
    onSelect?.(id);
  }, [id, onSelect]);

  return (
    <article
      className="flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
      onClick={handleSelect}
    >
      <header className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 ">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()} · {location}
        </p>
      </header>

      <p className="text-gray-700 text-sm  flex-1 mb-4">
        {description}
      </p>

      <button
        type="button"
        onClick={toggleLike}
        className={`self-start text-sm font-medium px-3 py-1 rounded-lg transition-colors hover:opacity-90 ${
          liked
            ? "bg-red-100 text-red-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {liked ? "♥ Liked" : "♡ Like"}
      </button>
    </article>
  );
};

export default memo(EventCard);
