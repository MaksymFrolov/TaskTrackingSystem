export interface IRole{
    id:number
    name:string
    normalizedName:string
}

export enum RolesName{
    USER = "USER",
    MANAGER = "MANAGER",
    ADMINISTRATOR = "ADMINISTRATOR"
}