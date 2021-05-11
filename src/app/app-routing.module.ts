import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroCursoComponent } from './pages/private/professor/cadastro-curso/cadastro-curso.component';
import { ListarAlunoComponent } from './pages/private/professor/listar-aluno/listar-aluno.component';
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
