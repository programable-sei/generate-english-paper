/** @jsxImportSource @emotion/react */

import { ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";
import ModalWindow from "./ModalWindow";
import { Toast } from "react-toastify/dist/components";
import { css } from "@emotion/react";
import Paper from "./Paper";

function App() {
  return (
    <>
      <div
        css={css`
          text-align: center;
          width: 600px;
          margin: 0 auto;
        `}
      >
        <h1>英文問題用紙　ジェネレータ</h1>
        <h2>
          このサイトは検索したワードを含んだ英文を抽出してPDFとして出力するツールです
        </h2>
        <ModalWindow />
        <Paper />

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
