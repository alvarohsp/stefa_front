import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {

  aluno: Aluno
  alunoDB: Aluno
  usuario: Usuario
    newAlunoForm: FormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      idade: new FormControl('', Validators.required),
      formacao: new FormControl('', Validators.required),
    });

    id: any = 0
    txtBotao: string = "Cadastrar"
    txtTitulo = "Cadastro de aluno"

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private service: AlunoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.usuario = this.authService.getUsuario();

      this.activatedRoute.params.subscribe(param => {
        if (param['id']){
          if (this.usuario.tipo == 1 || this.usuario.id == Number(param['id'])){  
            this.id = Number(param['id'])
            this.txtBotao = "Editar"
            this.txtTitulo = "Editando aluno"
            this.service.obterPorId(this.id).subscribe(alunoDb =>{
              this.alunoDB = alunoDb
              this.newAlunoForm.setValue({nome: alunoDb.nome, email: alunoDb.email, senha: '', idade: alunoDb.idade, formacao: alunoDb.formacao})
              this.newAlunoForm.controls['email'].disable();
            })

          } else {
            this.router.navigate(['']);
          }
        } else {
          this.router.navigate(['']);
        }
      }) 
    }    
  }

  submitBtn(){
    console.log(this.aluno)
    if (this.id === 0){
    this.createAlunoAcc()
    }else{
      this.editarAluno()
    }
    
  }

  editarAluno(){

    this.aluno = {
      email: this.newAlunoForm.get('email').value,
      senha: this.newAlunoForm.get('senha').value,
      nome: this.newAlunoForm.get('nome').value,      
      idade: this.newAlunoForm.get('idade').value,
      formacao: this.newAlunoForm.get('formacao').value,
      cursos: this.alunoDB.cursos,
      id: this.alunoDB.id,
      tipo: this.alunoDB.tipo  
    };

    this.service.editar(this.aluno.id, this.aluno).subscribe((r) => {
      this.toastr.success(r.mensagem)
      this.returnHome();
    },
    (err) => {
      this.toastr.error(err.error.message)

    })
    console.log(this.aluno)

  }

  createAlunoAcc() {
    this.aluno = {
      email: this.newAlunoForm.get('email').value,
      senha: this.newAlunoForm.get('senha').value,
      nome: this.newAlunoForm.get('nome').value,      
      idade: this.newAlunoForm.get('idade').value,
      formacao: this.newAlunoForm.get('formacao').value,
      cursos: []
    };
    this.service.incluir(this.aluno).subscribe((mensagem) => {
      this.toastr.success(mensagem.mensagem)
      this.returnHome();
    },
    (err) => {
      this.toastr.error(err.error.message)

    })
  }


  returnHome() {
    this.router.navigate(['']);
  }


}
