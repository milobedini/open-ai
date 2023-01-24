import React from "react";
interface ResultsProps {
  prompt: string;
  tagline: string;
  keywords: string[];
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const resultSection = (label: string, body: any, extra: string) => {
    if (extra != "list") {
      return (
        <div className={extra + " bg-slate-700 p-4 my-3 rounded-md"}>
          <div className="text-slate-400 font-bold mb-4">{label}</div>
          <div>{body}</div>
        </div>
      );
    } else
      return (
        <div className="bg-teal-700  p-1 text- my-3 rounded-md px-2 text-sm">
          <div>{body}</div>
        </div>
      );
  };
  return (
    <>
      <div className="mb-6">
        {resultSection("Prompt", <>{props.prompt}</>, "text-md")}
        {resultSection("Tagline", <>{props.tagline}</>, "text-md")}
        <div className="text-slate-400 font-bold mb-4">
          <div className="text-slate-400 font-bold mb-4">Keywords</div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {props.keywords.map((keyword) =>
            resultSection("Keywords", <>{`#${keyword}`}</>, "list")
          )}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
