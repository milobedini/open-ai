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

  return (
    <>
      <p>
        Tell me what your brand is about and I will generate your brand for you.
      </p>

      <input
        type="text"
        placeholder="e.g. wine"
        value={props.prompt}
        onChange={(event) => updatePrompt(event.currentTarget.value)}
      />
      <div>
        {props.prompt.length}/{props.charLimit}
      </div>
      <button
        onClick={props.handleSubmit}
        disabled={!isValid || props.isLoading}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
