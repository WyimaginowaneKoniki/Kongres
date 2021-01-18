import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function Search(props) {
  const style = makeStyles({
    main: {
      padding: "2%",
      margin: "auto",
      marginTop: "10px",
      width: "95%",
      height: "25px",
      border: "2px solid grey",
      borderRadius: "5px",
    },
    searchIcon: {
      float: "left",
      padding: "1%",
      paddingLeft: "2%",
    },
    search: {
      width: "70%",
      textAlign: "left",
      float: "left",
    },
    inputSearch: {
      width: "130%",
      margin: "auto",
    },
  })();

  return (
    <div className={style.main}>
      <div className={style.searchIcon}>
        <SearchIcon />
      </div>
      <div className={style.search}>
        <InputBase placeholder="Search…" className={style.inputSearch} />
      </div>
    </div>
  );
}
