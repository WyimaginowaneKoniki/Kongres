import React from "react";
import "../App.css";
import ParagraphText from "../components/ParagraphText";

export default function CookiesPolicy() {
  const paragraphs = [
    {
      heading: "Cookie Policy for Scienture Conference",
      content:
        "This is the Cookie Policy for Scienture Conference, accessible from scientureconf.com",
    },
    {
      heading: "What Are Cookies",
      content:
        "As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality. For more general information on cookies, please read 'What Are Cookies'. Information regarding cookies from this Cookies Policy are from the Privacy Policy Generator.",
    },
    {
      heading: "How We Use Cookies",
      content:
        "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.",
    },
    {
      heading: "Disabling Cookies",
      content:
        "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the Cookies Policy Generator from CookiePolicyGenerator.com.",
    },
    {
      heading: "The Cookies We Set",
      content: "- Account related cookies" +
      "\n- If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out." +
      "\n- Login related cookies" +
      "\n- We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in." +
      "\n- Site preferences cookies" +
      "\n- In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.",
    },
    {
      heading: "Third Party Cookies",
      content:
        "In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site." +
        "\n- From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.",
    },
    {
      heading: "More Information",
      content:
        "Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site." +
        "However if you are still looking for more information then you can contact us through one of our preferred contact methods:" +
        "\n- Email: scientureconf@gmail.com",
    },
  ];

  const paragraphList = paragraphs.map((p) => (
    <ParagraphText heading={p.heading} content={p.content} />
  ));

  return (
    <div>
      <h1>Cookies policy</h1>
      {paragraphList}
    </div>
  );
}
