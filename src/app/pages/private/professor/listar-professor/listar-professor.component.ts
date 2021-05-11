import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  user: any
  professores: Array <Professor> = []

  constructor(private service: ProfessorService, private router: Router, private auth: AuthGuardService) { }

  ngOnInit(): void {
    this.auth.itsAProfessor()
  
    this.service.listar().subscribe(user => {
      this.professores = user
    })
  }


}
