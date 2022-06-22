import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelPost } from '../../../interfaces/travel-post';
import { TravelPostService } from '../../../services/travel-post.service';

@Component({
    selector: 'app-travel-entry-form',
    templateUrl: './travel-entry-form.component.html',
    styleUrls: ['./travel-entry-form.component.scss'],
})
export class TravelEntryFormComponent implements OnInit {
    totalCosts: number;
    preview: string;
    image: any;
    imagePath: string;

    states = [
        'Baden-Württemberg',
        'Bayern',
        'Berlin',
        'Brandenburg',
        'Bremen',
        'Hamburg',
        'Hessen',
        'Mecklenburg-Vorpommern',
        'Niedersachsen',
        'Nordrhein-Westfalen',
        'Rheinland-Pfalz',
        'Saarland',
        'Sachsen',
        'Sachsen-Anhalt',
        'Schleswig-Holstein',
        'Thüringen',
    ];

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private travelPostService: TravelPostService
    ) {}

    setTotalCosts($event: number) {
        this.totalCosts = $event;
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        let formData = new FormData();

        formData.append('image', this.image, this.image.name);

        this.travelPostService.uploadImage(formData).subscribe((res: any) => {
            const newTravelPostEntry: TravelPost = {
                title: this.form.value.title,
                description: this.form.value.description,
                state: this.form.value.state,
                location: this.form.value.location,
                housing: this.form.value.housingType,
                costsTotal: this.form.value.totalCosts,
                costDescription: this.form.value.costInfo,
                image: res[0].filename,
                other: this.form.value.other,
            };

            this.travelPostService
                .addTravelPosts(newTravelPostEntry)
                .subscribe(() => {
                    this.form.reset();
                    this.preview = '';
                });
        });
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            state: ['', [Validators.required]],
            location: ['', [Validators.required]],
            image: [''],
            housingType: [''],
            costInfo: [''],
            other: [''],
        });
    }

    onImagePicked($event: Event) {
        // ausgewählte File holen
        const file = ($event.target as HTMLInputElement).files![0];

        this.image = file;

        // input File an Form übergeben
        this.form.patchValue({ image: file });

        // form updaten und Validierung prüfen
        this.form.get('image')!.updateValueAndValidity();

        //  für Image Preview
        const reader = new FileReader();

        reader.onload = () => {
            this.preview = reader.result as string;
        };

        reader.readAsDataURL(file);
    }
}
