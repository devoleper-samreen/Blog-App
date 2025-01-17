import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    lable,
    type = "text",
    className = "",
    placeholder,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className=''>
            {lable && <label
                className='block mb-4 text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>
                {lable}
            </label>
            }

            <input
                type={type}
                className={`px-3 text-[17px] ${className}`}
                ref={ref}
                id={id}
                placeholder={placeholder}
            />
        </div>
    )
})

export default Input