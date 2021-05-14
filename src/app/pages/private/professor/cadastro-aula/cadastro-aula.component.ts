import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-cadastro-aula',
  templateUrl: './cadastro-aula.component.html',
  styleUrls: ['./cadastro-aula.component.css']
})
export class CadastroAulaComponent implements OnInit {

  queryP = 0
  idAula = 0
  aula: Aula = new Aula(0,'',0,0,'')
   
    txtBotao = "Criar aula"
    txtTitulo = "Criando aula"


  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService, private service: AulaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(qParam =>{
      if (qParam['idCurso']){
        this.queryP = Number(qParam.idCurso)
        this.aula.idCurso = this.queryP
      }
    })

    this.activatedRoute.params.subscribe(param => {

      if (param['id']){
        this.idAula = Number(param['id'])
        this.txtBotao = "Editar aula"
        this.txtTitulo = "Editando aula"
        this.service.obterPorId(Number(this.idAula), this.queryP).subscribe(AulaDb =>{
          this.aula = AulaDb
          console.log(this.aula)
        })
      }
    })
  }
 
  submitBtn() {
    console.log(this.aula)

    if (this.idAula === 0){
      this.createAula()
    }else{
      this.editarAula()
    }
  }


  editarAula(){

    this.service.editar(this.aula.id, this.aula.idCurso, this.aula).subscribe((r) => {
      this.toastr.success(r.mensagem)
      this.router.navigate(['listar-curso']);
    },
    (err) => {
      this.toastr.error(err.error.message)

    })

  }


  createAula(){
    this.service.incluir(this.aula).subscribe((retorno) => {
      this.toastr.success(retorno.mensagem)
    },
    (err) => {
      this.toastr.error(err.error.message)

    }) 
  }

  returnHome() {
    this.router.navigate(['listar-curso']);
  }

}
