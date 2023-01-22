import { UserDto } from "~~/server/dto/user.dto"
import bcrypt from "bcrypt"
import { userRepository } from "~~/server/database/repositories/user.repository"
import { initialize } from "~~/server/database/data-source"

export default defineEventHandler(async(event)=>{

    console.log(event.context.auth)

    if(!event.context.auth.auth || !event.context.auth.isAdmin){
        
        throw createError({
            statusCode:403,
            statusMessage:'No esta autenticado'
        })
    }

    await initialize()
    
    const body = await readBody<UserDto>(event)
    //validar data
    if(
        !body.cedula || isNaN(body.cedula) ||
        !body.password
    ) {
        throw createError({
            statusCode: 400,
            statusMessage:'Los datos enviados no son validos'
        })
    }

    //hashear contraseña
    const password = bcrypt.hashSync(body.password,15)

    const user = userRepository.create({cedula:body.cedula,password,isAdmin:body.isAdmin})
    
    try {
        await userRepository.save(user)        
        return {...user,password:undefined}        
    } catch (error: any) {
        if(error.code === '23505'){
            throw createError({
                statusCode: 400,
                statusMessage:'El usuario ya existe'
            })
        }
        throw createError({
            statusCode: 500,
            statusMessage:'No se pudo crear al usuario'
        })
    }
    
})