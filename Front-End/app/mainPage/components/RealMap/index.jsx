'use client';
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../RealMap/realMap"), {
    ssr: false,
});

export default Map