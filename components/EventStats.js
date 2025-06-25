"use client";

const EventStats = ({ events }) => {
    return (
        <div className="mb-4 text-sm text-gray-700 text-center">
            <strong>Total events:</strong> {events.length}
        </div>
    );
};

export default EventStats; 