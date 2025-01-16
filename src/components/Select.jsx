import React, { useId } from 'react'
import { forwardRef } from 'react'

function Select({
    options,
    lable,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {
                lable && <label htmlFor={id} className=''>{lable}</label>
            }
            <select
                id={id}
                {...props}
                ref={ref}
                className={`px-3 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                )
                )}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)