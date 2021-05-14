import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  usuario: Usuario
  cursos: Array <Curso> = []
  aluno: Aluno

  constructor(private alunoService: AlunoService, private cursoService: CursoService, private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    this.cursoService.listar().subscribe(curs => {
      this.cursos = curs
    })

    if (this.usuario.tipo == 2){

      this.alunoService.obterPorId(this.usuario.id).subscribe(user => {
        this.aluno = user
      })


    }
  }

  matricular(idCurso: any, cursoNome: string) {

    const matricula = confirm(`Deseja se matricular ao curso "${cursoNome}"?`)
    if (matricula == true){
      this.aluno.cursos.push(idCurso)

      this.alunoService.editar(this.usuario.id, this.aluno).subscribe(
        (edited) => {
          this.toastr.success("Matriculado com sucesso!")
          console.log(edited.mensagem)
          this.ngOnInit()
        },
        (err) => {
          this.toastr.error(err.error.message)
        }
      )
    }


  }

  listarAulas = (id: any) => {
    this.router.navigate([`listar-aula`], {queryParams: { idCurso: id}})
  }

  novaAula = (id: any) => {
    this.router.navigate([`cadastro-aula`], {queryParams: { idCurso: id}})
  }

  editarCurso = (id: any) => {
    this.router.navigate([`cadastro-curso/${id}`])
  }

  excluirCurso = (id: any, cursoNome: string) => {
    const del = confirm(`Deseja excluir o curso "${cursoNome}"?`)
    if (del == true){
      this.cursoService.excluir(id).subscribe(
        (excluir) => {
          this.toastr.success(excluir.mensagem)
          console.log(excluir.mensagem)
          this.ngOnInit()
        },
        (err) => {
          this.toastr.error(err.error.message)
        }
      )
    }

  }


  
}