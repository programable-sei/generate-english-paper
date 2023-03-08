/** @jsxImportSource @emotion/react */

import { ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";
import ModalWindow from "./ModalWindow";
import { Toast } from "react-toastify/dist/components";

function App() {

  return (
    <>
      <div>
        <ModalWindow />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
