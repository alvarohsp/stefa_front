import { Aula } from "./aula";
import { Nota } from "./nota";

export interface Curso {
    id?: number; 
    nome?: string;
    descricao?: string;
    idProfessor?: number;
    aulas?: Aula[];
    notas?: Nota[];
       
}

export class Curso {
    constructor(public id?: number, nome?: string, descricao?: string, idProfessor?: number, aulas?: Aula[]){}
}