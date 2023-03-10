/** @jsxImportSource @emotion/react */

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { css } from "@emotion/react";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, TextField } from "@mui/material";
import Result from "./Result";
// import { useFormControl } from '@mui/material/FormControl';

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

  const [resultOpen, setResultOpen] = React.useState(false);

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
        let times;

        times = number;

        if (!times) {
          return;
        }

        const vals: any = [];

        if (search_words.length < times) {
          times = search_words.length;
        }

        // function intRandom(min: number, max: number) {
        //   return Math.floor(Math.random() * (max - min + 1) + min);
        // }

        for (let i = 0; i < times; i++) {
          while (true) {
            // const tmp = intRandom(0, times);
            const tmp = search_words[i];
            console.log(tmp);
            if (!vals.includes(tmp)) {
              vals.push(tmp);
              break;
            }
          }
          // const val =
          //   search_words[Math.floor(Math.random() * search_words.length)];
          // vals.push(val);
        }

        // console.log(vals);

        const pickUp_data = vals.map(({ item }: any) => {
          return item.en_passage;
        });
        return pickUp_data;
      });

    console.log("Psss4");

    if (!fetchSentence) {
      return;
    }

    if (fetchSentence.length == 0) {
      toast.error("?????????????????????", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    setSentence(fetchSentence);

    setValue("");
    setdifficulty("");
    setCategory("");

    if (fetchSentence.length == 0) {
      setResultOpen(false);
    } else {
      setResultOpen(true);
    }
  };

  return (
    <>
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
                <MenuItem value={"no_category"}>???????????????</MenuItem>
                <MenuItem value={"past"}>?????????</MenuItem>
                <MenuItem value={"passive"}>?????????</MenuItem>
                <MenuItem value={"superlative"}>?????????</MenuItem>
                <MenuItem value={"comparative"}>?????????</MenuItem>
                <MenuItem value={"comparative"}>?????????</MenuItem>
                <MenuItem value={"gerund"}>?????????</MenuItem>
                <MenuItem value={"infinitive"}>?????????</MenuItem>
                <MenuItem value={"present_continuous"}>???????????????</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            type="number"
            InputLabelProps={{ shrink: true }}
            onChange={(e: any) => setNumber(e.target.value)}
            css={css`
              margin: 10px;
            `}
          />
          <InputLabel shrink>Count</InputLabel>
          <Input type="submit" value="Submit" />
        </label>
      </form>

      <Result
        resultOpen={resultOpen}
        setResultOpen={setResultOpen}
        sentence={sentence}
      />
    </>
  );
};

export default PickUp;
