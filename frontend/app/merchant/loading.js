"use client";

import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="loader-container">
            <Loader />
        </div>
    );
}

function Loader() {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    );
}
