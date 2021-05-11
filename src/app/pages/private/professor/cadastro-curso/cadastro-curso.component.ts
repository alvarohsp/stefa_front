import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { AuthService } from 'src/app/services/auth.service';

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
      aulas: new FormControl('', Validators.required),
      idProfessor: new FormControl(0, Validators.required),
    });


  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService, private service: CursoService) { }

  ngOnInit(): void {
  }


  createCurso() {
    this.curso = {
      nome: this.newCursoForm.get('nome').value,
      descricao: this.newCursoForm.get('descricao').value,
      aulas: this.newCursoForm.get('aulas').value,      
      idProfessor: this.newCursoForm.get('idProfessor').value,
    };
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