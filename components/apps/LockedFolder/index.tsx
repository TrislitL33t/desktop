// src/components/apps/LockedFolder/index.tsx

import React, { type FC } from "react";
import StyledLockedFolder from "components/apps/LockedFolder/StyledLockedFolder";
import useLockedFolder from "components/apps/LockedFolder/useLockedFolder";
import AppContainer from "components/system/Apps/AppContainer";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";

const LockedFolder: FC<ComponentProcessProps> = ({ id }) => (
  <AppContainer
    StyledComponent={StyledLockedFolder}
    id={id}
    useHook={useLockedFolder}
  >
    <iframe
      className="lockedfolder-iframe"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      src="https://lockedfolderapp.vercel.app/"
      title="Locked Folder"
      allowFullScreen
    />
  </AppContainer>
);

export default LockedFolder;
