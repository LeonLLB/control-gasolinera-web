import { AppDataSource } from "../data-source";
import { Distribucion } from "../entities/distribucion.entity";


export const distribucionRepository = AppDataSource.getRepository(Distribucion)