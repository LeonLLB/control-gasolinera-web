import { initialize } from "~~/server/database/data-source"
import { userRepository } from "~~/server/database/repositories/user.repository"
import { LoginDto } from "~~/server/dto/user.dto"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async(event)=>{
    await initialize()

    const body = await readBody<LoginDto>(event)

    const user = await userRepository.findOneBy({cedula:body.cedula})

    if(!user){
        throw createError({
            statusCode:404,
            statusMessage: 'Cedula o clave invalida'
        })
    }

    const isPasswordValid = bcrypt.compareSync(body.password,user.password)

    if(!isPasswordValid){
        throw createError({
            statusCode:400,
            statusMessage: 'Cedula o clave invalida'
        })
    }

    const token = jwt.sign({
        id:user.id
    },process.env.JWT_KEY!,{
        expiresIn:'5h'
    })

    setCookie(event,'x-token',token,{
        httpOnly:true,
    })

    return {
        status:'success',        
    }
})