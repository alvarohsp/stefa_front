import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {

  user: any
  alunos: Array <Aluno> = []

  constructor(private service: AlunoService) { }

  ngOnInit(): void {

    this.service.listar().subscribe(user => {
      this.alunos = user
    })
  }

}
