/**
 * Centralized date and time formatting utilities for Taskify.
 * Handles localized display (e.g., WIB) vs ISO strings for data consistency.
 */

/**
 * Returns a localized, human-readable date and time string.
 * Example: "Feb 24, 2026, 9:29 AM"
 */
export function formatFullDate(date: string | Date | number): string {
    const d = new Date(date);
    return d.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

/**
 * Returns a relative time string (e.g., "just now", "5m ago").
 */
export function formatRelativeTime(date: string | Date | number): string {
    const d = new Date(date);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);

    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;

    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;

    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;

    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/**
 * Standardizes a date into a UTC ISO string for API/Database storage.
 */
export function toStandardISO(date: string | Date | number): string {
    return new Date(date).toISOString();
}

/**
 * Detects GMT/UTC date strings in text and localizes them.
 * Example: "due on Tue, 24 Feb 2026 02:29:00 GMT" -> "due on Feb 24, 2026, 9:29 AM"
 */
export function formatMessageDates(text: string): string {
    // Regex for GMT/UTC strings produced by toUTCString() or similar
    // Pattern: Day, DD Mon YYYY HH:MM:SS GMT
    const gmtRegex = /[A-Z][a-z]{2}, \d{1,2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT/g;

    return text.replace(gmtRegex, (match) => {
        try {
            return formatFullDate(match);
        } catch {
            return match;
        }
    });
}
