import { AuthData } from "~~/interfaces/authData"
import { initialize } from "~~/server/database/data-source"
import { userRepository } from "~~/server/database/repositories/user.repository"


export default defineEventHandler(async(event)=>{
    const authData: AuthData = event.context.auth

    if(!authData.auth || !authData.isAdmin){
        throw createError({
            statusCode:403,
            statusMessage:'No esta autorizado'
        })
    }

    const body : {id:number} = await readBody(event)

    await initialize()

    const user = await userRepository.delete({id:body.id})

    if(user.affected === 0){
        throw createError({
            statusCode:404,
            statusMessage:'No existe el usuario'
        })
    }

    return {success:true}
})