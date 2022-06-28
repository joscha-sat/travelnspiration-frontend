import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CreateUser } from '../../../interfaces/create-user';
import { Router } from '@angular/router';
import { SnackbarService } from '../../a-custom-components/base-snackbar/snackbar.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    hide = true;
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackService: SnackbarService,
        private router: Router
    ) {}

    // Submitting the user registration
    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        // create user as given in CreateUser interface
        const createUser: CreateUser = {
            username: this.form.value.username,
            email: this.form.value.email,
            password: this.form.value.password,
        };

        // submit and call the http request from the service
        this.authService.register(createUser).subscribe(() => {
            this.snackService.openSnackBar(
                'Successful registered',
                '',
                'success'
            );
            this.router.navigate(['/login']).then();
        });
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
}
