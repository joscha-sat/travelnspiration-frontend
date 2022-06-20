import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    hide = true;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    onSubmit() {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
}
