import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function GET(){
    const readIcon = await prisma.skill.findMany({
        
    }) 
    return Response.json(readIcon)
}

export async function POST(request:Request) {
    const { name, icon } = await request.json()
    const addIcon = await prisma.skill.create({
        data: {
            name,
            icon
        }
    })
    return Response.json(addIcon)
}
