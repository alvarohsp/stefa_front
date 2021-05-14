import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  curso: Curso = new Curso(0,'','',0,[])
    newCursoForm: FormGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      idProfessor: new FormControl(0, Validators.required),
      aulaNome: new FormControl('', Validators.required),
      aulaDuracao: new FormControl(0, Validators.required),
      aulaTopicos: new FormControl('', Validators.required),  
    });

    aula: Array <Aula> = []
    id: any = 0
    txtBotao: string = "Criar curso"
    txtTitulo = "Cadastar um curso"    
    
    
  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService, private service: CursoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(param => {

      if (param['id']){
        this.id = param['id']
        this.txtBotao = "Editar curso"
        this.txtTitulo = "Editando curso"
        this.service.obterPorId(Number(this.id)).subscribe(cursoDb =>{
          this.curso = cursoDb
        })
      }
    })
  }


  editarCurso(){
   
    this.service.editar(this.curso.id, this.curso).subscribe((r) => {
      this.toastr.success(r.mensagem)
    },
    (err) => {
      this.toastr.error(err.error.message)

    })
    console.log(this.curso)
  }

  submitBtn() {
    console.log(this.id)
    if (this.id == 0){
      this.createCurso()
    }else{
      this.editarCurso()
    }

    
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