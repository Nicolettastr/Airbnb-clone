'use client'


import React from 'react'
import { IconType } from "react-icons"

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from "react";
import queryString from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps>= ({
    icon: Icon, 
    label,
    selected,
}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {

        /* 3- create an empty query */
        let currentQuery = {};


        /* 2- Look trought the current params and parse them to get an object because they come in a string */
        if(params) {

            /* This is to create an object all of our current parameters. This is because we are going to have lots of parameters as search location, start and end date of when we want to go on vacations, the guest. etc. So we want to make sure that when we select parameters we take them all and that they are not being unselected */
            currentQuery = queryString.parse(params.toString());

            /* When any category box is selected the label is going to be asigned as the parent label */

            /* them we spread that currentQuery and add the label */

            const updatedQuery: any = {
                ...currentQuery,
                category: label
            }

            /* this is to remove the selected category if it was alredy selected. */

            /* 4- them we check if the new category is alredy selected, if it is, then its removed */
            if(params?.get('category') === label) {
                delete updatedQuery.category;
            }

            /* 5- we generate the url string  */

            const url = queryString.stringifyUrl({
                url: '/',
                query: updatedQuery
            }, {skipNull: true});

            router.push(url)

        }

    }, [label, params, router])

  return (
    <div
    onClick={handleClick}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
        <Icon size={26}/>
        <div 
        className="
        font-medium text-sm
        "
        >
            {label}
        </div>
    </div>
  )
}

export default CategoryBox