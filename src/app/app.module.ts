import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { UserService } from './core/services/user.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BasicInfoComponent } from './forms/basic-info/basic-info.component';
import { ConvenioInfoComponent } from './forms/convenio-info/convenio-info.component';
import { AddressInfoComponent } from './forms/adress-info/adress-info.component';
import { ExtraInfoComponent } from './forms/extra-info/extra-info.component';
import { ProntuarioComponent } from './pages/prontuario/prontuario.component';
import { SearchPipePipe } from './core/pipes/search-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    NotfoundComponent,
    FooterComponent,
    CadastroComponent,
    DashboardComponent,
    ModalComponent,
    NavbarDashboardComponent,
    CadastroPacienteComponent,
    SidenavComponent,
    BasicInfoComponent,
    ConvenioInfoComponent,
    AddressInfoComponent,
    ExtraInfoComponent,
    ProntuarioComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [UserService, AuthService, AuthGuardGuard, SearchPipePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
