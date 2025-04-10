import React from "react";
import ThemeButton from "../components/ThemeButton";
<<<<<<< HEAD
<<<<<<< HEAD
import MapContent from "./components/mapContent";
import ModelResult from "./components/modelResult";
=======
import ModelSelect from "./components/modelSelect";
import MapContent from "./components/mapContent";
import ResultContent from "./components/resultContent";
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
import ModelSelect from "./components/modelSelect";
import MapContent from "./components/mapContent";
import ResultContent from "./components/resultContent";
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5

const mainPage = () => {
  return (
    <main className="relative min-h-screen p-4">
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <a className="text-4xl pl-8 font-extrabold" href="../">
          SatXtract
        </a>
=======
        <a className="text-4xl pl-5 font-extrabold">SatXtract</a>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
        <a className="text-4xl pl-5 font-extrabold">SatXtract</a>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
      </div>
      <div className="absolute top-4 right-4">
        <ThemeButton />
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="flex flex-col md:flex-row items-start gap-105 mt-35 ml-30">
        <MapContent />
      </div>
      <div>
        <ModelResult />
      </div>
=======
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5

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
<<<<<<< HEAD
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
    </main>
  );
};

export default mainPage;
