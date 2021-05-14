export interface Aula {
    
    id?: number;
    nome?: string;
    duracao?: number;
    idCurso?: number;
    topicos?: string[];
    
}

export class Aula {
    constructor(public id?: number, nome?: string, duracao?: number, idCurso?: number, topicos?: string){}
}