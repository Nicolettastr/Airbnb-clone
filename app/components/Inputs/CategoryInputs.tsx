'use client'

import React from 'react'
import { IconType } from "react-icons"

interface CategoryInputsProps {
    icon: IconType;
    label: string;
    selected: boolean;
    // eslint-disable-next-line no-unused-vars
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputsProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`
    rounded-xl
    border-2
    p-2
    flex
    flex-col
    gap-2
    hover:border-black
    transition
    cursor-pointer
    ${selected ? 'border-black' : 'border-neutral-200'}
    `}
    >
        <Icon size={30} />
        <div className="font-semibold" >
            {label
            }
        </div>
    </div>
  )
}

export default CategoryInput
