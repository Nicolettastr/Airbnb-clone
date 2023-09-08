import prisma from '@/app/libs/prismadb'

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListing(
    params: IListingParams
) {
    try {
        const { 
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId
        }

        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        /* 

        query.NOT = { ... }: La idea detrás de esta línea de código es negar la condición siguiente, es decir, buscar todas las reservas que no cumplan con ciertos criterios.

        reservations: { some: { OR: [ ... ] } }: Esto sugiere que estás buscando reservas que cumplan con al menos una de las siguientes condiciones:

        { endDate: { gte: startDate }, startDate: { lte: startDate } }: Esta condición busca reservas donde la fecha de finalización (endDate) sea posterior o igual a startDate y la fecha de inicio (startDate) sea anterior o igual a startDate. En otras palabras, busca reservas que estén en curso en la fecha startDate.

        { startDate: { lte: endDate }, endDate: { gte: endDate } }: Esta condición busca reservas donde la fecha de inicio (startDate) sea anterior o igual a endDate y la fecha de finalización (endDate) sea posterior o igual a endDate. En otras palabras, busca reservas que estén en curso en la fecha endDate. */

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
          }));
      
          return safeListings;

    } catch(error: any) {
        throw new Error(error)
    }
}