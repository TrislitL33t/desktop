// types/global.d.ts

export {};

declare namespace Gtag {
  interface Config {
    [key: string]: unknown;
    anonymize_ip?: boolean;
    page_path?: string;
    send_page_view?: boolean;
  }

  interface EventParams {
    [key: string]: unknown;
    event_category?: string;
    event_label?: string;
    value?: number;
  }
}

type GtagFunction = {
  (command: "config", targetId: string, config?: Gtag.Config): void;
  (command: "event", eventName: string, eventParams?: Gtag.EventParams): void;
  (command: "js", date: Date): void;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: GtagFunction;
  }
}
