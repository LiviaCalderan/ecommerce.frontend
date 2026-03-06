import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { FiArrowUp, FiRefreshCw } from "react-icons/fi";


const Filter = () => {

    const categories = [
        { categoryId: 1, categoryName: "Eletronics" },
        { categoryId: 2, categoryName: "Smartphone" },
        { categoryId: 3, categoryName: "Furniture" },
        { categoryId: 4, categoryName: "Books" },
        { categoryId: 5, categoryName: "Bags" }
    ];

    const [category, setCategory] = useState("all Products");
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    return (
        <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4'>

            {/* SEARCH BAR */}

            <div className='relative flex items-center 2xl:w-[450px] sm:w-[420px]'>
                <input type="text"
                    placeholder='Search Products'
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
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BY */}

                <Tooltip title="Sorted by Price: asc">
                        <Button variant='contained' color='primary' className='flex items-center gap-2 h-10 '>
                            Sort By
                            <FiArrowUp size={16} />
                        </Button>
                </Tooltip>
                <button className='flex items-center gap-2 bg-[#ae2f27] px-3 py-2 text-white rounded-md transition duration-300 ease-in shadow-md focus:outline-none'>
                    <FiRefreshCw size={16}/>
                    <span className='font-semibold'>Clear Filter</span>
                </button>
            </div>

        </div>
    )
}

export default Filter