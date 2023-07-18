'use client'

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = (
    {children}
) => {

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if(!hasMounted) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
};

export default ClientOnly;

/* This component serves as a wrapper to every component we want to protect from the runtime error */