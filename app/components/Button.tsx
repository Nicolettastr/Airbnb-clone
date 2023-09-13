'use client'

import React from 'react'
import { IconType } from "react-icons";

/* interface */

interface ButtonProps {
    label: string;
    // eslint-disable-next-line no-unused-vars
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outLine?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outLine,
    small,
    icon: Icon
}) => {
  return (
    <button 
    onClick={onClick}
    disabled={disabled}
    className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    ${outLine ? 'bg-white' : 'bg-rose-500' }
    ${outLine ? 'border-black' : 'border-rose-500' }
    ${outLine ? 'text-black' : 'text-white' }
    ${small ? 'py-1' : 'py-3' }
    ${small ? 'text-sm' : 'text-md' }
    ${small ? 'font-light' : 'font-semibold' }
    ${small ? 'border-[1px]' : 'border-2' }
    `}>
        {Icon && (
            <Icon size={24}
            className="
            absolute
            left-4
            top-3
            "
            />
        )}
        {label}
        </button>
  )
}

export default Button