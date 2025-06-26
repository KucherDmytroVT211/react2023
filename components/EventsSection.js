"use client";

import { useState, useMemo, useCallback, memo } from "react";
import EventsGrid from "./EventsGrid";
import HighlightBanner from "./HighlightBanner";
import React, { Suspense, lazy } from "react";
import useHighlightColor from "./useHighlightColor";
import { useRef, useEffect } from "react";
import SuggestEventForm from "./SuggestEventForm";

const EventStats = lazy(() => import("./EventStats"));

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Community Food Drive",
    description:
      "Help us collect and distribute food parcels to families in need this summer.",
    date: "2025-07-05",
    location: "New York, NY",
  },
  {
    id: 2,
    title: "Beach Cleanup Day",
    description:
      "Join fellow volunteers to keep Santa Monica beach clean and beautiful.",
    date: "2025-08-12",
    location: "Santa Monica, CA",
  },
  {
    id: 3,
    title: "Charity Run 10K",
    description:
      "Run, jog, or walk to raise funds for children's hospitals across the state.",
    date: "2025-09-20",
    location: "San Francisco, CA",
  },
  {
    id: 4,
    title: "Book Donation Marathon",
    description:
      "Collect children's books for underprivileged schools and libraries.",
    date: "2025-07-25",
    location: "Boston, MA",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    description: "Donate blood and help save lives in your local community.",
    date: "2025-07-15",
    location: "Chicago, IL",
  },
];

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
      setEvents(MOCK_EVENTS);
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
