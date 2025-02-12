/* Hashing out this classes overall abilities:
* Contains the project endpoint for github API
* Contains a list of work items and personal items that are of the same format.
*   - Note for the above, this will likely have to be stateful as this can be updated by many components, 
*     consider adding this to redux or doing something similar as done with the SectionObject class.
* Contains a list of visitors that have visited the site. Might have to nix this feature as it could be a privacy concern and just stupid to implement.
*/

type Item = {
    name: string;
    description: string;
    section: string;
}


class GlobalSettings {
    projectEndpoint: string = "";
    workItems: Item[] = [];
    workTime: number[] = [0, 0, 0, 0, 0, 0, 0];
    personalItems: Item[] = [];
    personalTime: number[] = [0, 0, 0, 0, 0, 0, 0];
    visitorsList: string[] | null = [];

    constructor(endpoint: string = "", workItems: Item[] = [], personalItems: Item[] = []) {
        this.projectEndpoint = endpoint;
        this.workItems = workItems;
        this.personalItems = personalItems;

        // TODO: Verify if this actually works, has the potential to be bogus
        // let visitors: string | null = localStorage.getItem("visitors");
        // if (visitors) {
        //     let visitorsJSON: JSON = JSON.parse(visitors);
        //     this.visitorsList = Array.from(Object.keys(visitorsJSON));
        // } 

        let workTime: string | null = localStorage.getItem("workTime");
        if (workTime) {
            this.workTime = JSON.parse(workTime);
        }

        let personalTime: string | null = localStorage.getItem("personalTime");
        if (personalTime) {
            this.personalTime = JSON.parse(personalTime);
        }
    }

    set ProjectEndpoint(endpoint: string) {
        this.projectEndpoint = endpoint;
    }

    set WorkTime(times: number[]) {
        if (times.length === 7) {
            this.workTime = times;
            localStorage.setItem("workTime", JSON.stringify(times));
        }
    }

    get WorkTime() {
        return [...this.workTime];
    }

    set PersonalTime(times: number[]) {
        if (times.length === 7) {
            this.personalTime = times;
            localStorage.setItem("personalTime", JSON.stringify(times));
        }
    }

    get PersonalTime() {
        return [...this.personalTime];
    }
}

export default GlobalSettings;