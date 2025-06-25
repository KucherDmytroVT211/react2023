"use client";

const HighlightBanner = ({ show, children }) => {
    if (!show) return null;
    return (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-6 text-center font-semibold">
            {children}
        </div>
    );
};

export default HighlightBanner; 