import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthApiActions } from '../+state/actions';
import { AuthSelectors } from '../+state/selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: Observable<any[]> | undefined;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(AuthApiActions.loadAllUsers());
        this.users = this.store.select(AuthSelectors.getUsersList);
        this.store.select(AuthSelectors.getUsersList).subscribe(console.log);
    }

    protected readonly JSON = JSON;
}
