import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client


/* We created this code because next js reloading can create a bunch of this new PrismaClient instances to be created gicing us a warning in the terminal so this way we assign a Prisma client to a globalThis variable which is not affected by hot reload. So basically this is a best practice when using next js and prisma */