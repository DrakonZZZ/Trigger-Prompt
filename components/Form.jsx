import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

const Form = ({
  type,
  triggerData,
  setTriggerData,
  submitStage,
  handleSubmit,
}) => {
  return (
    <div className="max-w-full w-full flex-start flex-col">
      <h1 className="header_text_2 text-left text-gray-200">{type} Trigger</h1>
      <p className="desc max-w-full text-left">
        {type} and share extraordinary prompts with the world, and use this AI
        tool to bring your wildest ideas to life.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mt-10 flex flex-col gap-6"
      >
        <label className="glassmorphism">
          <span className="font-medium text-base text-gray-300">
            Category (
            <span className="text-sm m-2 text-gray-500">
              #art, #ideas, #tech
            </span>
            )
          </span>
          <input
            className="form_input"
            value={triggerData.category}
            onChange={(e) =>
              setTriggerData({ ...triggerData, category: e.target.value })
            }
            placeholder="Write your prompts/triggers here"
            required
          />
        </label>
        <label className="glassmorphism">
          <span className="font-medium text-base text-gray-300">
            AI Prompt/Trigger
          </span>
          <textarea
            className="form_textarea"
            value={triggerData.input}
            onChange={(e) =>
              setTriggerData({ ...triggerData, input: e.target.value })
            }
            placeholder="Write your prompts/triggers here"
            required
          />
        </label>
        <div className="flex justify-between mx-3 mb-5 gap-4 text-lg font-semibold">
          <Link href="/" className="flex items-center  text-gray-500">
            <BiArrowBack className="mr-1" /> Cancel
          </Link>
          <button type="submit" disabled={submitStage} className="primary_btn">
            {submitStage ? 'loading...' : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
