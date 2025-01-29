import { APIRefreshState } from "../reduxTypes";

// Actiontypes:
// APIRefresh/10
// APIRefresh/15
// APIRefresh/20
// APIRefresh/25
// APIRefresh/30

const APIRefreshRateList: number[] = [10, 15, 20, 25, 30];

const initialState: APIRefreshState = {
    APIRefresh: 15,
}

// Redux reducer for handling the API refresh rate
function APIRefreshSlice(state = initialState, action: any) {
    switch(action.type) {
        case 'APIRefresh/10':
            return {
                ...state,
                APIRefresh: 10,
            }
        case 'APIRefresh/15':
            return {
                ...state,
                APIRefresh: 15,
            }
        case 'APIRefresh/20':
            return {
                ...state,
                APIRefresh: 20,
            }
        case 'APIRefresh/25':
            return {
                ...state,
                APIRefresh: 25,
            }
        case 'APIRefresh/30':
            return {
                ...state,
                APIRefresh: 30,
            }
        default:
            return state;
    }
}

export default APIRefreshSlice;
export { APIRefreshRateList };