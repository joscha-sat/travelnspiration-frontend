import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    hide = true;
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        const loginUser = {
            username: this.form.value.username,
            password: this.form.value.password,
        };

        this.authService
            .login(loginUser.username, loginUser.password)
            .subscribe(() => {
                this.router.navigate(['/home']).then();
            });
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
}
