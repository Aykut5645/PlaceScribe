export interface State {
    placesList: PlacesListState;
    placeDetails: PlaceDetailsState;
}

export interface PlacesListState {
    loading: boolean;
    places: any[];
    error: string;
}

export const initialPlaceListState: PlacesListState = {
    loading: false,
    places: [],
    error: '',
};

export interface PlaceDetailsState {
    loading: boolean;
    place: any;
    error: string;
}

export const initialPlaceDetailsState: PlaceDetailsState = {
    loading: false,
    place: {},
    error: '',
};
