

export class UserDto{
    cedula!: number
    password!: string
    isAdmin = false
}

export class LoginDto{
    cedula!:number
    password!:string
}