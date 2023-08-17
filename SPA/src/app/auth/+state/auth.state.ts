export interface State {
    isLoadingButton: boolean;
    usersList: UsersListState;
}

export interface UsersListState {
    loading: boolean;
    users: any[];
    error: string;
}

export const initialUsersListState: UsersListState = {
    loading: false,
    users: [],
    error: '',
};

export const initialLoadingButton = false;
