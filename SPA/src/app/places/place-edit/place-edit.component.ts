import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceApiActions } from '../+state/actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-place-edit',
    templateUrl: './place-edit.component.html',
    styleUrls: ['./place-edit.component.scss'],
})
export class PlaceEditComponent implements OnChanges {
    @Input() isEditModalOpen: boolean;
    @Input() placeDetails: any = {};
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.createForm();
    }

    get titleIsValid() {
        return this.form.get('title')?.invalid && this.form.get('title')?.touched;
    }

    get descriptionIsValid() {
        return this.form.get('description')?.invalid && this.form.get('description')?.touched;
    }

    closeModalHandler(): void {
        this.isEditModalOpen = !this.isEditModalOpen;
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

    createForm(): void {
        this.form = this.fb.group({
            title: [this.placeDetails ? this.placeDetails.title : null, [Validators.required]],
            description: [
                this.placeDetails ? this.placeDetails.description : null,
                [Validators.required, Validators.minLength(6)],
            ],
        });
        this.isEditModalOpen = true;
    }
}
