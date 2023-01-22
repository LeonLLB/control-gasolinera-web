import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entities/user.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [
        Usuario
    ],
    synchronize: true,
})

const initialize = async () => {
    
    if (AppDataSource.isInitialized) {
        return
    }

    console.log('DB: Initializing DB connection')
  
    try {
      await AppDataSource.initialize()
      console.log('DB: Successfully initialized database connection')
    } catch (error) {
      console.trace('DB: Failed to initialized database', error)
      throw error
    }
  
  }
  

export {AppDataSource, initialize}