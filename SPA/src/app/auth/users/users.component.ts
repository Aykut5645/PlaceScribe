import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthApiActions } from '../+state/actions';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: any = {};

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(AuthApiActions.loadAllUsers());
    }
}
