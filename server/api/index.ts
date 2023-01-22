import { initialize } from "../database/data-source"


export default defineEventHandler(async (event)=> {
    await initialize()
    return {
        john: 'doe'
    }
})