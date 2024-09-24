// lib/gtag.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagConfig = {
  [key: string]: unknown;
  anonymize_ip?: boolean;
  page_path?: string;
  send_page_view?: boolean;
};

type GtagEventParams = {
  [key: string]: unknown;
  event_category?: string;
  event_label?: string;
  value?: number;
};

type GtagFunction = {
  (command: "config", targetId: string, config?: GtagConfig): void;
  (command: "event", eventName: string, eventParams?: GtagEventParams): void;
  (command: "js", date: Date): void;
};

declare global {
  interface Window {
    gtag: GtagFunction;
  }
}

// Function to log the pageview with their URL
export const pageview = (url: string): void => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Function to log specific events
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
