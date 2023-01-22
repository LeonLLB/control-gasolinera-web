import { initialize } from "../database/data-source"
import { distribucionRepository } from "../database/repositories/distribucion.repository"
import { DistribucionDTO } from "../dto/distribucion.dto"


export default defineEventHandler(async(event)=>{

    const body = await readBody<DistribucionDTO>(event)

    if(event.path?.includes('distribucion') && body.cedula){

        await initialize()

        const lastLitraje = await distribucionRepository.findOneBy({cedula:body.cedula})

        if(lastLitraje){
            const ultimaFecha = new Date(lastLitraje.createdAt)
            const fechaActual = new Date()

            const diferencia = (fechaActual.getTime() - ultimaFecha.getTime()) / 1000 / 60 / 60 / 24
            
            event.context.litrajePermitido = diferencia >= 0.8
        } else {
            event.context.litrajePermitido = true
        }

    }    

})