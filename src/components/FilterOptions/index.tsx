import React, {useState} from "react";

interface FilterOptionsProps {
    onFilterUpdate: (filters: {year: string; type: string}) => void;
    onFilterReset: () => void;
    currentFilters: {year?: string; type?: string};
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
    onFilterUpdate,
    onFilterReset,
    currentFilters
}) => {
    const [filters, setFilters] = useState<{year: string; type: string}>({
        year: currentFilters.year || "",
        type: currentFilters.type || ""
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = () => {
        onFilterUpdate(filters);
    };

    const resetFilters = () => {
        setFilters({year: "", type: ""});
        onFilterReset();
    };

    return (
        <div className="flex flex-col md:flex-row items-center">
            <input
                type="text"
                name="year"
                placeholder="Rok"
                value={filters.year}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md mr-2 mb-2 md:mb-0"
            />
            <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md mr-2 mb-2 md:mb-0"
            >
                <option value="">Wszystkie</option>
                <option value="movie">Film</option>
                <option value="series">Serial</option>
                <option value="episode">Odcinek</option>
            </select>
            <button
                onClick={applyFilters}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
            >
                Zastosuj filtry
            </button>
            <button
                onClick={resetFilters}
                className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
                Resetuj filtry
            </button>
        </div>
    );
};

export default FilterOptions;
