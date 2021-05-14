import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {

  alunos: Array <Aluno> = []

  constructor(private service: AlunoService,private router: Router, private toastr: ToastrService, private cursoService: CursoService) { }

  ngOnInit(): void {

    this.service.listar().subscribe(user => {
      this.alunos = user
    })
  }

  editarAluno(id: any) {
    this.router.navigate([`nova-conta/aluno/${id}`])


  }

  excluirAluno(id: any, nome: string){
    const del = confirm(`Deseja excluir o aluno "${nome}"?`)
    if (del == true){
      this.service.excluir(id).subscribe(
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

