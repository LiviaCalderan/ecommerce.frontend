import React from 'react'

const InputField = ({
    id,
    label,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
    icon,
    validation
}) => {
    return (
        <div className='flex flex-col gap-1.5 w-full'>
            <label htmlFor={id}
                className={`${className ? className : ""
                    } text-[10px] uppercase tracking-widest font-semibold text-zinc-400`}>
                {label}
            </label>

            <div className={`flex items-center border rounded-xl px-4 h-11 gap-2.5 bg-zinc-50 focus-within:bg-white transition-colors ${errors[id]?.message ? "border-red-500" : "border-zinc-200"}`}>
                {icon}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    defaultValue={value ?? ""}
                    className={`${className ? className : ""
                        } bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none w-full h-full`}
                    {...register(id, {
                        required: { value: required, message },
                        minLength: min
                            ? { value: min, message: `Minimum ${min} characters is required` }
                            : null,
                        pattern: type === "email" ? {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid Email"
                        } : type === "url" ? {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid url"
                        } : null,

                        ...validation
                    })}

                />

            </div>
            {errors[id]?.message && (
                <p className='text-[12px] font-semibold text-red-600 mt-0'>
                    {errors[id]?.message}
                </p>
            )}

        </div>
    )
}

export default InputField
