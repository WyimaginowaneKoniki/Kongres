import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

export default function AboutInfo(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    left: {
      width: "50%",
      marginRight: "24px",
      textAlign: "left",
    },
    right: {
      width: "50%",
      marginLeft: "24px",
      textAlign: "left",
    },
    photo: {
      width: "100%",
    },
  })();

  const [left, SetLeft] = React.useState(null);
  const [right, SetRight] = React.useState(null);

  const infos = [
    <h2>{props.head}</h2>,
    <p>{props.text}</p>,
    <a className={style.link} href={props.link}>
      {props.adnotation}
    </a>,
  ];

  const image = (
    <img src={props.path} className={style.photo} alt={props.alternativeText} />
  );

  useEffect(() => {
    SetLeft(
      <div className={style.left}>
        {props.isImageRight || window.innerWidth < 768 ? infos : image}
      </div>
    )
    SetRight(
      <div className={style.right}>
        {props.isImageRight || window.innerWidth < 768 ? image : infos}
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[
    left,
    right,
    props.isImageRight,
    style.left,
    style.right,
  ])

  return (
    <div className={style.main}>
      <div className={style.left}>{props.isImageRight ? infos : image}</div>
      <div className={style.right}>{props.isImageRight ? image : infos}</div>
    </div>
  );
}
