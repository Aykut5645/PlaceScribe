import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PlaceApiActions } from '../+state/actions';

@Component({
    selector: 'app-handle-place',
    templateUrl: './handle-place.component.html',
    styleUrls: ['./handle-place.component.scss'],
})
export class HandlePlaceComponent implements OnInit {
    placeForm!: FormGroup;
    @Input() isEditMode: boolean = true;

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if (changes['questionDetails']) {
    //         this.createForm();
    //         if (this.isEditMode) {
    //
    //         }
    //     }
    // }

    get titleIsValid() {
        return this.placeForm.get('title')?.invalid && this.placeForm.get('title')?.touched;
    }

    get descriptionIsValid() {
        return this.placeForm.get('description')?.invalid && this.placeForm.get('description')?.touched;
    }

    get addressIsValid() {
        return this.placeForm.get('address')?.invalid && this.placeForm.get('address')?.touched;
    }

    submitHandler(): void {
        if (this.isEditMode) {
            this.store.dispatch(
                PlaceApiActions.updatePlace({
                    placeId: '64de2df529c482b4c30b34eb',
                    place: { ...this.placeForm.value },
                }),
            );
        } else {
            this.store.dispatch(
                PlaceApiActions.createPlace({
                    createdPlace: {
                        ...this.placeForm.value,
                        creator: '64dd0bf8bea517374ad58dbc',
                    },
                }),
            );
        }
    }

    createForm(): void {
        this.placeForm = this.fb.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required, Validators.minLength(6)]],
            // address: [null, [Validators.required]],
        });
    }
}
