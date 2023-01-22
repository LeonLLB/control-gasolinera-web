import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/user.entity";

export const userRepository = AppDataSource.getRepository(Usuario)