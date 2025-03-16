import React from "react";
import ThemeButton from "../components/ThemeButton";
import ModelSelect from "./components/modelSelect";
import MapContent from "./components/mapContent";
import ResultContent from "./components/resultContent";

const mainPage = () => {
  return (
    <main className="relative min-h-screen p-4">
      <div>
        <a className="text-4xl pl-5 font-extrabold">SatXtract</a>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>

      {/* Flex container to align components */}
      <div className="flex flex-col md:flex-row items-start gap-105 mt-35 ml-15">
        <div className="mt-25">
          <ModelSelect />
        </div>
        <div className="mr-20">
          <MapContent />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-105 mt-35 ml-165">
          <ResultContent />
        </div>
    </main>
  );
};

export default mainPage;
