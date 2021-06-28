import React, { useEffect } from "react";
import "../../App.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Link } from "react-router-dom";
import Information from "../../components/ScientificWork/Information";
import VersionPanel from "../../components/ScientificWork/VersionPanel";
import axios from "axios";
import { URL_API, LINKS } from "../../Constants";
import defaultPhoto from "../../images/default-avatar.png";

export default function WorkView() {
  const style = makeStyles({
    breadcrumbs: {
      textAlign: "left",
      color: "#767676",
      fontSize: "12px",
      lineHeight: "1.4em",
      marginTop: "24px",
      marginBottom: "24px",
    },
    link: {
      textDecoration: "none",
      color: "#767676",
    },
    title: {
      fontWeight: "bold",
    },
    versions: {
      marginTop: "104px",
    },
    version: {
      marginBottom: "16px",
    },
  })();

  const location = useLocation();
  const history = useHistory();

  const [workPDF, SetWorkPDF] = React.useState(null);
  const [data, setData] = React.useState({
    scientificWork: "",
    mainAuthor: "",
    versions: [],
    status: "",
    mode: "",
  });

  // Check if page is load successful
  const [isSuccessedLoad, SetIsSuccessedLoad] = React.useState(false);

  useEffect(() => {
    let id = window.location.pathname.split("/").slice(-1)[0];
    if (isNaN(id)) id = null;

    const token = localStorage.getItem("jwt");

    // get all data about scientific work with reviews
    (async () => {
      await axios
        .get(`${URL_API}/ScientificWork/${Number(id)}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          if (!resp.data.mainAuthor.photo) resp.data.mainAuthor.photo = defaultPhoto;
          setData(resp.data);
          SetIsSuccessedLoad(true);
        })
        .catch((error) => {
          console.log(error);
          history.push({
            pathname: "/",
          });
          SetIsSuccessedLoad(false);
        });
    })();

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
        })
        .catch((_) => {
          history.push({
            pathname: LINKS.PARTICIPANT_LOGIN,
          });
        });
    })();
  }, [location, history]);

  return (
    isSuccessedLoad && (
      <div>
        {data.mode === "Author" ? (
          <p className={style.breadcrumbs}>
            <Link to={LINKS.PROFILE} className={style.link}>
              My profile
            </Link>{" "}
            / <span className={style.title}>My Work</span>
          </p>
        ) : (
          <p className={style.breadcrumbs}>
            <Link to={LINKS.WORKS} className={style.link}>
              Scientific works
            </Link>{" "}
            s / <span className={style.title}>{data.scientificWork.title}</span>
          </p>
        )}

        <Information
          scientificWork={data.scientificWork}
          author={data.mainAuthor}
          status={data.status}
          mode={data.mode}
          workPDF={workPDF}
        />

        <div className={style.versions}>
          {data.mode !== "Participant" &&
            data.versions.map((version, i) => (
              <div key={i} className={style.version}>
                <VersionPanel
                  version={version}
                  mode={data.mode}
                  status={data.status}
                  authorPhoto={data.mainAuthor.photo}
                  authorName={data.mainAuthor.name}
                  scientificWorkId={data.scientificWork.id}
                />
              </div>
            ))}
        </div>
      </div>
    )
  );
}
