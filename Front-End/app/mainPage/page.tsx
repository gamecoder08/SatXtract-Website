import React from "react";
import ThemeButton from "../components/ThemeButton";
import ModelResult from "./components/modelResult";
import MapContent from "./components/mapContent";

const MainPage = () => {
  return (
    <main className="relative min-h-screen p-4">
      <div>
        <a className="text-4xl pl-8 font-extrabold" href="../">
          SatXtract
        </a>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>
      <div className="flex flex-col md:flex-row items-start gap-105 mt-35 ml-30">
        <MapContent />
      </div>
      <div className="flex flex-col md:flex-row items-start gap-105 mt-35">
        <ModelResult />
      </div>
    </main>
  );
};

export default MainPage;
