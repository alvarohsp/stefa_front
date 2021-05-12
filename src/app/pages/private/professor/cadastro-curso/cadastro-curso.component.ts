import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { AuthService } from 'src/app/services/auth.service';
import { Aula } from 'src/app/models/aula';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro-curso.component.html',
  styleUrls: ['./cadastro-curso.component.css']
})
export class CadastroCursoComponent implements OnInit {

  curso: Curso;
    newCursoForm: FormGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      idProfessor: new FormControl(0, Validators.required),
      aulaNome: new FormControl('', Validators.required),
      aulaDuracao: new FormControl(0, Validators.required),
      aulaTopicos: new FormControl('', Validators.required),  
    });

    aula: Array <Aula> = []

    
  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService, private service: CursoService) { }

  ngOnInit(): void {
  }


  createCurso() {

    var idProfString = this.newCursoForm.get('idProfessor').value;
    var idProfNumber: number = + idProfString

    this.aula[0] = {
      nome: this.newCursoForm.get('aulaNome').value,
      duracao: this.newCursoForm.get('aulaDuracao').value,
      topicos: this.newCursoForm.get('aulaTopicos').value,
    }

    this.curso = {
      nome: this.newCursoForm.get('nome').value,
      descricao: this.newCursoForm.get('descricao').value,   
      idProfessor: idProfNumber
    };

    this.curso.aulas = []
    this.curso.aulas.push(this.aula[0])

 
    this.service.incluir(this.curso).subscribe((mensagem) => {
      this.toastr.success(mensagem.mensagem)
      console.log(mensagem)
    },
    (err) => {
      this.toastr.error(err.error.message)

    })

    
  }


  returnHome() {
    this.router.navigate(['']);
  }



}