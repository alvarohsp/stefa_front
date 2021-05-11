import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {

  aluno: Aluno;
    newAlunoForm: FormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      idade: new FormControl(0, Validators.required),
      formacao: new FormControl('', Validators.required),
    });


  constructor(private authService: AuthService,private router: Router, private service: AlunoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }


  createAlunoAcc() {
    this.aluno = {
      email: this.newAlunoForm.get('email').value,
      senha: this.newAlunoForm.get('senha').value,
      nome: this.newAlunoForm.get('nome').value,      
      idade: this.newAlunoForm.get('idade').value,
      formacao: this.newAlunoForm.get('formacao').value,
    };
    this.service.incluir(this.aluno).subscribe((mensagem) => {
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
