import React from 'react'
import classes from './switchInput.module.scss'

type Props = {
    id: string
    name: string
    placeholderTrue?: string
    placeholderFalse?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}

export const SwitchInput: React.FC<Props> = ({
    id,
    name,
    placeholderTrue,
    placeholderFalse,
    onChange,
    checked,
}) => {
    return (
        <div className={classes.container}>
            <label htmlFor={id} className={classes.switch}>
                <input
                    name={name}
                    className={classes.input}
                    id={id}
                    type="checkbox"
                    onChange={onChange}
                    checked={checked}
                />
                <div className={classes.div}>
                    <span className={classes.span} />
                </div>
            </label>
            <label htmlFor={id} className={classes.label}>
                {checked ? placeholderTrue : placeholderFalse}
            </label>
        </div>
    )
}
