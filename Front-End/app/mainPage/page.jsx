'use client';
import React, {useState} from "react";
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
      <div className="flex flex-col items-center justify-center mt-30">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <MapContent />
          <div>
            <div className="font-extrabold">Image Selection</div>
            <p className="min-h-[650px] mt-2 w-[400px] text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
              consequuntur explicabo deserunt ea labore ipsum iusto possimus
              nesciunt debitis, ad voluptatibus rem. Possimus consequatur
              dolores quam itaque officiis voluptatum perspiciatis. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quisquam quasi nisi
              pariatur autem non assumenda ducimus maiores, doloribus
              exercitationem molestias, odit et necessitatibus ipsam magni natus
              nemo. Debitis, fugit maxime.
            </p>
          </div>
        </div>
        <hr className="border-t-2 w-full mt-10 my-10" />
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center px-5">
            <div className=" mt-60 pl-20">
              <div className="font-extrabold">Result Area</div>
              <p className="min-h-[650px] w-[400px] text-justify">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
                consequuntur explicabo deserunt ea labore ipsum iusto possimus
                nesciunt debitis, ad voluptatibus rem. Possimus consequatur
                dolores quam itaque officiis voluptatum perspiciatis. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                quasi nisi pariatur autem non assumenda ducimus maiores,
                doloribus exercitationem molestias, odit et necessitatibus ipsam
                magni natus nemo. Debitis, fugit maxime.
              </p>
            </div>
            <ModelResult />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
