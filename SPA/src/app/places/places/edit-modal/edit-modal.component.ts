import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { PlaceApiActions } from '../../+state/actions';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnChanges {
    @Input() modal: { isOpen: boolean };
    @Input() placeDetails: any;

    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.createForm();
    }

    get titleIsValid() {
        return this.form.get('title')?.invalid && this.form.get('title')?.touched;
    }

    get descriptionIsValid() {
        return this.form.get('description')?.invalid && this.form.get('description')?.touched;
    }

    submitHandler(): void {
        this.store.dispatch(
            PlaceApiActions.updatePlace({
                placeId: this.placeDetails?.id,
                creatorId: this.placeDetails?.creator,
                place: { ...this.form.value },
            }),
        );
        this.closeModalHandler();
    }

    closeModalHandler(): void {
        this.modal = { isOpen: false };
    }

    createForm(): void {
        this.form = this.fb.group({
            title: [this.placeDetails ? this.placeDetails.title : null, [Validators.required]],
            description: [
                this.placeDetails ? this.placeDetails.description : null,
                [Validators.required, Validators.minLength(6)],
            ],
        });
    }
}
