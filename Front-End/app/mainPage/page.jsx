
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
      <div className="flex flex-col items-center justify-center mt-30">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          <MapContent />
          <div>
            <div className="font-extrabold">Image Selection</div>
            <p className="min-h-[650px] mt-2 w-[400px] text-justify">
              This section has two methods of selecting the image. The first one is using the Live Map, which is built using MapLibre and Openmap
               libraries. The second one is directly uploading the satellite image. The Live Map allows you to select a specific area of interest by
                clicking on the map, while the upload option lets you choose an image file from your device. Both methods are designed to provide flexibility
                 and ease of use for users who want to analyze satellite imagery. However, UHI Map functionality is only available for the Live Map. The uploaded image
                  can be run through segmentation model and can be used to classify the image into different classes. The segmentation model is designed to identify and
                   classify different features within the image, such as land cover types, vegetation, and urban areas. This functionality is useful for users who want
                    to perform detailed analysis on specific images without relying on the Live Map interface.
            </p>
          </div>
        </div>
        <hr className="border-t-2 w-full mt-10 my-10" />
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center px-5">
            <div className=" mt-60 pl-20">
              <div className="font-extrabold">Result Area</div>
              <p className="min-h-[650px] w-[400px] text-justify">
                This is the result area. The results of the selected image will be displayed here. The results include the UHI map, NDVI map, LST map, and LSE map. The UHI map 
                shows the urban heat island effect in the selected area, while the NDVI map shows the vegetation index. The LST map shows the land surface temperature, and the LSE map shows the land surface emissivity. 
                These maps are generated using advanced algorithms from geemap and provide valuable insights into the environmental conditions of the selected area. The second tab is 
                used to run the segmentation model. The segmentation model is designed to identify and classify different features within the image, such as land cover types, vegetation, 
                and urban areas. This functionality is useful as reference who need to compare the results of UHI map and understand the reasoning behind environmental conditions in the selected area.
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
