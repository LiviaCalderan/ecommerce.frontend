import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { FiArrowDown, FiArrowUp, FiRefreshCw } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const Filter = ({categories}) => {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams)
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`)
        }, 600);

        return () => {
            clearTimeout(handler);
        }
    }, [searchParams, searchTerm, navigate, pathname])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category")
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`)
        setCategory(event.target.value);
    }

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    }

    const handleClearFilters = () => {
        navigate({ pathname: window.location.pathname });
    }

    return (
        <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4 font-raleway'>

            {/* SEARCH BAR */}

            <div className='relative flex items-center 2xl:w-[450px] sm:w-[420px]'>
                <input type="text"
                    placeholder='Search Products'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border bg-gray-100 border-gray-300 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-[#1c616e]' />
                <IoMdSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>

            {/* CATEGORY SELECTION */}

            <div className='flex sm:flex-row flex-col gap-4 items-center'>
                <FormControl
                    variant='outlined'
                    size="small"
                    className="text-slte-800 border-slate-700 bg-gray-100 focus:outline-none focus:ring-[#1c616e]">
                    <InputLabel id="category-select-label" >Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className='min-w-[12] text-slate-800 border-slate-700'>
                        <MenuItem value="all">All Products</MenuItem>
                        {categories?.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BY */}

                <Tooltip title="Sorted by Price: asc">
                    <Button
                        variant='contained'
                        color='primary'
                        className='flex items-center gap-2 h-10 '
                        onClick={toggleSortOrder}>
                        Sort By
                        {sortOrder === "asc" ? (<FiArrowUp size={16} />) : (<FiArrowDown size={16} />)}
                    </Button>
                </Tooltip>
                <button
                    onClick={handleClearFilters}
                    className='flex items-center gap-2 bg-[#ae2f27] px-3 py-2 text-white rounded-md transition duration-300 ease-in shadow-md focus:outline-none'>
                    <FiRefreshCw size={16} />
                    <span className='font-semibold'>Clear Filter</span>
                </button>
            </div>

        </div>
    )
}

export default Filter