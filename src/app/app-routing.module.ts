import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./core/guards/auth-guard.guard";
import { CadastroConsultaComponent } from "./pages/cadastro-consulta/cadastro-consulta.component";
import { CadastroExameComponent } from "./pages/cadastro-exame/cadastro-exame.component";
import { CadastroPacienteComponent } from "./pages/cadastro-paciente/cadastro-paciente.component";
import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { ProntuarioComponent } from "./pages/prontuario/prontuario.component";
const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "HealthTrack - Login" },
    { path: "cadastro", component: CadastroComponent, title: "HealthTrack - Cadastro" },
    { path: "dashboard", component: DashboardComponent, title: "HealthTrack - Dashboard" }, //canActivate: [AuthGuardGuard]
    {
        path: "dashboard",
        children: [
            { path: "add", component: CadastroPacienteComponent, title: "HealthTrack - Cadastrar paciente"},
            { path: "prontuario", component: ProntuarioComponent, title: "HealthTrack - Listar prontuário"},
            { path: 'consulta', component: CadastroConsultaComponent, title: "HealthTrack - Cadastrar consulta"},
            { path: 'exame', component: CadastroExameComponent, title: "HealthTrack - Cadastrar exame"}
        ],
    },
    { path: "**", component: NotfoundComponent, title: "HealthTrack - Erro 404" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
