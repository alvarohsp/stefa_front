import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  professor: Professor;
    newProfForm: FormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
    });

  constructor(private authService: AuthService, private router: Router, private service: ProfessorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }


  createProfAcc() {
    this.professor = {
      email: this.newProfForm.get('email').value,
      senha: this.newProfForm.get('senha').value,
      nome: this.newProfForm.get('nome').value,      
    };
    this.service.incluir(this.professor).subscribe((mensagem) => {
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
