import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  user: any
  professores = []
  cursos: Array <Curso> = []

  constructor(private profService: ProfessorService, private cursoService: CursoService, private router: Router, private auth: AuthGuardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.auth.itsAProfessor()
  
    this.profService.listar().subscribe(user => {
      this.professores = user
      
      this.cursoService.listar().subscribe(curs => {
        this.cursos = curs
        this.gerarCursos()
      })  
    }) 
  }

  gerarCursos(){

    for (let x = 0; x < this.professores.length; x++){
      this.professores[x].leciona = ''
    }

    for (let x = 0; x < this.professores.length; x++){
      for (let y = 0; y < this.cursos.length; y++){
        if (this.cursos[y].idProfessor == this.professores[x].id){
          this.professores[x].leciona += ` "${this.cursos[y].nome}" |`
              
        }
      }
    } 
        
    
  }

  excluirProf(id: any, profNome: string){
    const del = confirm(`Deseja excluir o professor "${profNome}"?`)
    if (del == true){
      this.profService.excluir(id).subscribe(
        (excluir) => {
          this.toastr.success(excluir.mensagem)
          this.ngOnInit()
        },
        (err) => {
          this.toastr.error(err.error.message)
        }
      )
    }
  }
}
