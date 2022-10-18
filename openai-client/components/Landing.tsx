import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../helpers/api";

const Landing = () => {
  const [prompt, setPrompt] = useState("");
  const [tagline, setTagline] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting: ", prompt);
    const response = await axios.get(`${baseUrl}${prompt}`);
    onResult(response.data);
  };

  const onResult = (data: any) => {
    setTagline(data.tagline);
    setKeywords(data.keywords);
    setHasFetched(true);
  };

  let resultsElement = null;

  if (hasFetched) {
    resultsElement = (
      <div>
        Here are your results:
        <div>Tagline: {tagline}</div>
        <div>Keywords: {keywords.join(", ")}</div>
      </div>
    );
  }

  return (
    <>
      <h1>Welcome</h1>
      <p>
        Tell me what your brand is about and I will generate your brand for you.
      </p>
      <input
        type="text"
        placeholder="e.g. wine"
        value={prompt}
        onChange={(event) => setPrompt(event?.currentTarget.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {resultsElement}
    </>
  );
};

export default Landing;
