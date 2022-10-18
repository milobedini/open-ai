import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../helpers/api";
import Form from "./Form";
import Results from "./Results";

const Landing = () => {
  const charLimit = 32;
  const [prompt, setPrompt] = useState("");
  const [tagline, setTagline] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log("Submitting: ", prompt);
    const response = await axios.get(`${baseUrl}${prompt}`);
    onResult(response.data);
  };

  const onResult = (data: any) => {
    setTagline(data.tagline);
    setKeywords(data.keywords);
    setHasFetched(true);
    setIsLoading(false);
  };

  const onBack = (data: any) => {
    setHasFetched(false);
    setPrompt("");
    setKeywords([]);
    setTagline("");
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasFetched) {
    displayedElement = (
      <Results
        prompt={prompt}
        tagline={tagline}
        keywords={keywords}
        onBack={onBack}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
        charLimit={charLimit}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <h1>Welcome</h1>
      {displayedElement}
    </>
  );
};

export default Landing;
