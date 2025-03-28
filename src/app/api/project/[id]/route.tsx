import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// 192.168.1.137:3000./api/project/${id}
export async function DELETE(request:Request,{params}:{params:{id:string}}){
    const postId = Number(params.id)
    const delProject = await prisma.project.delete({
        where:  {
            id:postId
        }
    })
    return Response.json(delProject)

}
export async function PATCH(request:Request,{params}:{params: {id:string}}){
    const patchId = Number(params.id)
    const { name, tool, image, githublink,figmalink,demolink } = await request.json()
    const updateProject = await prisma.project.update({
        where:  {
            id:patchId
        },
        data:{
            name,
            tool,
            image,
            githublink,
            figmalink,
            demolink
        }
    })
    return Response.json(updateProject)

}