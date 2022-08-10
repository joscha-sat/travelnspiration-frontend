import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelPostService } from '../../../services/travel-post.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TravelPost } from '../../../interfaces/travel-post';
import { SnackbarService } from '../../a-custom-components/base-snackbar/snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-travel-entry-form',
    templateUrl: './travel-entry-form.component.html',
    styleUrls: ['./travel-entry-form.component.scss'],
})
export class TravelEntryFormComponent implements OnInit {
    totalCosts: number = null;
    previews: string[];
    image: any;
    mode: string = 'add';

    selectedTravelpost: TravelPost;

    form: FormGroup;
    selectedFiles: any[];
    selFiles: FileList | null;
    formData: FormData;

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

    constructor(
        private formBuilder: FormBuilder,
        private travelPostService: TravelPostService,
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBarService: SnackbarService,
        private translate: TranslateService
    ) {}

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        if (this.mode === 'add') {
            this.formData = new FormData();

            // append all selected images to be uploaded together

            if (this.selectedFiles.length) {
                for (let i = 0; i < this.selectedFiles.length; i++) {
                    this.formData.append(
                        'image',
                        this.selFiles[i],
                        this.selFiles[i].name
                    );
                }

                const userId = this.auth.me.id;

                // append all form values
                this.formData.append('userId', userId);
                this.formData.append('title', this.form.value.title);
                this.formData.append(
                    'description',
                    this.form.value.description
                );
                this.formData.append('state', this.form.value.state);
                this.formData.append('location', this.form.value.location);
                this.formData.append('housing', this.form.value.housing);
                this.formData.append('travelType', this.form.value.travelType);
                if (this.totalCosts) {
                    this.formData.append(
                        'costsTotal',
                        this.form.value.costsTotal.toString()
                    );
                }

                this.formData.append(
                    'costDescription',
                    this.form.value.costInfo
                );
                this.formData.append('other', this.form.value.other);

                // actual http post request to add the travelpost

                if (!userId) {
                    return;
                }

                this.travelPostService
                    .addTravelPosts(this.formData)
                    .subscribe(() => {
                        this.form.reset();
                        this.previews = [];

                        let txt;
                        this.translate
                            .get('SNACKBAR.SUCCESSFUL_ADDED')
                            .subscribe((res) => {
                                txt = res;
                            });

                        this.snackBarService.openSnackBar(txt, 'ok', 'success');
                    });
            }
        } else {
            const updateTravelpost: TravelPost = {
                title: this.form.value.title,
                description: this.form.value.description,
                state: this.form.value.state,
                location: this.form.value.location,
                travelType: this.form.value.travelType,
                housing: this.form.value.housing,
                costsTotal: this.form.value.costsTotal,
                costDescription: this.form.value.costDescription,
                other: this.form.value.other,
            };

            this.travelPostService
                .updateTravelPostById(
                    this.selectedTravelpost.id,
                    updateTravelpost
                )
                .subscribe(() => {
                    this.router
                        .navigate(['myTravelPosts/', this.auth.me.id])
                        .then();
                });
        }
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                let id = paramMap.get('id');

                this.travelPostService
                    .getTravelPostById(id)
                    .subscribe((result) => {
                        this.selectedTravelpost = result;

                        this.form.setValue({
                            title: this.selectedTravelpost.title,
                            description: this.selectedTravelpost.description,
                            state: this.selectedTravelpost.state,
                            location: this.selectedTravelpost.location,
                            housing: this.selectedTravelpost.housing,
                            travelType: this.selectedTravelpost.travelType,
                            costsTotal: this.selectedTravelpost.costsTotal,
                            costInfo: this.selectedTravelpost.costDescription,
                            other: this.selectedTravelpost.other,
                            images: '',
                        });
                    });
            } else {
                this.mode = 'add';
            }
        });

        if (this.mode === 'add') {
            this.form = this.formBuilder.group({
                images: ['', [Validators.required]],
                title: ['', [Validators.required, Validators.minLength(3)]],
                description: [
                    '',
                    [Validators.required, Validators.minLength(10)],
                ],
                state: ['', [Validators.required]],
                location: ['', [Validators.required]],
                housing: [''],
                travelType: [''],
                costsTotal: [''],
                costInfo: [''],
                other: [''],
            });
        } else {
            this.form = this.formBuilder.group({
                images: [''],
                title: ['', [Validators.required, Validators.minLength(3)]],
                description: [
                    '',
                    [Validators.required, Validators.minLength(10)],
                ],
                state: ['', [Validators.required]],
                location: ['', [Validators.required]],
                housing: [''],
                travelType: [''],
                costsTotal: [''],
                costInfo: [''],
                other: [''],
            });
        }
    }

    onImagePicked($event: Event): void {
        this.selectedFiles = [];
        this.previews = [];

        let files = ($event.target as HTMLInputElement).files;

        const element = $event.currentTarget as HTMLInputElement;
        this.selFiles = element.files;

        let fileList: FileList | null = element.files;

        if (fileList) {
            for (let itm in fileList) {
                let item: File = fileList[itm];
                if (
                    itm.match(/\d+/g) != null &&
                    !this.selectedFiles.includes(item['name'])
                )
                    this.selectedFiles.push(item['name']);
                this.form.patchValue({
                    images: this.selectedFiles,
                });
            }
        }

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previews.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
        }
    }
}
