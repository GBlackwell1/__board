import React from 'react';
import { LastLogin, WeeklyDevTime, WeeklyPersonalTime } from '../widgets/content/index';

type MapObject = Map<string, any>;
type MapSection = {
    topList: string[];
    bottomList: string[];
}

type WidgetOptions = {
    Widget: React.FC<WidgetProps>,
    UniqueButton: boolean
}
type WidgetProps = {
    buttonOpen: boolean;
    buttonPress: () => void;
}

const WidgetMap: Map<string, WidgetOptions> = new Map<string, WidgetOptions>([
   ["Last Login", { Widget: LastLogin, UniqueButton: false }],
   ["Weekly Dev Time", { Widget: WeeklyDevTime, UniqueButton: true}],
   ["Weekly Personal Time", { Widget: WeeklyPersonalTime, UniqueButton: true}],
]);


// Purpose: Contains the SectionObject class, which is used to store the widgets in a section of the board.
class SectionObject {
    topList: string[];
    bottomList: string[];
    position: string;

    // Contains a map of all widgets that can be added to the board and accessed by the user
    

    /**
     * Constructor for BoardObject.
     * If an object is saved in local storage, it will load it
     * otherwise, it will initialize an empty object containing topList and bottomList
     * @param {string} position - the position of the board's section
     */
    constructor(position: string) {
        this.position = position;
        let JSONObj: any = this.FromJSON();

        if(!JSONObj) {
            this.topList = [];
            this.bottomList = [];
        } else {
            this.topList = JSONObj.topList;
            this.bottomList = JSONObj.bottomList;
        }
    }

    get TopList() {
        return [...this.topList];
    }

    get BottomList() {
        return [...this.bottomList];
    }

    /**
     * Adds a widget to the top or bottom list
     * @param {boolean} top - true if top, false if bottom
     * @param {boolean} left - true if left, false if right
     * @param {string} widget - the widget to add
     */    
    AddtoList = (top: boolean, left: boolean, widget: string) => {
        if (!this.topList.includes(widget) && !this.bottomList.includes(widget)) {
            if ((this.topList.length < 2 && top) || (this.topList.length === 0 && !top)) {
                this.topList = left ? [widget, ...this.topList] : [...this.topList, widget];
            } else if (this.bottomList.length < 2 && !top) {
                this.bottomList = left ? [widget, ...this.bottomList] : [...this.bottomList, widget];
            }
            this.ToJSON();
        }
    }
    
    /**
     * Deletes a widget from top or bottom list and if necessary swaps lists
     * @param {string} widget - the widget to delete 
     */
    DeleteFromList = (widget: string) =>{
        this.topList = [...this.topList.filter((item) => item !== widget)];
        this.bottomList = [...this.bottomList.filter((item) => item !== widget)];
        if (this.topList.length === 0 && this.bottomList.length > 0)
            this.SwapLists([...this.bottomList], []);
        this.ToJSON();
    }

    private SwapLists = (newTopList: string[], newBottomList: string[]) => {
        this.topList = newTopList;
        this.bottomList = newBottomList;
    }

    private ToJSON() {
        const toJSON: any = {
            [this.position]:{
                    topList: this.topList,
                    bottomList: this.bottomList
                }
        };
        // Retrieve stored data in local storage
        const storedData: any = localStorage.getItem('boardObject');
        const JSONSection = storedData ? JSON.parse(storedData) : {};
        // Convert the JSON object to a Map object and set
        let JSONObj: MapObject = new Map(Object.entries(JSONSection));
        JSONObj.set(this.position, toJSON[this.position]);
        JSONObj.set("APIRefresh", localStorage.getItem('APIRefresh'));
        // Serialize3
        const updatedJSONSection = Object.fromEntries(JSONObj);
        // Store
        localStorage.setItem('boardObject', JSON.stringify(updatedJSONSection));
    }

    private FromJSON = () => {
        const JSONSection: JSON = JSON.parse(localStorage.getItem('boardObject') || '{}');
        let section: MapSection = new Map(Object.entries(JSONSection)).get(this.position);
        return section;
    }
}

export default SectionObject;
export type { MapObject, MapSection, WidgetProps, WidgetOptions };
export { WidgetMap };