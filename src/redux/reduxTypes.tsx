export interface ItemSelectedState {
    itemSelected: string | null;
}

export interface RootState {
    itemSelected: ItemSelectedState;
}