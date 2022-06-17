import { Component } from '@angular/core';

@Component({
    selector: 'app-travel-entry-form',
    templateUrl: './travel-entry-form.component.html',
    styleUrls: ['./travel-entry-form.component.scss'],
})
export class TravelEntryFormComponent {
    title: string;
    state: string;
    location: string;
    description: string;
    housingType: string;
    totalCosts: number;
    costInfo: string;
    other: string;

    constructor() {}

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
        console.log('hehe');
    }
}
