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
    title: string;
    state: string;
    location: string;
    description: string;
    housingType: string;
    totalCosts: number;
    costInfo: string;
    other: string;

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

    setTitle($event: string) {
        this.title = $event;
    }

    setState($event: string) {
        this.state = $event;
    }

    setLocation($event: string) {
        this.location = $event;
    }

    setDescription($event: string) {
        this.description = $event;
    }

    setHousingType($event: string) {
        this.housingType = $event;
    }

    setTotalCosts($event: number) {
        this.totalCosts = $event;
    }

    setCostInfo($event: string) {
        this.costInfo = $event;
    }

    setOther($event: string) {
        this.other = $event;
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        const newTravelPostEntry: TravelPost = {
            title: this.title,
            description: this.description,
            state: this.state,
            location: this.location,
            housing: this.housingType,
            costsTotal: this.totalCosts,
            costDescription: this.costInfo,
            other: this.other,
        };

        this.travelPostService
            .addTravelPosts(newTravelPostEntry)
            .subscribe(() => {
                this.form.reset();
            });
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            state: ['', [Validators.required]],
            location: ['', [Validators.required]],
            housingType: [''],
            costInfo: [''],
            other: [''],
        });
    }
}
