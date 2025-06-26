import { useMemo } from "react";

export default function useHighlightColor(preferred) {
    return useMemo(() => preferred || "#2563eb", [preferred]);
} 