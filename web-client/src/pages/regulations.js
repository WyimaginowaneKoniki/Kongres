import React from "react";
import "../App.css";
import ParagraphText from "../components/ParagraphText";

function Regulations() {
  const paragraphs = [
    {
      heading: "Rules about conference",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Participant",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Reviewer",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Changes to Regulations",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site.",
    },
    {
      heading: "Contact us",
      content: "If you have questions contact us...",
    },
  ];

  const paragraphList = paragraphs.map(p => <ParagraphText heading={p.heading} content={p.content} />)

  return (
    <div>
      <h1>Regulations</h1>
      {paragraphList}
    </div>
  );
}

export default Regulations;
