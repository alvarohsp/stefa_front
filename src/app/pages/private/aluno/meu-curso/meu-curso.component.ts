import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Nota } from 'src/app/models/nota';

@Component({
  selector: 'app-meu-curso',
  templateUrl: './meu-curso.component.html',
  styleUrls: ['./meu-curso.component.css']
})
export class MeuCursoComponent implements OnInit {

  usuario: Usuario;
  aluno: Aluno 
  cursos: Array <Curso>
  meusCursos: Array <Curso> = []
  curso: Curso
  notas: Nota

  constructor(private alunoService: AlunoService, private authService: AuthService, private cursoService: CursoService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    if (this.usuario.tipo != 2){
      this.router.navigate(['']);
    }

    this.alunoService.obterPorId(this.usuario.id).subscribe(user => {
      this.aluno = user

      this.cursoService.listar().subscribe(curs =>{
        this.cursos = curs
        this.listarMeusCursos();
      })
    })   
  }

  avaliarCurso(idCurso: any, nomeCurso: string) {
    const avalia = confirm (`Tem certeza que deseja o curso "${nomeCurso}" ?\nVocê só pode avaliar um curso 1 vez!`)
    if (avalia == true){
      this.cursoService.obterPorId(idCurso).subscribe(cur =>{
        this.curso = cur
        var result = prompt("Por favor insira uma nota válida de 0 a 5\nLembre-se que essa avaliação não poderá ser editada!", "5")
        if(Number(result) >= 0 && Number(result) <= 5){
          this.addNotaAoCurso(result)  
        } else {
          this.toastr.warning("Nota inválida")
        }
  
      })

    }
  }

  addNotaAoCurso(notaRecebida){

    this.notas = {
      idAluno: this.usuario.id,
      nota: Number(notaRecebida)
    }
    if (!this.curso.notas){
      this.curso.notas = []
    }
    this.curso.notas.push(this.notas)

    this.cursoService.editar(this.curso.id, this.curso).subscribe((r) => {
      this.toastr.success("Curso avaliado com sucesso")
    },
    (err) => {
      this.toastr.error(err.error.message)

    })

  }

  listarMeusCursos() {

    for (let x = 0; x <this.aluno.cursos.length; x++){
      for (let y = 0; y < this.cursos.length; y++){
        if (this.cursos[y].id == this.aluno.cursos[x]){
          this.meusCursos.push(this.cursos[y])
        }

      }
    }
  }

  listarAulas = (id: any) => {
    this.router.navigate([`listar-aula`], {queryParams: { idCurso: id}})
  }

}