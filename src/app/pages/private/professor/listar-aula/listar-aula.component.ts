import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';
import { CursoService } from 'src/app/services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-listar-aula',
  templateUrl: './listar-aula.component.html',
  styleUrls: ['./listar-aula.component.css']
})
export class ListarAulaComponent implements OnInit {

  queryP: any
  aulas: Array <Aula> = []
  cursoNome = ''
  usuario: Usuario

  constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private aulaService: AulaService, private cursoService: CursoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();


     this.activatedRoute.queryParams.subscribe(parametros =>{
      if (parametros['idCurso']){

        this.queryP = parametros.idCurso   
        this.aulaService.listar(this.queryP).subscribe(aula =>{
          this.aulas = aula
        })

        this.cursoService.obterPorId(this.queryP).subscribe(sub =>{
          this.cursoNome = sub.nome
        })
      }
    })
    
  }

  excluirAula = (id: any, cursoId: any, aulaNome: string) => {
    const del = confirm(`Deseja excluir a aula "${aulaNome}"?`)
    if (del == true){
      this.aulaService.excluir(id, cursoId).subscribe(
        (excluir) => {
          this.toastr.success(excluir.mensagem)
          this.ngOnInit()
        },
        (err) => {
          this.toastr.error(err.error.message)
        }
      )
    }
  }

  editarAula (id: any, cursoId: any){
    this.router.navigate([`cadastro-aula/${id}`], {queryParams: { idCurso: cursoId}})
  }

}