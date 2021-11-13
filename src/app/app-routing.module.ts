import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListVigiliComponent } from './vigili/list-vigili/list-vigili.component'
import { EditVigileComponent } from './vigili/edit-vigile/edit-vigile.component'
import { VigiliNavComponent } from './vigili-nav/vigili-nav.component';
import { FormVigileComponent } from './vigili/form-vigile/form-vigile.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatentiServizioComponent } from './vigili/patenti-servizio/patenti-servizio.component';
import { FlatListVigiliComponent } from './flat-list-vigili/flat-list-vigili.component';
import { DetailComponent } from './dashboard/detail/detail.component';
import { CertificatiComponent } from './vigili/certificati/certificati.component';
import { ListScadenzeComponent } from './scadenze/list-scadenze/list-scadenze.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { ImpostazioniDetailComponent } from './impostazioni/impostazioni-detail/impostazioni-detail.component';
import { PortocolliMainComponent } from './protocolli/portocolli-main/portocolli-main.component';
import { MovimentiAssenzaComponent } from './vigili/movimenti-assenza/movimenti-assenza.component';
import { MansioniComponent } from './vigili/mansioni/mansioni.component';
import { ServizioComponent } from './vigili/servizio/servizio.component';
import { GradiComponent } from './vigili/gradi/gradi.component';
import { TurniPageComponent } from './turni/turni-page/turni-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './service/authGuard';
import { AccountPageComponent } from './account-page/account-page.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { ProfiliPageComponent } from './profili-page/profili-page.component';
import { PermessiPageComponent } from './permessi-page/permessi-page.component';
import { MagazzinoPageComponent } from './magazzino/magazzino-page/magazzino-page.component';
import { CategoriePageComponent } from './magazzino/articoli/categorie/categorie-page/categorie-page.component';
import { DepositiPageComponent } from './magazzino/depositi/depositi-page/depositi-page.component';
import { ArticoliPageComponent } from './magazzino/articoli/catalogo/articoli-page/articoli-page.component';
import { EquipaggioPageComponent } from './equipaggio/equipaggio-page/equipaggio-page.component';


const navigationVigile: Routes = [
	{
		path: '',
		component: ListVigiliComponent,
		data: {
			breadcrumbs: true,
			label: 'Lista organico'
		},
	},
	{
		path: 'vigile/:id',
		component: EditVigileComponent,
		data: {
			breadcrumbs: true,
			label: 'Modifica Vigile'
		},
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'anagrafica'
			},
			{
				path: 'anagrafica',
				component: FormVigileComponent
			},
			{
				path: 'assenze',
				component: MovimentiAssenzaComponent,
			},
			{
				path: 'mansioni',
				component: MansioniComponent,
			},
			{
				path: 'licenses',
				component: PatentiServizioComponent
			},
			{
				path: 'certified',
				component: CertificatiComponent
			},
			{
				path: 'servizi',
				component: ServizioComponent
			},
			{
				path: 'gradi',
				component: GradiComponent
			}
		]
	}
	/*{
		path: 'vigile/:id/service',
		
	}*/
	
]

const routes: Routes = [
	{
		path: 'vigili',
		canActivate: [AuthGuard],
		component: VigiliNavComponent,
		children: [
			...navigationVigile
		]
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'scadenze',
		canActivate: [AuthGuard],
		component: ScadenzeComponent,
		children: [
			{
				path: 'vigile/:id',
				component: ListScadenzeComponent
			}
		]
		
	},
	{
		path: 'setting',
		canActivate: [AuthGuard],
		component: ImpostazioniComponent,
		children: [{
				path: 'area/:area',
				component: ImpostazioniDetailComponent
			}
		]
		
	},
	{
		path: 'warehouse',
		canActivate: [AuthGuard],
		component: MagazzinoPageComponent,
		children: [
			{
				path: 'depositi',
				component: DepositiPageComponent
			},
			{
				path: 'articoli',
				component: ArticoliPageComponent
			},
			{
				path: 'categorie',
				component: CategoriePageComponent
			}
		]
	},
	{
		path: 'accounts',
		canActivate: [AuthGuard],
		component: AccountNavComponent,
		children: [
			{
				path: 'utenti',
				component: AccountPageComponent
			},
			{
				path: 'profili',
				component: ProfiliPageComponent
			},
			{
				path: 'permessi',
				component: PermessiPageComponent
			}
	]
	},
	{
		path: 'protocol',
		canActivate: [AuthGuard],
		component: PortocolliMainComponent		
	},
	{
		path: 'turni',
		component: TurniPageComponent
	},
	{
		path: 'dashboard',
		canActivate: [AuthGuard],
		component: DashboardComponent,
		children: [
			{
				path: '',
				component: DetailComponent
			},
			{
				path: 'expiry',
				component: ListScadenzeComponent
			},
			{
				path: 'equipaggio',
				component: EquipaggioPageComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		paramsInheritanceStrategy: 'always'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
