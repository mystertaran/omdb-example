import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import SearchBar from "./index";

describe("SearchBar", () => {
    it("renders correctly", () => {
        const handleSearch = jest.fn();
        render(<SearchBar onSearch={handleSearch} />);

        expect(screen.getByPlaceholderText("Szukaj filmu...")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Rok")).toBeInTheDocument();
        expect(screen.getByText("Szukaj")).toBeInTheDocument();
    });

    it("calls onSearch with correct parameters", () => {
        const handleSearch = jest.fn();
        render(<SearchBar onSearch={handleSearch} />);

        const searchInput = screen.getByPlaceholderText("Szukaj filmu...");
        const yearInput = screen.getByPlaceholderText("Rok");
        const typeSelect = screen.getByRole("combobox");
        const searchButton = screen.getByText("Szukaj");

        fireEvent.change(searchInput, {target: {value: "Batman"}});
        fireEvent.change(yearInput, {target: {value: "2020"}});
        fireEvent.change(typeSelect, {target: {value: "movie"}});
        fireEvent.click(searchButton);

        expect(handleSearch).toHaveBeenCalledWith({
            search: "Batman",
            year: "2020",
            type: "movie"
        });
    });
});
