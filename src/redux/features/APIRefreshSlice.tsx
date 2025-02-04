import { APIRefreshState } from "../reduxTypes";
import { MapObject } from "../../data/SectionObject";
// Actiontypes:
// APIRefresh/10
// APIRefresh/15
// APIRefresh/20
// APIRefresh/25
// APIRefresh/30

const APIRefreshRateList: number[] = [10, 15, 20, 25, 30];

const initialState: APIRefreshState = {
    APIRefresh: localStorage.getItem('APIRefresh') ? parseInt(localStorage.getItem('APIRefresh') as string) : 15,
}

// Redux reducer for handling the API refresh rate
function APIRefreshSlice(state = initialState, action: any) {
    let APIRefresh: number | null = state.APIRefresh;
    switch(action.type) {
        case 'APIRefresh/10':
            APIRefresh = 10;
            break;
        case 'APIRefresh/15':
            APIRefresh = 15;
            break;
        case 'APIRefresh/20':
            APIRefresh = 20;
            break;
        case 'APIRefresh/25':
            APIRefresh = 25;
            break;
        case 'APIRefresh/30':
            APIRefresh = 30;
            break;
        default:
            return state;
    }
    localStorage.setItem('APIRefresh', APIRefresh.toString());
    // Retrieve stored data in local storage
    const storedData: any = localStorage.getItem('boardObject');
    const JSONSection = storedData ? JSON.parse(storedData) : {};
    // Convert the JSON object to a Map object and set
    let JSONObj: MapObject = new Map(Object.entries(JSONSection));
    JSONObj.set("APIRefresh", localStorage.getItem('APIRefresh'));
    // Serialize3
    const updatedJSONSection = Object.fromEntries(JSONObj);
    // Store
    localStorage.setItem('boardObject', JSON.stringify(updatedJSONSection));
    return {
        ...state,
        APIRefresh: APIRefresh,
    }
}

export default APIRefreshSlice;
export { APIRefreshRateList };