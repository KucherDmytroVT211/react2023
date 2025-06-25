"use client";

import { useState, useMemo, useCallback, memo } from "react";
import EventsGrid from "./EventsGrid";
import HighlightBanner from "./HighlightBanner";
import React, { Suspense, lazy } from "react";

const EventStats = lazy(() => import("./EventStats"));

const EventsSection = ({ initialEvents, title, highlightColor = "#2563eb" }) => {
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!query) return initialEvents;
    const lower = query.toLowerCase();
    return initialEvents.filter(
      (ev) =>
        ev.title.toLowerCase().includes(lower) ||
        ev.description.toLowerCase().includes(lower)
    );
  }, [query, initialEvents]);

  const handleSelectEvent = useCallback((id) => {
    console.log("Selected event", id);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ color: highlightColor }}>
        {title}
      </h1>

      <HighlightBanner show={filteredEvents.length > 3}>
        Wow! There are many charity events happening. Join and make a difference!
      </HighlightBanner>

      <Suspense fallback={<div className="mb-4 text-gray-400 text-center">Loading stats...</div>}>
        <EventStats events={filteredEvents} />
      </Suspense>

      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />

      <EventsGrid
        events={filteredEvents}
        onSelectEvent={handleSelectEvent}
        layout="grid"
      />
    </section>
  );
};

export default memo(EventsSection);
