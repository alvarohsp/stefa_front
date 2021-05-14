import { Curso } from "./curso";
import { Usuario } from "./usuario";

export interface Aluno extends Usuario {

    idade: Number;
    formacao: string;
    cursos?: Curso[];
}
export class Aluno {
    constructor(public email?: string, senha?: string, nome?: string, tipo?: number, id?: Number, idade?: Number, formacao?: string, cursos?: Curso[]){}
}