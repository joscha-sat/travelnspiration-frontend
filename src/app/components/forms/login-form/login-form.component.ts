import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../a-custom-components/base-snackbar/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

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
        private snackBarService: SnackbarService,
        private translate: TranslateService,
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
                let snackInfoText;

                this.translate
                    .get('SNACKBAR.SUCCESSFUL_LOGGED')
                    .subscribe((res) => {
                        snackInfoText = res;
                    });
                // Open success snackbar
                this.snackBarService.openSnackBar(snackInfoText, '', 'success');
                // navigate to home after login
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
