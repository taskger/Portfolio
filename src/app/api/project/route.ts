// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()


// export async function GET(){
//     const readProject = await prisma.project.findMany({
        
//     }) 
//     return Response.json(readProject)
// }

// export async function POST(request:Request) {
//     const { name, tool, image, githublink,figmalink,demolink } = await request.json()
//     const addProject = await prisma.project.create({
//         data: {
//             name,
//             tool,
//             image,
//             githublink,
//             figmalink,
//             demolink
//         }
//     })
//     return Response.json(addProject)
// }
