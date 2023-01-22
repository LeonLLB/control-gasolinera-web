
export default defineEventHandler(async(event)=>{

    setCookie(event,'x-token','',{
        httpOnly:true,
    })

    return {
        status:'success',        
    }
})