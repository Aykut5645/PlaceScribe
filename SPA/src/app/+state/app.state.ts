// App State
export interface AppState {}

export const initialAppState: AppState = {};

export interface State {
    currentUser: CurrentUserState;
}

// Current User
export interface CurrentUserState {
    user: {};
    error: string;
    loading: boolean;
}

export const initialCurrentUserState: CurrentUserState = {
    user: {},
    error: '',
    loading: false,
};

// Initial State
export const initialState: State = {
    currentUser: initialCurrentUserState,
};
