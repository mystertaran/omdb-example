import React from "react";

interface NoResultsProps {
    onResetFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({onResetFilters}) => {
    return (
        <div className="flex justify-center items-center mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-xl font-semibold mb-4">Nie znaleziono wyników</h2>
                <p>Nie udało się znaleźć filmów spełniających kryteria wyszukiwania.</p>
                <button
                    onClick={onResetFilters}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                    Resetuj filtry
                </button>
            </div>
        </div>
    );
};

export default NoResults;
