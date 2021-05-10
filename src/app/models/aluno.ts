import { Curso } from "./curso";
import { Usuario } from "./usuario";

export interface Aluno extends Usuario {

    idade: string;
    formacao: string;
    cursos?: Curso[];
}
