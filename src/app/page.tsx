"use client";
import "./pageStyles.css";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import { Configuration, OpenAIApi } from "openai";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

interface CheckboxValues {
  web: boolean;
  ios: boolean;
  android: boolean;
  desktop: boolean;
}

interface ITechStack {
  TechName: string;
  TechDescription: string;
  TechDocs: string;
}

export default function Home() {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [description, setDescription] = useState("");
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
    web: false,
    ios: false,
    android: false,
    desktop: false,
  });
  const [aiCompletion, setAICopmletion] = useState<ITechStack[]>([]);
  const [loading, setLoading] = useState(false);

  // Format the prompt for OpenAI API
  const formatPrompt = (description: string, values: string[]) => {
    const prompt = `I'm a developer, I want to build an app for these platforms ${values}. Recommend me tech stack to build it with including useful APIs. Give me a list in an array of objects format: [{TechName: "", TechDescription: "", "TechDocs: "link to docs"}]Description of the app: ${description}. Give me only the array, no introductory words, just the array. `;
    return prompt;
  };

  // Handle button click

  const handleButtonClick = async () => {
    setLoading(true);

    try {
      // Get the selected platforms from the checkbox values
      const trueKeysArray: string[] = Object.keys(checkboxValues).filter(
        // @ts-ignore
        (key) => checkboxValues[key]
      );

      // Check if a platform is selected
      if (trueKeysArray.length === 0) {
        toast.warn("Please select a platform", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
        return;
      }

      // Check if project description is provided
      if (description.length === 0) {
        toast.warn("Please describe your project", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
        return;
      }

      // Call OpenAI API to get tech stack recommendation
      const completion = await openai.createChatCompletion({
        model: "gpt-4o",
        messages: [
          { role: "user", content: formatPrompt(description, trueKeysArray) },
        ],
      });

      const content: string | undefined =
        completion.data.choices[0]?.message?.content;

      setLoading(false);

      if (content) {
        // Parse the content as tech stack recommendations
        const techStack: ITechStack[] = JSON.parse(content) || [];
        console.log(techStack);
        setAICopmletion(techStack);
      }
    } catch (error) {
      // Handle error
      setLoading(false);
      toast.error("Something went wrong, please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      console.log(error);
    }
  };

  return (
    <main className="main flex h-screen min-w-screen flex-col items-center justify-center">
      <div className="w-screen h-screen md:h-5/6  md:w-3/4 lg:h-5/6 lg:w-1/2 max-w-[40rem] bg-gradient-to-br from-red-500 to-fuchsia-500 via-yellow-500  p-2 md:rounded-lg shadow-xl shadow-gray-900">
        <div className="bg-black flex gap-3 flex-col justify-evenly  h-full w-full p-6 md:rounded-lg">
          <h1 className="font-semibold font-comfortaa text-transparent text-5xl bg-clip-text bg-gradient-to-r from-pink-500 via-orange-500 to-orange-700 mb-3 ">
            Stack
          </h1>

          <div className="flex flex-col items-start w-full justify-evenly">
            <Checkbox
              checkboxValues={checkboxValues}
              setCheckboxValues={setCheckboxValues}
            />
          </div>

          <div className="flex flex-col items-start mt-3 justify-evenly">
            <label
              className="block text-gray-700 font-bold mb-4 text-white"
              htmlFor="description"
            >
              Describe your project
            </label>
            <textarea
              className="resize-none border rounded-md text-black w-full h-32 p-2"
              id="description"
              name="description"
              placeholder="What are you trying to build?"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div className="w-full my-3 flex align-center justify-center">
            <div className="flex-1 h-1 border-2 border-white my-4 rounded-full"></div>
            <button
              onClick={handleButtonClick}
              className="bg-gradient-to-br mx-2 from-red-500  transition duration-150 ease-in-out via-orange-500 hover:scale-95 font-semibold to-yellow-500 rounded-lg px-5 py-2 text-white"
            >
              Get Stack
            </button>
            <div className="flex-1 border-2 border-white my-4 h-1 rounded-full"></div>
          </div>

          <div className="h-1/2 overflow-y-scroll">
            {aiCompletion.length > 0 &&
              aiCompletion.map((tech, index) => {
                return (
                  <div key={index} className="mb-9">
                    <h1 className="text-white text-xl font-semibold my-2">
                      {tech.TechName}
                    </h1>
                    <p className="text-white text-lg my-2">
                      {tech.TechDescription}
                    </p>
                    <a
                      className="text-white text-lg bg-blue-500 rounded-lg px-2 py-1 my-2 hover:bg-blue-600"
                      href={tech.TechDocs}
                    >
                      {tech.TechName} Docs
                    </a>
                  </div>
                );
              })}

            {loading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 mt-3 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}
