import React from "react";

interface FormProps {
  prompt: string;
  setPrompt: any;
  handleSubmit: any;
  isLoading: boolean;
  charLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
  const isValid = props.prompt.length <= props.charLimit;
  const updatePrompt = (text: string) => {
    if (text.length <= props.charLimit) {
      props.setPrompt(text);
    }
  };

  let statusColor = "text-slate-400";
  let statusText = null;
  if (!isValid) {
    statusColor = "text-red-400 ";
    statusText = `Input must be less than ${props.charLimit} characters.`;
  }

  return (
    <>
      <div className="mb-6 text-slate-200">
        <p>
          Tell me what your brand is about and I will generate your brand for
          you.
        </p>
      </div>

      <input
        className="p-2 w-full rounded-md focus:outline-teal-400 text-slate-700"
        type="text"
        placeholder="e.g. wine"
        value={props.prompt}
        onChange={(event) => updatePrompt(event.currentTarget.value)}
      />
      <div className={statusColor + " flex justify-between my-2 text-sm"}>
        <div>{statusText}</div>
        <div>
          {props.prompt.length}/{props.charLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.handleSubmit}
        disabled={!isValid || props.isLoading}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
