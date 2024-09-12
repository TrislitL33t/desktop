import { type WallpaperFunc } from "components/system/Desktop/Wallpapers/types";

const l33tWallpaper: WallpaperFunc = (el) => {
  if (!el) return;
  const wallpaperElement = el;
  wallpaperElement.style.backgroundImage = `url("System/L33t/l33twallpaper.jpeg")`;
  wallpaperElement.style.backgroundSize = "cover";
};

export default l33tWallpaper;
