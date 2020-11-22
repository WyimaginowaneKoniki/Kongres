import React from "react";
import "../App.css";
import ParagraphText from "../components/ParagraphText";

function CookiesPolicy() {
  const paragraph1 = {
    heading: "What information do we collect?",
    content:
      "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
  };

  const paragraph2 = {
    heading: "Log Data",
    content:
      "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
  };

  const paragraph3 = {
    heading: "Security",
    content:
      "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
  };

  const paragraph4 = {
    heading: "Cookies",
    content:
      "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site.",
  };

  const paragraph5 = {
    heading: "Contact us",
    content: "If you have questions contact us...",
  };

  return (
    <div>
      <h1>Cookies policy</h1>
      <ParagraphText heading={paragraph1.heading} content={paragraph1.content} />
      <ParagraphText heading={paragraph2.heading} content={paragraph2.content} />
      <ParagraphText heading={paragraph3.heading} content={paragraph3.content} />
      <ParagraphText heading={paragraph4.heading} content={paragraph4.content} />
      <ParagraphText heading={paragraph5.heading} content={paragraph5.content} />
    </div>
  );
}

export default CookiesPolicy;
