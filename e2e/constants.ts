import type { Locator } from "@playwright/test";

type MenuItems = Record<string, boolean | ((browserName: string) => boolean)>;

type LocatorClickProps = Parameters<Locator["click"]>[0];
type LocatorWaitForProps = Parameters<Locator["waitFor"]>[0];

export const RIGHT_CLICK = { button: "right" } as LocatorClickProps;
export const EXACT = { exact: true };
export const VISIBLE = { state: "visible" } as LocatorWaitForProps;
export const FORCE = { force: true };

const APP_CONTAINER_SELECTOR = "div";
const VIEWPORT_SELECTOR = "div";
const WINDOW_DRAG_SELECTOR = ".react-draggable";
const NEXT_JS_CONTAINER_SELECTOR = "body>#__next";

export const FAVICON_SELECTOR = "head>link[rel=icon]";
export const CONTEXT_MENU_SELECTOR = `${NEXT_JS_CONTAINER_SELECTOR}>nav`;
export const DESKTOP_SELECTOR = `${NEXT_JS_CONTAINER_SELECTOR}>main`;
export const BACKGROUND_CANVAS_SELECTOR = `${DESKTOP_SELECTOR}>canvas`;
export const DESKTOP_ENTRIES_SELECTOR = `${DESKTOP_SELECTOR}>ol>li`;
export const SELECTION_SELECTOR = `${DESKTOP_SELECTOR}>ol>span`;
export const TASKBAR_SELECTOR = `${DESKTOP_SELECTOR}>nav:not([style])`;
export const TASKBAR_ENTRIES_SELECTOR = `${TASKBAR_SELECTOR}>ol>li`;
export const START_BUTTON_SELECTOR = `${TASKBAR_SELECTOR}>button`;
export const START_MENU_SELECTOR = `${DESKTOP_SELECTOR}>nav[style]`;
export const WINDOW_SELECTOR = `${DESKTOP_SELECTOR}>${WINDOW_DRAG_SELECTOR}>section`;
export const WINDOW_TITLEBAR_SELECTOR = `${WINDOW_SELECTOR}>${VIEWPORT_SELECTOR}>header`;
export const WINDOW_TITLEBAR_ICON_SELECTOR = `${WINDOW_TITLEBAR_SELECTOR}>button>figure>picture`;
export const FILE_EXPLORER_NAV_SELECTOR = `${WINDOW_SELECTOR}>${VIEWPORT_SELECTOR}>${APP_CONTAINER_SELECTOR}>nav`;
export const FILE_EXPLORER_STATUS_BAR_SELECTOR = `${WINDOW_SELECTOR}>${VIEWPORT_SELECTOR}>${APP_CONTAINER_SELECTOR}>footer`;
export const FILE_EXPLORER_ENTRIES_SELECTOR = `${WINDOW_SELECTOR}>${VIEWPORT_SELECTOR}>${APP_CONTAINER_SELECTOR}>ol>li`;
export const SHEEP_SELECTOR = `${DESKTOP_SELECTOR}>div>img[src^=data]`;

export const CALENDAR_LABEL = /^Calendar$/;
export const CLOCK_LABEL = /^Clock$/;
export const FILE_EXPLORER_ADDRESS_BAR_LABEL = /^Address$/;
export const FILE_EXPLORER_SEARCH_BOX_LABEL = /^Search box$/;
export const START_BUTTON_LABEL = /^Start$/;

export const ACCESSIBILITY_EXCEPTION_IDS = [
  "aria-allowed-role",
  "image-redundant-alt",
  "meta-viewport",
];

export const DIRECTORY_PICKER_NOT_SUPPORTED_BROWSERS = new Set([
  "webkit",
  "firefox",
]);
export const OFFSCREEN_CANVAS_NOT_SUPPORTED_BROWSERS = new Set(["webkit"]);
export const SCREEN_CAPTURE_NOT_SUPPORTED_BROWSERS = new Set(["webkit"]);

// TODO: Fix this, doesn't fail in BrowserStack
export const FILE_DRAG_TESTING_FAILS_BROWSERS = new Set(["webkit"]);

export const FILE_MENU_ITEMS = [
  /^Open$/,
  /^Open with$/,
  /^Add to archive...$/,
  /^Download$/,
  /^Cut$/,
  /^Copy$/,
  /^Create shortcut$/,
  /^Delete$/,
  /^Rename$/,
  /^Properties$/,
];
export const FOLDER_MENU_ITEMS: MenuItems = {
  "Add file(s)": true,
  "Map directory": (browserName: string): boolean =>
    !DIRECTORY_PICKER_NOT_SUPPORTED_BROWSERS.has(browserName),
  New: true,
  "Open Terminal here": true,
  Paste: true,
  Properties: true,
  Refresh: true,
  "Sort by": true,
};
export const DESKTOP_MENU_ITEMS: MenuItems = {
  ...FOLDER_MENU_ITEMS,
  Background: true,
  "Capture screen": (browserName: string): boolean =>
    !SCREEN_CAPTURE_NOT_SUPPORTED_BROWSERS.has(browserName),
  Inspect: true,
  Properties: false,
  "View page source": true,
};

// TODO: Can this all be regex, why any text? Check for ^...$
// TODO: Use TEXT/LABEL naming
// TODO: Randomize test data
export const TEST_APP_CONTAINER_APP = "Marked";
export const TEST_APP_CONTAINER_APP_TITLE = (file: string | null): string =>
  `${file || ""}.url - ${TEST_APP_CONTAINER_APP}`;

export const TEST_APP = "FileExplorer";
export const TEST_APP_TITLE = /^My PC$/;
export const TEST_APP_TITLE_TEXT = "My PC";
export const TEST_APP_ICON = /\/pc\.(webp|png)$/;

export const TEST_ROOT_FILE = /^CREDITS.md$/;
export const TEST_ROOT_FILE_TEXT = "CREDITS.md";
export const TEST_ROOT_FILE_TOOLTIP =
  /^Type: Markdown File\nSize: \d\.\d\d KB\nDate modified: \b\d{4}-\d{2}-\d{2} \d{1,2}:\d{2} (?:AM|PM)$/;

export const TEST_SEARCH = "CREDITS";
export const TEST_SEARCH_RESULT = /^CREDITS.md$/;

export const NEW_FOLDER_LABEL = /^New folder$/;
export const NEW_FILE_LABEL = /^New Text Document.txt$/;
export const NEW_FILE_LABEL_TEXT = "New Text Document.txt";

export const CLOCK_REGEX = /^(1[0-2]|0?[1-9])(?::[0-5]\d){2}\s?(AM|PM)$/;

export const BASE_APP_TITLE = "daedalOS";
export const BASE_APP_FAVICON = /^\/favicon.ico$/;
