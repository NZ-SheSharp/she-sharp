"use client";

import { useEffect, useState } from "react";

interface GoogleCalendarEmbedProps {
  calendarId: string;
  apiKey?: string;
  height?: string;
  className?: string;
}

export function GoogleCalendarEmbed({ 
  calendarId, 
  apiKey,
  height = "600",
  className = "" 
}: GoogleCalendarEmbedProps) {
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    // Build the embed URL with proper parameters
    const params = new URLSearchParams({
      src: calendarId,
      ctz: "Pacific/Auckland",
      bgcolor: "#f7e5f3",
      color: "#9b2e83",
      showTitle: "0",
      showNav: "1",
      showDate: "1",
      showPrint: "0",
      showTabs: "1",
      showCalendars: "0",
      showTz: "1",
      mode: "MONTH",
      wkst: "2"
    });

    // If API key is provided, add it to the URL
    if (apiKey) {
      params.append("key", apiKey);
    }

    setEmbedUrl(`https://calendar.google.com/calendar/embed?${params.toString()}`);
  }, [calendarId, apiKey]);

  return (
    <div className="w-full">
      <iframe
        src={embedUrl}
        style={{ border: 0 }}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        className={className}
        title="She Sharp Event Calendar"
      />
    </div>
  );
}