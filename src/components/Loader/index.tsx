import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
