import React, {useState} from "react";

interface SearchBarProps {
    onSearch: (params: {search: string}) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [search, setSearch] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({search});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 justify-center p-4 bg-white rounded-lg shadow-md"
        >
            <input
                type="text"
                placeholder="Szukaj filmu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Szukaj
            </button>
        </form>
    );
};

export default SearchBar;
