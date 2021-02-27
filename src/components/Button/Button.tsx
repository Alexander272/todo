import React from 'react'
import classes from './button.module.scss'

type Props = {
    text: string
    type: string
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const Button: React.FC<Props> = ({ text, type, onClick }) => {
    return (
        <div onClick={onClick} className={[classes[type], classes.btn].join(' ')}>
            <p>{text}</p>
        </div>
    )
}
