import { ItemSelectedState } from "../reduxTypes";
// Actiontypes:
// itemSelected/listItemGrabbed
// itemSelected/listItemDropped
const initialState: ItemSelectedState  = {
    itemSelected: null, 
}
/**
 * Redux reducer for handling interactable states of a current ListItem
 * @param state 
 * @param action 
 * @returns Present state of interacted with ListItems
 */
export default function ListItemSlice(state = initialState, action: any) {
    switch(action.type) {
        case 'itemSelected/listItemGrabbed':
            return {
                ...state,
                itemSelected: action.payload,
            }
        case 'itemSelected/listItemDropped':
            return {
                ...state,
                itemSelected: null,
            }
        default:
            return state;
    }
}