import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (isNaN(totalPages) || totalPages <= 0) {
        return null;
    }

    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    const getVisiblePages = () => {
        if (window.innerWidth >= 1024) {
            // Show full pagination on PC
            return pages;
        } else {
            // Show limited pagination on mobile and tablet
            const startPage = Math.max(currentPage - 2, 1);
            const endPage = Math.min(currentPage + 2, totalPages);
            return pages.slice(startPage - 1, endPage);
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-center items-center mt-6">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm">
                {/* Previous Button */}
                <button
                    className={`px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-600 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg'}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo; Previous
                </button>

                {/* Page Numbers */}
                {visiblePages.map(page => (
                    <button
                        key={page}
                        className={`px-4 py-2 border text-lg font-semibold rounded-md transition-all duration-300 ease-in-out ${currentPage === page ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 focus:ring-2 focus:ring-red-500'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    className={`px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-600 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:shadow-lg'}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next &raquo;
                </button>
            </nav>
        </div>
    );
};

export default Pagination;