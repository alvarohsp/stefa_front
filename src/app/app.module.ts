import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { CadastroAlunoComponent } from './pages/public/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './pages/public/cadastro-professor/cadastro-professor.component';
import { ListarAlunoComponent } from './pages/private/professor/listar-aluno/listar-aluno.component';
import { ListarCursoComponent } from './pages/private/professor/listar-curso/listar-curso.component';
import { CadastroCursoComponent } from './pages/private/professor/cadastro-curso/cadastro-curso.component';
import { ListarAulaComponent } from './pages/private/professor/listar-aula/listar-aula.component';
import { CadastroAulaComponent } from './pages/private/professor/cadastro-aula/cadastro-aula.component';
import { MeuCursoComponent } from './pages/private/aluno/meu-curso/meu-curso.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    CadastroAlunoComponent,
    CadastroProfessorComponent,
    ListarAlunoComponent,
    ListarCursoComponent,
    CadastroCursoComponent,
    ListarAulaComponent,
    CadastroAulaComponent,
    MeuCursoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
