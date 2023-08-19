import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    userId: string;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userId = this.authService.getUser().userId;
    }

    isLoggedIn(): boolean {
        return this.authService.loggedIn();
    }
}
