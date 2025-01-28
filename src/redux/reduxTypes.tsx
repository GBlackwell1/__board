export interface ItemSelectedState {
    itemSelected: string | null;
}

export interface RootState {
    itemSelected: ItemSelectedState;
    APIRefresh: APIRefreshState;
}

export interface APIRefreshState {
    APIRefresh: number | null;
}