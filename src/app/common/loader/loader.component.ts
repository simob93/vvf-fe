import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../service';
import { LoaderState } from '../../state/allState';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    show = false;
    private subscription: Subscription;
    constructor(private loaderService: LoaderService, private cdRef:ChangeDetectorRef) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
                this.cdRef.detectChanges();
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
