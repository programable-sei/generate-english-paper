import React from "react";
/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Fuse from "fuse.js";

type Text = {
  name: string;
};

interface Items {
  id: number;
  JHS: string;
  en_passage: string;
  ja_passage: string;
}

const PickUp = () => {
  const [sentence, setSentence] = useState([""]);
  const [value, setValue] = useState("");
  const [pickUpPassage, setPickUpPassage] = useState("");
  const [number, setNumber] = useState();
  const [ textPassage, setTextPassage ] = useState([])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const word = value;
    console.log("Psss1");

    const fetchSentence = await fetch(`http://localhost:3001/posts`)
      .then((data) => data.json())
      .then((json) => {
        console.log("Psss2");

        const fuse = new Fuse(json, {
          keys: ["en_passage"],
          threshold: 0.31,
        });
        const search_words = fuse.search(word);
        return search_words;
      })
      .then((search_words) => {
        console.log("Psss3");

        const pickUp_data = search_words.map(({ item }: any) => {
          return item.en_passage;
        });
        return pickUp_data;
      });


    setSentence(fetchSentence);

    setValue("");
  };

  return (
    <>
      {sentence.map((val): any => {
        return (
          <div key={val}>
            <ul
              css={css`
                list-style: none;
              `}
            >
              <li>{val}</li>
            </ul>
          </div>
        );
      })}
      <form onSubmit={handleSubmit} autoComplete="on">
        <label>
          Search:
          <input
            type="text"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <select>
            <option value="">--Please choose school's level--</option>
            <option value="JHS">中学生</option>
            <option value="HS">高校生</option>
          </select>
          <select>
            <option value="">--Please choose an option--</option>
            <option value="">指定なし</option>
            <option value="">過去形</option>
            <option value="">未来形</option>
            <option value="">現在進行形</option>
            <option value="">比較級</option>
            <option value="">最上級</option>
            <option value="">受動態</option>
            <option value="">不定詞</option>
            <option value="">動名詞</option>
            <option value="">現在完了形</option>
          </select>
          <input type="number" value={number} />
          <input type="submit" value="Submit" />
        </label>
      </form>
    </>
  );
};

export default PickUp;
