// src/components/apps/LockedFolder/useLockedFolder.ts

import { useEffect, useRef } from "react";
import { TRANSITIONS_IN_MILLISECONDS } from "utils/constants";
import { cleanUpGlobals, lockGlobal } from "utils/globals";
import { LOCKED_FOLDER_GLOBALS } from "components/apps/LockedFolder/constants";
import { type ContainerHookProps } from "components/system/Apps/AppContainer";
import { useProcesses } from "contexts/process";

declare global {
  interface Window {
    LockedFolder?: {
      close: () => void;
      init: () => void;
    };
  }
}
/**
 * Custom hook for managing the LockedFolder application's lifecycle.
 *
 * @param props - Properties including the unique process ID and loading state setter.
 */
const useLockedFolder = ({ id, setLoading }: ContainerHookProps): void => {
  const {
    processes: { [id]: process },
  } = useProcesses();
  const { closing } = process || {};
  const libLoadingRef = useRef<boolean>(true);

  useEffect(() => {
    if (libLoadingRef.current) {
      libLoadingRef.current = false;

      // Lock the global before initialization to prevent redefinition
      LOCKED_FOLDER_GLOBALS.forEach((globalKey) => lockGlobal(globalKey));

      // Initialize LockedFolder
      window.LockedFolder?.init();

      // Simulate loading completion
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(
    () => () => {
      if (!libLoadingRef.current && closing) {
        window.LockedFolder?.close();
        setTimeout(
          () => cleanUpGlobals(LOCKED_FOLDER_GLOBALS), // Pass the required argument
          TRANSITIONS_IN_MILLISECONDS.WINDOW
        );
      }
    },
    [closing]
  );
};

export default useLockedFolder;
