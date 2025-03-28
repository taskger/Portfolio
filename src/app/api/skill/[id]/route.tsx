import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export async function DELETE(request:Request) {
//     const {id} = await request.json()
//     const delIcon = await prisma.skill.deleteMany({
//         where:  {
//             id:Number(id)
//         }
//     })
//     return Response.json(delIcon)

// }
// 192.168.1.137:3000./api/skill/${id}
export async function DELETE(
    request:Request,
    {params}  :  {params: {id:string} }  
    ) {
    const postId = Number(params.id)
    const delIcon = await prisma.skill.delete({
        where:  {
            id:postId
        }
    })
    return Response.json(delIcon)

}
export async function PATCH(
    request:Request,
    {params}  :  {params: {id:string} }  
    ) {
    const patchId = Number(params.id)
    const { name, icon } = await request.json()
    const updateSkill = await prisma.skill.update({
        where:  {
            id:patchId
        },
        data:{
            name,
            icon
        }
    })
    return Response.json(updateSkill)

}