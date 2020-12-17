import React from "react";
import "../App.css";
import ParagraphText from "../components/ParagraphText";

function PrivacyPolicy() {
  const paragraphs = [
    {
      heading: "What information do we collect?",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Log Data",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Security",
      content:
        "This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      heading: "Changes to this Privacy Policy",
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
      <h1>Privacy policy</h1>
      {paragraphList}
    </div>
  );
}

export default PrivacyPolicy;
