'use client';
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../UHIMap/uhiMap"), {
    ssr: false,
});

export default Map