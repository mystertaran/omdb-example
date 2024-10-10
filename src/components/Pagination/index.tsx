import React from "react";

interface PaginationProps {
    currentPage: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalResults, onPageChange}) => {
    const totalPages = Math.ceil(totalResults / 10);
    const pages = [];

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-8">
            <button
                className="px-3 py-1 mx-1 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-1 mx-1 rounded-md ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-3 py-1 mx-1 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
