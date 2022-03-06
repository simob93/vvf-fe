import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, 
    MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, 
    MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule,
     MatSelectModule, MatSidenavModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatTreeModule,
     MatToolbarModule, MatTooltipModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgDatepickerModule } from 'ng2-datepicker';
import { AvatarModule } from 'ngx-avatar';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './common/loader/loader.component';
import { FormPatenteCertificatiComponent } from './common/patenti-certificati/form-patente-certificati/form-patente-certificati.component';
import { PatentiCertificatiComponent } from './common/patenti-certificati/patenti-certificati.component';
import { PortletStdComponent } from './common/portlet-std/portlet-std.component';
import { StandardMessageComponent } from './common/standard-message/standard-message.component';
import { ToolbarNavComponent } from './common/toolbar-nav/toolbar-nav.component';
import { MY_FORMATS } from './constant/dateTime';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './dashboard/detail/detail.component';
import { GradiEffect } from './effect/gradi.effect';
import { PortletEffect } from './effect/portlet-effect';
import { ServizioEffect } from './effect/servizio-effect';
import { VigiliEffect } from './effect/vigili-effect';
import { FlatListVigiliComponent } from './flat-list-vigili/flat-list-vigili.component';
import { ImpostazioniDetailComponent } from './impostazioni/impostazioni-detail/impostazioni-detail.component';
import { ImpostazioniFormComponent } from './impostazioni/impostazioni-form/impostazioni-form.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { DialogMessage, MessageComponent } from './message/message.component';
import { FilterOnPipe } from './pipe/filter-on.pipe';
import { PortletAutorizzazioniComponent } from './portlet/portlet-autorizzazioni/portlet-autorizzazioni.component';
import { PortletCarieraComponent } from './portlet/portlet-cariera/portlet-cariera.component';
import { PortletPatentiComponent } from './portlet/portlet-patenti/portlet-patenti.component';
import { PortletScadenzeComponent } from './portlet/portlet-scadenze/portlet-scadenze.component';
import { PortletServiziComponent } from './portlet/portlet-servizi/portlet-servizi.component';
import { PortocolliEditComponent } from './protocolli/portocolli-edit/portocolli-edit.component';
import { PortocolliMainComponent } from './protocolli/portocolli-main/portocolli-main.component';
import { reducers } from './reducers';
import { FormScadenzeComponent } from './scadenze/form-scadenze/form-scadenze.component';
import { ListScadenzeComponent } from './scadenze/list-scadenze/list-scadenze.component';
import { MainListComponent } from './scadenze/main-list/main-list.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';
import { LoaderInterceptorService } from './service/loader-interceptor.service';
import { TurniOptStampaComponent } from './turni/turni-opt-stampa/turni-stampa.component';
import { TurniPageComponent } from './turni/turni-page/turni-page.component';
import { MomentPipe } from './utils/date/momentPipe.pipe';
import { MomentUtcDateAdapter } from './utils/momentUtcDataAdapter';
import { VigiliNavComponent } from './vigili-nav/vigili-nav.component';
import { CertificatiComponent } from './vigili/certificati/certificati.component';
import { EditVigileComponent } from './vigili/edit-vigile/edit-vigile.component';
import { FormAssenzeComponent } from './vigili/form-assenze/form-assenze.component';
import { FormGradoComponent } from './vigili/form-grado/form-grado.component';
import { FormMansioniComponent } from './vigili/form-mansioni/form-mansioni.component';
import { FormServizioComponent } from './vigili/form-servizio/form-servizio.component';
import { FormVigileComponent } from './vigili/form-vigile/form-vigile.component';
import { GradiComponent } from './vigili/gradi/gradi.component';
import { ListAssenzeComponent } from './vigili/list-assenze/list-assenze.component';
import { ListGradiComponent } from './vigili/list-gradi/list-gradi.component';
import { ListMansioniComponent } from './vigili/list-mansioni/list-mansioni.component';
import { ListServizioComponent } from './vigili/list-servizio/list-servizio.component';
import { ListVigiliComponent } from './vigili/list-vigili/list-vigili.component';
import { MansioniComponent } from './vigili/mansioni/mansioni.component';
import { MovimentiAssenzaComponent } from './vigili/movimenti-assenza/movimenti-assenza.component';
import { PatentiServizioComponent } from './vigili/patenti-servizio/patenti-servizio.component';
import { ServizioComponent } from './vigili/servizio/servizio.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/authGuard';
import { PermissionDirectiveDirective } from './permission-directive.directive';
import { LoginEffect } from './effect/login.effect';
import { AccountPageComponent } from './account-page/account-page.component';
import { ProfiliPageComponent } from './profili-page/profili-page.component';
import { PermessiPageComponent } from './permessi-page/permessi-page.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { FormAccountComponent } from './form-account/form-account.component';
import { ListProfiliComponent } from './list-profili/list-profili.component';
import { FormProfiliComponent } from './form-profili/form-profili.component';
import { GestProfiliService } from './service/profili-shared.service';
import { EditPermessoComponent } from './edit-permesso/edit-permesso.component';
import { ProtocolloRicercaAvanzataComponent } from './protocollo-ricerca-avanzata/protocollo-ricerca-avanzata.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { MagazzinoPageComponent } from './magazzino/magazzino-page/magazzino-page.component';
import { CategorieFormComponent } from './magazzino/articoli/categorie/categorie-form/categorie-form.component';
import { CategorieListComponent } from './magazzino/articoli/categorie/categorie-list/categorie-list.component';
import { CategoriePageComponent } from './magazzino/articoli/categorie/categorie-page/categorie-page.component';
import { DepositiPageComponent } from './magazzino/depositi/depositi-page/depositi-page.component';
import { DepositiListComponent } from './magazzino/depositi/depositi-list/depositi-list.component';
import { DepositiFormComponent } from './magazzino/depositi/depositi-form/depositi-form.component';

import { ArticoliPageComponent } from './magazzino/articoli/catalogo/articoli-page/articoli-page.component';
import { ArticoliFormComponent } from './magazzino/articoli/catalogo/articoli-form/articoli-form.component';
import { ArticoliListComponent } from './magazzino/articoli/catalogo/articoli-list/articoli-list.component';
import { ArticoliCategorieComponent } from './magazzino/articoli/catalogo/articoli-categorie/articoli-categorie.component';
import { ArticoloSharedService } from './service/articolo-shared.service';
import { ArticoliDepositiComponent } from './magazzino/articoli/catalogo/articoli-depositi/articoli-depositi.component';
import { DotazionePageComponent } from './dotazione/dotazione-page/dotazione-page.component';
import { DotazioneListComponent } from './dotazione/dotazione-list/dotazione-list.component';
import { DotazioneFormComponent } from './dotazione/dotazione-form/dotazione-form.component';
import { PortletDotazioneComponent } from './portlet/portlet-dotazione/portlet-dotazione.component';
import { ScadenzaArticoliPageComponent } from './magazzino/scadenza-articoli/scadenza-articoli-page/scadenza-articoli-page.component';
import { ScadenzaArticoliFormComponent } from './magazzino/scadenza-articoli/scadenza-articoli-form/scadenza-articoli-form.component';
import { ScadenzaArticoliListComponent } from './magazzino/scadenza-articoli/scadenza-articoli-list/scadenza-articoli-list.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/language/', '.json');
}


@NgModule({
    declarations: [
        AppComponent,
        ListVigiliComponent,
        EditVigileComponent,
        FormVigileComponent,
        MomentPipe,
        FormServizioComponent,
        ListServizioComponent,
        MessageComponent,
        DialogMessage,
        VigiliNavComponent,
        ScadenzeComponent,
        FlatListVigiliComponent,
        FormScadenzeComponent,
        DashboardComponent,
        PortletPatentiComponent,
        PortletAutorizzazioniComponent,
        PortletScadenzeComponent,
        PortletCarieraComponent,
        PatentiServizioComponent,
        DetailComponent,
        CertificatiComponent,
        PatentiCertificatiComponent,
        FormPatenteCertificatiComponent,
        ListScadenzeComponent,
        LoaderComponent,
        MainListComponent,
        ImpostazioniComponent,
        ImpostazioniDetailComponent,
        ImpostazioniFormComponent,
        ToolbarNavComponent,
        PortletServiziComponent,
        PortocolliMainComponent,
        PortocolliEditComponent,
        StandardMessageComponent,
        MovimentiAssenzaComponent,
        ListAssenzeComponent,
        FormAssenzeComponent,
        ListMansioniComponent,
        FormMansioniComponent,
        MansioniComponent,
        ServizioComponent,
        GradiComponent,
        ListGradiComponent,
        FormGradoComponent,
        TurniPageComponent,
        PortletStdComponent,
        TurniOptStampaComponent,
        FilterOnPipe,
        LoginPageComponent,
        LoginComponent,
        PermissionDirectiveDirective,
        AccountPageComponent,
        ProfiliPageComponent,
        PermessiPageComponent,
        AccountNavComponent,
        FormAccountComponent,
        ListProfiliComponent,
        FormProfiliComponent,
        EditPermessoComponent,
        ProtocolloRicercaAvanzataComponent,
        LoginFormComponent,
        ChangePasswordFormComponent,
        ResetPasswordFormComponent,
        MagazzinoPageComponent,
        CategorieFormComponent,
        CategorieListComponent,
        CategoriePageComponent,
        DepositiPageComponent,
        DepositiListComponent,
        DepositiFormComponent,
        ArticoliPageComponent,
        ArticoliFormComponent,
        ArticoliListComponent,
        ArticoliCategorieComponent,
        ArticoliDepositiComponent,
        DotazionePageComponent,
        DotazioneListComponent,
        DotazioneFormComponent,
        PortletDotazioneComponent,
        ScadenzaArticoliPageComponent,
        ScadenzaArticoliFormComponent,
        ScadenzaArticoliListComponent
    ],
    imports: [
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot([VigiliEffect, ServizioEffect, PortletEffect, GradiEffect, LoginEffect]),
        NgSelectModule,
        MomentModule,
        BrowserModule,
        AgGridModule.withComponents([]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgDatepickerModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatInputModule,
        MatTreeModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatRadioModule,
        MatExpansionModule,
        MatTooltipModule,
        MatBadgeModule,
        MatMenuModule,
        AvatarModule
    ],
    entryComponents: [
        FormGradoComponent,
        FormServizioComponent,
        FormScadenzeComponent,
        ImpostazioniFormComponent,
        PortocolliEditComponent,
        StandardMessageComponent,
        TurniOptStampaComponent,
        EditPermessoComponent,
        ProtocolloRicercaAvanzataComponent,
        ScadenzaArticoliFormComponent,
        DialogMessage
    ],
    providers: [
        MatDatepickerModule,  MatMomentDateModule, AuthGuard, GestProfiliService, ArticoloSharedService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: MAT_DATE_LOCALE,useValue: 'it'},
        { provide: DateAdapter, useClass: MomentUtcDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

        //{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        
        //{ provide: DateAdapter, useClass: MomentUtcDateAdapter },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
