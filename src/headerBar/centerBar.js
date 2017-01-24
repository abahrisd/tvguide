import {MONTH_NAMES, DAY_NAMES, TODAY, TOMORROW} from '../fixtures/constants';

export default class CenterBar {
    constructor() {
        this.content = null;
        this.init();
    }

    init(){
        const mainDiv = this.createMainDiv();
        const weekDaysDiv = this.createWeekDaysDiv();
        mainDiv.appendChild(weekDaysDiv);
        this.content = mainDiv;
    }

    createMainDiv(){
        const div = document.createElement('div');
        div.classList.add('header__center-bar');
        return div;
    }

    createWeekDaysDiv = () => {
        const div = document.createElement('div');
        div.classList.add('header__center-bar__div-days');
        //const todayIndex = now.getDay();
        //const date = now.getDate();
        //const startDayDate = new Date(now.getDate() - 3);
        const dateOffset = (24*60*60*1000)*3;
        const now = new Date();
        //const startDayTime = (new Date()).setTime(now.getTime() - dateOffset);
        const startDayDate = new Date(now.getTime() - dateOffset);

        //create objects for upper timeline
        const daysObjects = this.createDaysObject(startDayDate, 11);
        const daysDivs = [];
        const _this = this;

        for (let i in daysObjects){
            if (Object.prototype.hasOwnProperty.call(daysObjects, i)) {
                daysDivs.push(_this.createDivDayElement(daysObjects[i]));
            }
        }

        //add days in div
        daysDivs.forEach((el)=>{
            div.appendChild(el);
        });

        return div;
    };

    createDaysObject = (startDate, dayCount) => {
        const divDays = [];
        //debugger;
        for (let i = 0; i < dayCount; i++){
            const dateOffset = (24*60*60*1000)*i;
            const date = new Date(startDate.getTime() + dateOffset);
            //const date = new Date(startDate.getDate() + i)
            let dayObj = {
                date: date,
                name: i===3
                    ?TODAY
                    :(i===4?TOMORROW:DAY_NAMES[date.getDay()])
            };
            divDays.push(dayObj);
        }

        return divDays;
    }

    createDivDayElement = (dayObj) => {

        var dayDiv = document.createElement('div');

        if (dayObj.name){
            dayDiv.innerText = dayObj.name;

            if ([TODAY, TOMORROW].includes(dayObj.name)){
                dayDiv.classList.add('header--center-bar--big-day');
            } else {
                dayDiv.classList.add('header--center-bar--day');
            }
        }

        if (dayObj.date){
            dayDiv.setAttribute('data-date', dayObj.date.getTime());
        }

        return dayDiv;

    }
}
