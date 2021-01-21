import React from "react";
import "../App.css";
import ContactInfo from "../components/ContactInfo";
import ContactMap from "../components/ContactMap";
import email from "../images/icon-mail.png";
import phone from "../images/icon-phone.png";
import street from "../images/icon-map.png";
import github from "../images/icon-github.png";
import { makeStyles } from "@material-ui/core/styles";

export default function Contact() {
  const style = makeStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      "@media (max-width: 1000px)": {
        flexWrap: "wrap",
      },
    },
    title: {
      marginBottom: "80px",
    },
  })();

  const inf1 = {
    path: email,
    link: "mailto:conference@gmail.com",
    name: "conference@gmail.com",
    alternativeText: "Email icon",
  };

  const inf2 = {
    path: phone,
    link: "tel:987654321",
    name: "987654321",
    alternativeText: "Phone icon",
  };

  const inf3 = {
    path: street,
    name: "Kaszubska 23",
    alternativeText: "Address icon",
  };

  const inf4 = {
    path: github,
    link: "https://github.com/WyimaginowaneKoniki/Kongres",
    name: "Source Code",
    alternativeText: "Github icon",
  };

  const map = {
    path:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2549.033502782539!2d18.678003616047945!3d50.2913024794538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47113101aa09878f%3A0x2af824708446b718!2sKaszubska%2023%2C%2044-100%20Gliwice!5e0!3m2!1spl!2spl!4v1605992151813!5m2!1spl!2spl",
  };

  return (
    <div>
      <h1 className={style.title}>Contact</h1>

      <div className={style.main}>
        <div>
          <ContactInfo
            path={inf1.path}
            link={inf1.link}
            name={inf1.name}
            alternativeText={inf1.alternativeText}
          />

          <ContactInfo
            path={inf2.path}
            link={inf2.link}
            name={inf2.name}
            alternativeText={inf2.alternativeText}
          />

          <ContactInfo
            path={inf3.path}
            name={inf3.name}
            alternativeText={inf3.alternativeText}
          />

          <ContactInfo
            path={inf4.path}
            link={inf4.link}
            name={inf4.name}
            alternativeText={inf4.alternativeText}
          />
        </div>
        <ContactMap path={map.path} />
      </div>
    </div>
  );
}
