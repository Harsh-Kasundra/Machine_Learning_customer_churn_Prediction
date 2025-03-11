import React, { ReactNode } from "react";

const CustomeBackground = ({ children }) => {
    return (
        <>
            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full bg-[#0C0D18] z-0">
                {/* Blurred element */}
                {/* <div
                    className="absolute top-[5%] left-[50%] -translate-x-1/2 h-[20vw] w-[90vw] 
        max-w-[1000px] max-h-[100px] bg-gradient-to-r from-blue-600 to-purple-500 
        blur-[250px] opacity-60 transform-gpu"
                ></div> */}
            </div>
            {/* Foreground content */}
            <div className="relative z-10 w-full h-screen overflow-y-auto">
                {children}
            </div>
        </>
    );
};

export default CustomeBackground;
