import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Search(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #54457F4D",
      borderRadius: "4px",
      height: "40px",
      width: "100%",
    },
    searchIcon: {
      paddingLeft: "16px",
      color: "#6069A9",
    },
    input: {
      paddingLeft: "8px",
    },
  })();

  return (
    <div className={style.main}>
      <SearchIcon className={style.searchIcon} />
      <InputBase className={style.input} placeholder="Search…" />
    </div>
  );
}
