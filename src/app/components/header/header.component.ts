import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Aluno } from 'src/app/models/aluno';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  
  constructor(private authService: AuthService, private router: Router, private alunoService: AlunoService, private profService: ProfessorService) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.usuario = this.authService.getUsuario(); 
    });
  }


  showHeader() {
    return this.authService.isAuthenticated();
  }

  sair() {
    this.authService.logout();
  }

  alterarDados(){

    try{ 

      if (this.usuario.tipo == 1) {

        return `nova-conta/professor/${this.usuario.id}`

      }else {

        return `nova-conta/aluno/${this.usuario.id}`
    }   
    }catch {
    }
  }
}