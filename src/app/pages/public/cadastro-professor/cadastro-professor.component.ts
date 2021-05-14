import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  professor: Professor;
  professorDB: Professor;
  usuario: Usuario
    newProfForm: FormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
    });


    id: any = 0
    txtBotao: string = "Cadastrar"
    txtTitulo = "Cadastro de professor"

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private service: ProfessorService, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.usuario = this.authService.getUsuario();

      this.activatedRoute.params.subscribe(param => {
        if (param['id']){
          if (this.usuario.tipo == 1 && this.usuario.id == Number(param['id'])){
            this.id = Number(param['id'])
            this.txtBotao = "Editar"
            this.txtTitulo = "Editando professor"
            this.service.obterPorId(this.id).subscribe(professorDb =>{
              this.professorDB = professorDb
              this.newProfForm.setValue({nome: professorDb.nome, email: professorDb.email, senha: ''})
              this.newProfForm.controls['email'].disable();
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
    console.log(this.professor)
    console.log(this.id)
    if (this.id === 0){
    this.createProfAcc()
    }else{
      this.editarProf()
    }
    
  }

  editarProf(){

    this.professor = {
      email: this.newProfForm.get('email').value,
      senha: this.newProfForm.get('senha').value,
      nome: this.newProfForm.get('nome').value,      
      id: this.professorDB.id
    };

    this.service.editar(this.professor.id, this.professor).subscribe((r) => {
      this.toastr.success(r.mensagem)
      this.returnHome();
    },
    (err) => {
      this.toastr.error(err.error.message)

    })
    console.log(this.professor)

  }


  createProfAcc() {
    this.professor = {
      email: this.newProfForm.get('email').value,
      senha: this.newProfForm.get('senha').value,
      nome: this.newProfForm.get('nome').value,      
    };
    this.service.incluir(this.professor).subscribe((mensagem) => {
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
