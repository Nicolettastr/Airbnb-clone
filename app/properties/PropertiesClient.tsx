'use client'

import { Listing } from "@prisma/client";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    console.log('propertiesClient', listings)
    
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

            const listingParams = listings.map((listing: any) =>{
                
                if(listing.id === id){
                    axios.delete(`/api/listings/${listing.id}`)
                    .then(() => {
                        toast.success('Listing deleted');
                        router.refresh();
                    })
                    .catch((error) => {
                        toast.error(error?.response?.data?.error)
                    })
                    .finally(() => {
                        setDeletingId('');
                    })
                }

            });

            return listingParams;            
            
      }, [router]);

    return (
        <Container>
            <Heading
                title="Propperties"
                subtitle="List of your properties"
            />
            <div className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
             >
                {listings.map((listing: any) => (
                    <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Delete Property"
                    currentUser={currentUser}
                    />
                    ))}
            </div>
        </Container>
    )
};

export default PropertiesClient;