import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./core/guards/auth-guard.guard";
import { CadastroConsultaEditComponent } from "./pages/cadastro-consulta-edit/cadastro-consulta-edit.component";
import { CadastroConsultaComponent } from "./pages/cadastro-consulta/cadastro-consulta.component";
import { CadastroExameEditComponent } from "./pages/cadastro-exame-edit/cadastro-exame-edit.component";
import { CadastroExameComponent } from "./pages/cadastro-exame/cadastro-exame.component";
import { CadastroPacienteEditComponent } from "./pages/cadastro-paciente-edit/cadastro-paciente-edit.component";
import { CadastroPacienteComponent } from "./pages/cadastro-paciente/cadastro-paciente.component";
import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ExibirInfoComponent } from "./pages/exibir-info/exibir-info.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { ProntuarioComponent } from "./pages/prontuario/prontuario.component";
const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "HealthTrack - Login" },
    { path: "cadastro", component: CadastroComponent, title: "HealthTrack - Cadastro" },
    { path: "dashboard", component: DashboardComponent, title: "HealthTrack - Dashboard", canActivate: [AuthGuardGuard] }, 
    {
        path: "dashboard",
        children: [
            { path: "add", component: CadastroPacienteComponent, title: "HealthTrack - Cadastrar paciente", canActivate: [AuthGuardGuard]},
            { path: "prontuario", component: ProntuarioComponent, title: "HealthTrack - Listar prontuário", canActivate: [AuthGuardGuard]},
            { path: 'consulta', component: CadastroConsultaComponent, title: "HealthTrack - Cadastrar consulta", canActivate: [AuthGuardGuard]},
            { path: 'exame', component: CadastroExameComponent, title: "HealthTrack - Cadastrar exame", canActivate: [AuthGuardGuard]}, 
            { path: 'exibir/:id', component: ExibirInfoComponent, title: 'HealthTrack - Exibir detalhes', canActivate: [AuthGuardGuard]},
        ],
    },
    { path: 'editar/:id', component: CadastroConsultaEditComponent, title: 'HealthTrack - Editar consulta', canActivate: [AuthGuardGuard]}, 
    { path: 'editarExame/:id', component: CadastroExameEditComponent, title: 'HealthTrack - Editar exame', canActivate: [AuthGuardGuard]}, 
    { path: 'editarCadastro/:id', component: CadastroPacienteEditComponent, title:'HealthTrack - Editar cadastro', canActivate: [AuthGuardGuard]},
    { path: "**", component: NotfoundComponent, title: "HealthTrack - Erro 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
