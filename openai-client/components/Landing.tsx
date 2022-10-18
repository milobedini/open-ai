import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../helpers/api";
import Form from "./Form";
import Results from "./Results";
import Image from "next/image";
import AiImage from "../images/ai.png";

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

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <div className="text-center my-8">
            <Image src={AiImage} width={60} height={60} />
            <h1 className={gradientTextStyle + ` text-3xl  font-light`}>
              Welcome
            </h1>
            <div className={gradientTextStyle}>
              To your AI branding assistant
            </div>
          </div>
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Landing;
