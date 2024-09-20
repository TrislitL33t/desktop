import { memo } from "react";
import defaultImage from "components/system/Taskbar/StartButton/startbutton2.png"; // Default PNG image
import hoverImage from "components/system/Taskbar/StartButton/startbuttondown2.png"; // Hover PNG image

type StartButtonIconProps = {
  isHovered: boolean;
};

const StartButtonIcon = memo(({ isHovered }: StartButtonIconProps) => (
  <img
    alt="Start Button"
    src={isHovered ? hoverImage.src : defaultImage.src} // Use '.src' if needed
    style={{ height: "32px", padding: "0px 5px 0px 5px", width: "92px" }}
  />
));
export default StartButtonIcon;
