'use client';


import React from 'react'
interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 ms:px-10 sm:px-2 px-4">{children}</div>
    )
};

export default Container;

/*The React.ReactNode type provides flexibility for defining the content
that can be passed to a component's children prop. By using this type,
it helps to ensure that the correct types are used and to catch potential
errors or mismatches in the provided children.*/

/*The React.FC<ContainerProps> part indicates that the Container component
is a function component and expects props of type ContainerProps.*/