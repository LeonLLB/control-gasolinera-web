import jwt from 'jsonwebtoken'
import { initialize } from '../database/data-source'
import { userRepository } from '../database/repositories/user.repository'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'x-token')
    const config = useRuntimeConfig()

    if (!token) {

        event.context.auth = {
            ...event.context.auth,
            auth: false
        }

    } else {

        await initialize()

        try {
            const data = jwt.verify(token, config.jwtKey)

            const user = await userRepository.findOneBy({ id: (data as any).id })

            if (!user) throw new Error()

            event.context.auth = {
                ...event.context.auth,
                auth: true,
                isAdmin: user.isAdmin
            }
        } catch (e) {

            event.context.auth = {
                ...event.context.auth,
                auth: false
            }

        }

    }

})