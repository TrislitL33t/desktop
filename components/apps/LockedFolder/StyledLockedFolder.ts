// src/components/apps/LockedFolder/StyledLockedFolder.tsx

import styled from "styled-components";

const StyledLockedFolder = styled.div`
  background-color: #f0f0f0; /* Folder background color */
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 20%);
  display: flex;
  flex-direction: column;
  height: 600px;
  left: 10px;
  position: absolute;
  top: 10px;
  width: 700px;

  .lockedfolder-header {
    align-items: center;
    background-color: #4a90e2; /* Header color */
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    color: white;
    cursor: move; /* For dragging the window */
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .lockedfolder-title {
    font-size: 1rem;
    font-weight: bold;
  }

  .lockedfolder-close-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
  }

  .lockedfolder-content {
    background-color: white;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .lockedfolder-iframe {
    border: none;
    height: 100%;
    width: 100%;
  }

  .loading-spinner {
    color: #555;
    font-size: 1.2rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default StyledLockedFolder;
