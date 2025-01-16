import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    lable,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {lable && <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={id}>
                {lable}
            </label>
            }

            <input
                type={type}
                className={`px-3 ${className}`}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input