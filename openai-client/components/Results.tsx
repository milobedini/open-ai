import React from "react";
interface ResultsProps {
  prompt: string;
  tagline: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          <div>{props.prompt}</div>
        </div>
        <div>
          <div>
            <b>Tagline</b>
          </div>
          <div>{props.tagline}</div>
        </div>

        <div>
          <b>Keywords</b>
        </div>
        <div>
          {props.keywords.map((keyword) => (
            <div key={keyword}>#{keyword}</div>
          ))}
        </div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;
