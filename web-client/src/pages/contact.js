import React from 'react';
import '../App.css';
import ContactInfo from '../components/ContactInfo'
import ContactMap from '../components/ContactMap'
import picture from '../images/empty-image.png'


function Contact(props) {
  const info = [
    {
      path: picture,
      link: "mailto:conference@gmail.com",
      name: "conference@gmail.com",
      alternativeText: "Email icon"
    },
    {
      path: picture, 
      link: "tel:987654321",
      name: "987654321",
      alternativeText: "Phone icon"
    },
    {
      path: picture,
      name: "Parkowa 11/12", 
      alternativeText: "Address icon"
    },
    {
      path: picture,
      link: "https://github.com/WyimaginowaneKoniki/Kongres",
      name: "github.com/WyimaginowaneKoniki/Kongres",
      alternativeText: "Github icon"
    },
  ];

  const infoList = info.map(i => 
    <ContactInfo
      path = {i.path}
      link = {i.link}
      name = {i.name}
      alternativeText = {i.alternativeText}
    />
  )

  const map = {
    path: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2549.033502782539!2d18.678003616047945!3d50.2913024794538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47113101aa09878f%3A0x2af824708446b718!2sKaszubska%2023%2C%2044-100%20Gliwice!5e0!3m2!1spl!2spl!4v1605992151813!5m2!1spl!2spl"
  };
  
  return (
      <div>
          <h1>Contact</h1>

          <div> 
            {infoList}
            
            <ContactMap path = {map.path}/>
          </div>
      </div>  
    );
}

export default Contact;