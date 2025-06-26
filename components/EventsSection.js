"use client";

import { useState, useMemo, useCallback, memo } from "react";
import ThemeToggle from "./ThemeToggle";
import EventsGrid from "./EventsGrid";
import HighlightBanner from "./HighlightBanner";
import React, { Suspense, lazy } from "react";
import useHighlightColor from "./useHighlightColor";
import { useRef, useEffect } from "react";
import SuggestEventForm from "./SuggestEventForm";
import EVENTS from "../data/events";

const EventStats = lazy(() => import("./EventStats"));



const EventsSection = ({ title, highlightColor: highlightColorProp }) => {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const highlightColor = useHighlightColor(highlightColorProp);

  useEffect(() => {
    // Simulate fetching from a backend
    setLoading(true);
    const timer = setTimeout(() => {
      setEvents(EVENTS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredEvents = useMemo(() => {
    if (!query) return events;
    const lower = query.toLowerCase();
    return events.filter(
      (ev) =>
        ev.title.toLowerCase().includes(lower) ||
        ev.description.toLowerCase().includes(lower)
    );
  }, [query, events]);

  const handleSelectEvent = useCallback((id) => {
    console.log("Selected event", id);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: highlightColor }}>
          {title}
        </h1>
        <ThemeToggle />
      </div>

      <HighlightBanner show={filteredEvents.length > 3}>
        Wow! There are many charity events happening. Join and make a difference!
      </HighlightBanner>

      <Suspense fallback={<div className="mb-4 text-gray-400 text-center">Loading stats...</div>}>
        <EventStats events={filteredEvents} />
      </Suspense>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />

      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading events...</div>
      ) : (
        <EventsGrid
          events={filteredEvents}
          onSelectEvent={handleSelectEvent}
          layout="grid"
        />
      )}
      <SuggestEventForm />
    </section>
  );
};

export default memo(EventsSection);
