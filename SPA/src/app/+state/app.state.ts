// App State
export interface AppState {}

export const initialAppState: AppState = {};

export interface State {
    currentUser: CurrentUserState;
}

// Current User
export interface CurrentUserState {
    user: {
        email: string;
        userId: string;
        token: string;
    };
    error: string;
    loading: boolean;
}

export const initialCurrentUserState: CurrentUserState = {
    user: {
        email: '',
        userId: '',
        token: '',
    },
    error: '',
    loading: false,
};

// Initial State
export const initialState: State = {
    currentUser: initialCurrentUserState,
};
