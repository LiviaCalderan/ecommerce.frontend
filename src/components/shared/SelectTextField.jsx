import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

const SelectTextField = ({
    id,
    label,
    selectedObject,
    setSelectValue,
    lists = []
}) => {
    return (
        <Listbox value={selectedObject} onChange={setSelectValue}>
            <div className='flex flex-col gap-1.5 w-full'>
                <label htmlFor={id}
                    className={"text-[10px] uppercase tracking-widest font-semibold text-zinc-400"}>
                    {label}
                </label>

                <div className="relative">
                    <ListboxButton
                        className={`relative text-sm py-2 rounded-md border border-gray-200 w-full cursor-default bg-white text-left text-black sm:text-sm sm:leading-6`}>
                        <span className='block truncate ps-2'>{selectedObject?.categoryName}</span>
                    </ListboxButton>
                    <ListboxOptions
                        transition
                        className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-md ring-1 ring-black/20 focus:outline-hidden">
                        {lists?.map((category) => (
                            <ListboxOption key={category.id} value={category} className="group relative cursor-default  py-2 pl-3 pr-9 data-focus:bg-gray-200">
                                {category.categoryName}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>

            </div>
        </Listbox >
    )
}

export default SelectTextField
