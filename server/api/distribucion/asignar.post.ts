import { AuthData } from "~~/interfaces/authData"
import { initialize } from "~~/server/database/data-source"
import { distribucionRepository } from "~~/server/database/repositories/distribucion.repository"
import { DistribucionDTO } from "~~/server/dto/distribucion.dto"


export default defineEventHandler(async(event)=>{
    const authData: AuthData = event.context.auth

    if(!authData.auth){
        throw createError({
            statusCode:403,
            statusMessage:'No esta autorizado'
        })
    }

    const body = await readBody<DistribucionDTO>(event)

    if(
        !body.nombre || !body.apellido || !body.modelo || !body.placa ||
        !body.cedula || !body.litraje || isNaN(body.litraje) || isNaN(body.cedula)
    ){
        throw createError({
            statusCode:400,
            statusMessage:'Datos invalidos'
        })
    }

    if(!event.context.litraje){
        throw createError({
            statusCode:403,
            statusMessage:'No se permite litraje, cliente ya ha recibido distribución'
        })
    }

    await initialize()

    const distribucion = distribucionRepository.create({...body})
    await distribucionRepository.save(distribucion)
    return distribucion
})