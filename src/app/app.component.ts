import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from './service';
import { Observable, pipe, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as PermissionAction  from './actions/permission.action'
import * as LoginAction  from './actions/login.action'
import { AppState, getLoginData } from './reducers';
import { AuthService } from './service/auth.service';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';


interface ItemMenu {
    title?: string,
    visible?: boolean,
    idMenu?:number,
    link?: string,
    image?: string,
    subMenu?: Array<ItemMenu>

}

interface Notification {
    vigile?: string
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'gestionale';
    username: string;
    isLogged: boolean;
    versioneProgramma$: Observable<string> = null;
    _onDestroy: Subject<any> = new Subject<any>();
    /**
      * Creazione del menu principale
      */
    shortMenu: ItemMenu[] = [
        {
            title: 'Cruscotto vigili',
            link: 'dashboard',
            idMenu: 6,
            image: "dashboard.svg",
        },
        {
            title: 'Gestione scadenze',
            link: 'scadenze',
            idMenu: 3,
            image: "stopwatch.svg",
        },
        {
            link: 'scadenze',
            image: "user-setting.svg",
        },  
    ];

    sideNavMenu: Array<{
        title: string, link: string, image: string,
         idMenu?: number, mostraSempre?: boolean
        subMenu: Array<{}>
    }> = [
            {
                title: 'CRUSCOTTO_VIGILI',
                link: 'dashboard',
                idMenu: 6,
                image: "dashboard.svg",
                subMenu: []
            },
            {
                title: 'GESTIONE_ANAGRAFICHE',
                link: 'vigili',
                idMenu: 1,
                image: "user.svg",
                subMenu: []
            },
            {
                title: 'GESTIONE_SCADENZE',
                idMenu:3,
                link: 'scadenze',
                image: "stopwatch.svg",
                subMenu: []
            },
            {
                title: 'TURNISTICA',
                link: 'turni',
                idMenu: 11,
                mostraSempre: true,
                image: "calendar.svg",
                subMenu: []
            },
            {
                title: 'PROTOCOLLI',
                idMenu: 2,
                link: 'protocol/',
                image: "protocol.svg",
                subMenu: []
            },
            {
                title: 'IMPOSTAZIONI',
                link: 'setting',
                idMenu: 4,
                image: "settings.svg",
                subMenu: []
            },
            {
                title: 'ACCOUNTS',
                link: 'accounts',
                idMenu: 14,
                image: "settings.svg",
                subMenu: []
            },
            {
                title: 'MAGAZZINO',
                link: 'warehouse',
                idMenu: 15,
                image: "warehouse.svg",
                subMenu: []
            },
            
        ];

    constructor(
        translate: TranslateService,
        private router: Router,
        private generalService: GeneralService,
        private store: Store<AppState>,
    ) {
        
        translate.setDefaultLang('it');
        translate.use('it');
    
        store.select(getLoginData)
        .pipe(
            takeUntil(this._onDestroy)
        )
        .subscribe(data => {
            this.isLogged = !!data;
            this.username = (data && data.username) || "";
        });
        
    }
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }


    onClickLogOut() {
        this.store.dispatch(new LoginAction.DoLogOutAction());
        this.store.dispatch(new PermissionAction.FetchPermessiAction(null));
        this.router.navigate(['login']);
    }

    ngOnInit(): void {
        
        this.versioneProgramma$ = this.generalService.getVersioneProgramma()
        .pipe(
            filter(resp => resp.success),
            map(resp => resp.data)
        )        
    }
}
