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

  queryP: any
  aula: Aula;
    newAulaForm: FormGroup = new FormGroup({
      nome: new FormControl('', Validators.required),
      duracao: new FormControl(0, Validators.required),
      topicos: new FormControl('', Validators.required), 
    });


  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService, private service: AulaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(parametros =>{
      if (parametros['idCurso']){
        this.queryP = parametros.idCurso
      }
    })
  }
    
  createAula(){
    this.aula = {
      nome: this.newAulaForm.get('nome').value,
      duracao: this.newAulaForm.get('duracao').value,
      topicos: this.newAulaForm.get('topicos').value,
      idCurso: Number(this.queryP)
    }
    console.log(this.aula)
  
    this.service.incluir(this.aula).subscribe((retorno) => {
      this.toastr.success(retorno.mensagem)
    },
    (err) => {
      this.toastr.error(err.error.message)

    }) 
  }

  returnHome() {
    this.router.navigate(['']);
  }

}
