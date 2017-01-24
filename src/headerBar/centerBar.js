import {MONTH_NAMES, DAY_NAMES, TODAY, TOMORROW} from '../fixtures/constants';

export default class CenterBar {
    constructor() {
        this.content = null;
        this.init();
    }

    init(){
        const mainDiv = this.createMainDiv();
		const markerDiv = this.createMarkerDiv();
        const weekDaysDiv = this.createWeekDaysDiv(markerDiv);
		const longBarDiv = this.createLongBarDiv();
		longBarDiv.appendChild(markerDiv);
        mainDiv.appendChild(weekDaysDiv);
        mainDiv.appendChild(longBarDiv);
        this.content = mainDiv;
    }

    createMainDiv(){
        const div = document.createElement('div');
        div.classList.add('header__center-bar');
        return div;
    }

	createLongBarDiv(){
        const div = document.createElement('div');
        div.classList.add('header__long-bar');
        return div;
    }

	createMarkerDiv(){
        const div = document.createElement('div');
        div.classList.add('header__marker');
        return div;
    }

    createWeekDaysDiv = (markerDiv) => {
        const div = document.createElement('div');
        div.classList.add('header__center-bar__div-days');
        const dateOffset = (24*60*60*1000)*3;
        const now = new Date();
        const startDayDate = new Date(now.getTime() - dateOffset);

        //create objects for upper timeline
        const daysObjects = this.createDaysObject(startDayDate, 11);
        const daysDivs = [];
        const _this = this;

        for (let i in daysObjects){
            if (Object.prototype.hasOwnProperty.call(daysObjects, i)) {
                daysDivs.push(_this.createDivDayElement(daysObjects[i], markerDiv));
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
    };

    createDivDayElement = (dayObj, markerDiv) => {

        var dayDiv = document.createElement('div');

        if (dayObj.name){
            dayDiv.innerText = dayObj.name;

            [TODAY, TOMORROW].includes(dayObj.name)
				?dayDiv.classList.add('header--center-bar--big-day')
				:dayDiv.classList.add('header--center-bar--day');
        }

        if (dayObj.date){
            dayDiv.setAttribute('data-date', dayObj.date.getTime());
        }

		dayDiv.addEventListener('click',function(e){
			this.dayClickHandler(e, markerDiv);
		}.bind(this));

        return dayDiv;
    };

	dayClickHandler = (e, markerDiv) => {
		const target = e.target;
		if (!target) return;
		markerDiv.style.left = target.offsetLeft + 'px';
		markerDiv.style.width = target.clientWidth + 'px';
	};

}
