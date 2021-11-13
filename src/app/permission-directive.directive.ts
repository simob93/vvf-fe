import { Directive, TemplateRef, ViewContainerRef, OnDestroy, Input } from '@angular/core';
import { AppState, getPermessi, getLoginData } from './reducers';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RolePermission } from './model/rolePermission';
import { LoginResponse } from './model/loginResponse';

@Directive({
    selector: '[permissionDirective]'
})
export class PermissionDirectiveDirective implements OnDestroy {
    
    @Input() permissionDirective: string;
    @Input() permissionDirectiveMostraSempre: boolean = false;


    private _onDestroy: Subject<any> = new Subject();
    constructor(
        private templateRef: TemplateRef<any>,
        private store: Store<AppState>,
        private viewContainer: ViewContainerRef) { }
    ngOnDestroy(): void {

        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * 
     * @param items 
     */
    find(items) {
        items.forEach(element => {
            if (element.children && element.children.length > 0) {
                this.find(element.children)
            }
           if (element.nodId == this.permissionDirective) {
               if(element.permesso != 'S') {
                   this.viewContainer.clear();
               } else {
                    this.viewContainer.createEmbeddedView(this.templateRef);
               }
           }
        });
    }

    ngOnInit() {


        this.store.select(getPermessi)
        .pipe(
            takeUntil(this._onDestroy)
        )
        .subscribe(data => {
            this.viewContainer.clear();
            if (data) {
                this.find(data.children);
            } else {
                if (this.permissionDirectiveMostraSempre)
                    this.viewContainer.createEmbeddedView(this.templateRef);
            }
        })
    }

}
