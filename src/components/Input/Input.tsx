import React from 'react'
import classes from './input.module.scss'

type Props = {
    placeholder: string
    type: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

export const Input: React.FC<Props> = ({ placeholder, type, value, onChange, name }) => {
    return (
        <div className={classes.field}>
            <input
                className={classes.input}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                required
            />
            <label htmlFor={name} className={classes.label}>
                {placeholder}
            </label>
        </div>
    )
}
