"use client";

import { useState, useMemo, useCallback, memo } from "react";
import EventCard from "./EventCard";

const EventsGrid = ({ events, onSelectEvent, layout = "grid" }) => {

  const [sortDir, setSortDir] = useState("asc");

  const toggleSortDir = useCallback(() => {
    setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
  }, []);

  const sortedEvents = useMemo(() => {
    const copy = [...events];
    copy.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return sortDir === "asc" ? aDate - bDate : bDate - aDate;
    });
    return copy;
  }, [events, sortDir]);

  const containerClassName =
    layout === "list"
      ? "space-y-4"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  if (!sortedEvents.length) {
    return (
      <section>
        <div className="text-center text-gray-500 py-8">No events found.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
        <button
          type="button"
          onClick={toggleSortDir}
          className="text-sm text-blue-600 hover:underline"
        >
          Sort by date: {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <div className={containerClassName}>
        {sortedEvents.map((ev) => (
          <EventCard
            key={ev.id}
            id={ev.id}
            title={ev.title}
            description={ev.description}
            date={ev.date}
            location={ev.location}
            onSelect={onSelectEvent}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(EventsGrid);
