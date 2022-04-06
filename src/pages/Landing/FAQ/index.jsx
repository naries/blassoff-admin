import React from "react";
import Accordion from "./According";
import "./style.css";

export const accordionData = [
  {
    title: "Am I able to keep rights to my intellectual property completely?",
    content: `Yes, it must be original. A work is original when it is created and made with a certain degree of creativity. An idea may not be original but the mode of expression of idea is termed original.`,
  },
  {
    title:
      "Am I still able to host and distribute my podcast on multiple platforms?",
    content: `Yes, you can host and distribute your podcast on multiple platforms if did not sign an exclusive agreement with MTN Podcast`,
  },
  {
    title:
      "Will I be creating new content that will be distributed on the MTN podcast service platform?",
    content: `Creating new content to be distributed on the MTN podcast platform is optional for existing creators as your RSS feeds from other platforms is sufficient for onboarding.`,
  },
  {
    title:
      "Will there be limitations to the type of content that can be put out there?",
    content: `Yes, there are limitations to the type of content you can upload. Please refer to objectionable content in our terms and conditions.`,
  },
  {
    title:
      "Can you please provide an example of what a typical term in this partnership would look like?",
    content: `Please refer to the  terms and conditions page.`,
  },
  {
    title:
      "In the event I am looking to terminate before the end of the term, how am I able to get out of the contract?",
    content: `You may terminate your contract at any time by contacting us through the Customer Service contact form on the contact us section of our website. You can view the full terms and conditions here`,
  },
  {
    title: "Am I able to keep rights to my intellectual property completely?",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
  },
  {
    title: "Am I able to keep rights to my intellectual property completely?",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
  },
];

export const FAQ = () => {
  return (
    <div className="faq-container container">
      <div className="faq-title">Frequently Asked Questions(FAQ)</div>
      <div className="faq-accordion">
        {accordionData.map(({ title, content }) => (
          <Accordion key={Math.random} title={title} content={content} />
        ))}
      </div>
    </div>
  );
};
