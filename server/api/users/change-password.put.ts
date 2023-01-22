import { AuthData } from "~~/interfaces/authData"
import { initialize } from "~~/server/database/data-source"
import bcrypt from 'bcrypt'
import { userRepository } from "~~/server/database/repositories/user.repository"

export default defineEventHandler(async(event)=>{

    const authData: AuthData = event.context.auth

    if(!authData.auth || !authData.isAdmin){
        throw createError({
            statusCode:403,
            statusMessage:'No esta autorizado'
        })
    }

    const body : {password:string,id:number} = await readBody(event)

    const password = bcrypt.hashSync(body.password,15)

    await initialize()

    const user = await userRepository.preload({id:body.id,password})

    if(!user){
        throw createError({
            statusCode:404,
            statusMessage:'No existe el usuario'
        })
    }

    await userRepository.save(user)

    return {...user,password:undefined}

})