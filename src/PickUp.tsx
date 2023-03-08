/** @jsxImportSource @emotion/react */

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import Fuse from "fuse.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";
// import { useFormControl } from '@mui/material/FormControl';

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
  const [textPassage, setTextPassage] = useState([]);

  const [difficulty, setdifficulty] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleChangeDifficulty = (event: SelectChangeEvent) => {
    setdifficulty(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const word = value;
    console.log("Psss1");

    const fetchSentence = await fetch(
      `http://localhost:3001/posts?school=${difficulty}&${category}`
    )
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
        const times = number

        if (!times) {
          return;
        }
          
        const vals = []

        for ( let i=0; i < times; i++) {
          const val = search_words[Math.floor( Math.random() * search_words.length ) ]
          vals.push(val)
        }

        console.log(vals);
        
        // console.log(search_words[ Math.floor( Math.random() * search_words.length ) ])

        const pickUp_data = vals.map(({ item }: any) => {
          return item.en_passage;
        });
        return pickUp_data;
      });

    console.log("Psss4");

    if ( !fetchSentence) { 
      return;
    }

    if (fetchSentence.length == 0) {
      toast.error("存在しません。", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }

    setSentence(fetchSentence);

    setValue("");
    setdifficulty("");
    setCategory("");
  };

  return (
    <>
      {sentence.map((val, index): any => {
        return (
          <div key={index}>
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
          <Box
            sx={{ minWidth: 50 }}
            css={css`
              padding-top: 20px;
            `}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">not select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Select what you're looking for"
                onChange={handleChangeDifficulty}
              >
                <MenuItem value={"JHS"}>JSH</MenuItem>
                <MenuItem value={"HS"}>HS</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{ minWidth: 50 }}
            css={css`
              padding-top: 20px;
            `}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">not select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Select your defficulty"
                onChange={handleChangeType}
              >
                <MenuItem value={"no_category"}>タイプなし</MenuItem>
                <MenuItem value={"past"}>過去形</MenuItem>
                <MenuItem value={"passive"}>受動態</MenuItem>
                <MenuItem value={"superlative"}>最上級</MenuItem>
                <MenuItem value={"comparative"}>比較級</MenuItem>
                <MenuItem value={"comparative"}>比較級</MenuItem>
                <MenuItem value={"gerund"}>動名詞</MenuItem>
                <MenuItem value={"infinitive"}>不定詞</MenuItem>
                <MenuItem value={"present_continuous"}>現在進行形</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField type="number" InputLabelProps={{ shrink: true }} onChange={(e: any) => setNumber(e.target.value)} css={css`margin: 10px;`} />
          <InputLabel shrink>Count</InputLabel>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </>
  );
};

export default PickUp;
