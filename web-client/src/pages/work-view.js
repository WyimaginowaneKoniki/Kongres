import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import ScienceWorkInformation from "../components/ScienceWorkInformation";
import VersionPanel from "../components/VersionPanel";
import axios from "axios";
import { URL_API } from "../Constants";
import defaultPhoto from "../images/empty-image.png"

function WorkView() {
  const styles = makeStyles({
    path: {
      width: "70%",
      padding: "2%",
      paddingLeft: "10%",
      float: "left",
      textAlign: "left",
      color: "grey",
      fontSize: "14px",
    },
    title: {
      fontWeight: "bold",
    },
    menu: {
      paddingTop: "800px",
    },
  });

  const style = styles();

  const location = useLocation();

  const [workPDF, SetWorkPDF] = useState(null);
  const [data, setData] = useState({
    scientificWork: "",
    mainAuthor: "",
    versions: [],
    status: "",
    mode: "",
  });

  useEffect(() => {
    let id = window.location.pathname.split("/").slice(-1)[0];
    if (isNaN(id)) id = null;
    console.log(location.state?.detail ? location.state?.detail : id);

    const token = localStorage.getItem("jwt");

    // get scientific work file
    (async () => {
      await axios
        .get(`${URL_API}/ScientificWork/Download/${Number(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        })
        .then((resp) => {
          const pdf = window.URL.createObjectURL(
            new Blob([resp.data], { type: "application/pdf" })
          );
          SetWorkPDF(pdf);
        });
    })();

    // get all data about scientific work with reviews
    (async () => {
      await axios
        .get(`${URL_API}/ScientificWork/${Number(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          if(!resp.data.mainAuthor.photo)
            resp.data.mainAuthor.photo = defaultPhoto; 

          setData(resp.data);
        });
    })();
  }, [location]);

  return (
    <div>
      {data.mode === "Author" ? (
        <p className={style.path}>
          My profile / <span className={style.title}>My Work</span>
        </p>
      ) : (
        <p className={style.path}>
          Scientific works /{" "}
          <span className={style.title}>{data.scientificWork.title}</span>
        </p>
      )}

      <ScienceWorkInformation
        scientificWork={data.scientificWork}
        author={data.mainAuthor}
        status={data.status}
        mode={data.mode}
        workPDF={workPDF}
      />

      <div className={style.menu}>
        {data.mode !== "Participant" && data.versions.map((version, i) => (
          <div key={i}>
            <VersionPanel
              version={version}
              mode={data.mode}
              authorPhoto={data.mainAuthor.photo}
              authorName={data.mainAuthor.name}
              scientificWorkId={data.scientificWork.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkView;
