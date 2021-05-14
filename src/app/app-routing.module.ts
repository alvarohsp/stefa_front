import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { MeuCursoComponent } from './pages/private/aluno/meu-curso/meu-curso.component';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroAulaComponent } from './pages/private/professor/cadastro-aula/cadastro-aula.component';
import { CadastroCursoComponent } from './pages/private/professor/cadastro-curso/cadastro-curso.component';
import { ListarAlunoComponent } from './pages/private/professor/listar-aluno/listar-aluno.component';
import { ListarAulaComponent } from './pages/private/professor/listar-aula/listar-aula.component';
import { ListarCursoComponent } from './pages/private/professor/listar-curso/listar-curso.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroAlunoComponent } from './pages/public/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './pages/public/cadastro-professor/cadastro-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    children: [
      {
        path: 'listar-professor',
        component: ListarProfessorComponent

      },
      {
        path: 'listar-aluno',
        component: ListarAlunoComponent
      },
      {
        path: 'listar-curso',
        component: ListarCursoComponent
      },
      {
        path: 'cadastro-curso',
        component: CadastroCursoComponent
      },
      {
        path: 'cadastro-curso/:id',
        component: CadastroCursoComponent
      },
      {
        path: 'cadastro-aula',
        component: CadastroAulaComponent
      },
      {
        path: 'cadastro-aula/:id',
        component: CadastroAulaComponent
      },
      {
        path: 'listar-aula',
        component: ListarAulaComponent
      },
      {
        path: 'meu-curso',
        component: MeuCursoComponent
      }
    ]
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'nova-conta/aluno',
    component: CadastroAlunoComponent,
  },
  {
    path: 'nova-conta/aluno/:id',
    component: CadastroAlunoComponent,
  },
  {
    path: 'nova-conta/professor/:id',
    component: CadastroProfessorComponent,
  },
  {
    path: 'nova-conta/professor',
    component: CadastroProfessorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
