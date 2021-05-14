import { Usuario } from "./usuario";

export interface Professor extends Usuario {
    
}

export class Professor {
    constructor(public email?: string, senha?: string, nome?: string, tipo?: number, id?: Number){}
}