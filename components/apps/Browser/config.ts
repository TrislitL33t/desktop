import { FAVICON_BASE_PATH } from "utils/constants";

type Bookmark = {
  icon: string;
  name: string;
  path?: string;
  url: string;
};

export const DINO_GAME = {
  icon: "/System/Icons/Favicons/dino.webp",
  name: "T-Rex Chrome Dino Game",
  path: "/Program Files/Browser/dino/index.html",
  url: "chrome://dino",
};

export const bookmarks: Bookmark[] = [
  {
    icon: FAVICON_BASE_PATH,
    name: "daedalOS",
    url: "https://dustinbrett.com/",
  },
  {
    icon: "/System/Icons/Favicons/dir.webp",
    name: "Index of /",
    url: "http://localhost/",
  },
  /* DINO_GAME,
   {
    icon: "/System/Icons/Favicons/google.webp",
    name: "Google",
    url: "https://www.google.com/webhp?igu=1",
  }, */
  {
    icon: "/System/Icons/Favicons/wikipedia.webp",
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
  },
  {
    icon: "/System/Icons/Favicons/l33t.webp",
    name: "L33TLabs",
    url: "https://www.l33tlabs.io/",
  },
  {
    icon: "/System/Icons/Favicons/hamster.webp",
    name: "Hamster Dance",
    url: "https://www.webhamster.com/",
  },
];

export const HOME_PAGE = "https://www.google.com/webhp?igu=1";

export const LOCAL_HOST = new Set(["127.0.0.1", "localhost"]);

export const NOT_FOUND =
  '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title><style>h1{display:inline;}</style></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p></body></html>';
