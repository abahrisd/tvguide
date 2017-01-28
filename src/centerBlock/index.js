import {MONTH_NAMES, DAY_NAMES, TODAY, TOMORROW, CHANNELS_URL, PROGGRAMS_URL} from '../fixtures/constants';
import DataLoader from '../dataLoader'
import BaseClass from '../baseClass'
import './centerblock.css';

//import channels from '../fixtures/channels.json';

export default class CenterBlock extends BaseClass {
	constructor() {
		super();
		this.content = null;
		this.timeCoef = 5;
		this.init();
	}

	init(){
		this.content = this.createMainDiv();
		const dataLoader = new DataLoader();
		dataLoader.loadData(this.createChannelsList.bind(this));
	}

	createMainDiv(){
		return this.makeDiv('center-block');
	}

	createChannelsList(data){
		console.log("hello from channels list", data);

		const channels = data.channels;
		if (!channels) return;

		const channelsCol = channels.collection;
		if (!channelsCol) return;

		const programms = data.programms;
		if (!programms) return;

		const programmsCol = programms.collection;
		if (!programmsCol) return;

		const mainDiv = this.content;
		const _this = this;
		const {minTime, maxTime} = this.getMinMaxTime(programmsCol);
		const header = this.makeDiv('center-block__header');
		const body = this.makeDiv('center-block__body');

		body.addEventListener("mousewheel", (e) => {
			e = window.event || e;
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			body.scrollTop -= (delta * 40); // Multiplied by 40
			e.preventDefault();
		}, false);

		const channelsList = this.makeDiv('center-block__channels');
		const programmsList = this.makeDiv('center-block__programms');
		const programmsCont = this.makeDiv('center-block__programms-container');

		mainDiv.appendChild(header);
		mainDiv.appendChild(body);

		body.appendChild(channelsList);
		body.appendChild(programmsCont);

		programmsCont.appendChild(programmsList);

		//header with 'ТВ'
		const channelsHeader = this.createChannelsHeader();
		header.appendChild(channelsHeader);

		//timeline
		const timeLine = this.createTimeLine({minTime, maxTime});
		header.appendChild(timeLine);

		//slider
		const lineHeight = body.clientHeight;
		const slider = this.createSlider(programmsCont, lineHeight, programmsList, timeLine);
		header.appendChild(slider);

		let channelIndex = 1;

		//some for show only channelIndex channels
		channelsCol.some((channel) => {
			const channelBlock = _this.createChannelBlock(channel);

			let progsArr = [];
			programmsCol.forEach((prog)=>{
				if (prog.channel_id === channel.epg_channel_id){
					progsArr.push(prog)
				}
			});

			//sort by time
			progsArr.sort((a, b)=>{return a-b});
			if (progsArr[0].start > minTime){
				progsArr.unshift({start: minTime, duration: progsArr[0].start - minTime, hidden: true});
			}


			const programmsBlock = _this.createProgrammsBlock(progsArr);
		 	channelsList.appendChild(channelBlock);
			programmsList.appendChild(programmsBlock);
		 	channelIndex++;

			/*if (channelIndex === 10){
				return true
			}*/
		});

		programmsCont.style.height = channelsList.scrollHeight + 'px';
		slider.style.left = programmsList.offsetLeft - 10 + 'px';
	}

	createChannelsHeader(){
		const header = this.makeDiv('center-block__channel-block__header');
		const title = this.makeDiv('center-block__channel-block__title');
		title.innerText = 'ТВ';
		header.appendChild(title);
		return header;

	}

	createSlider(programmsCont, lineHeight, programmsList, timeLine){
		const marker = this.makeDiv('center-block__programms__marker');
		const triangle = this.makeDiv('center-block__programms__marker__triangle');
		const vertLine = this.makeDiv('center-block__programms__marker__line');
		vertLine.style.height = lineHeight + 3 + 'px';
		marker.appendChild(triangle);
		marker.appendChild(vertLine);

		this.applyDrag(triangle, marker, programmsCont, programmsList, timeLine);

		return marker;
	}

	createTimeLine({minTime, maxTime}){
		//console.log("minTime, maxTi", minTime, maxTime);
		const lineWrapper = this.makeDiv('center-block__programms__line-wrapper');
		const programmsDiv = this.makeDiv('center-block__programms__line');

		lineWrapper.appendChild(programmsDiv);
		const deltaSeconds = 1800;

		for (let timer = minTime; timer <= maxTime; timer += deltaSeconds){

			const progDiv = this.makeDiv('center-block__programms__time');
			const progsTitle = this.makeDiv('center-block__programms__title');
			const date = new Date();

			progDiv.style.width = deltaSeconds/this.timeCoef + 'px';

			//ms->s
			date.setTime(timer*1000);

			progsTitle.innerText = `${date.getHours()}:${date.getMinutes()}`;
			progDiv.appendChild(progsTitle);
			programmsDiv.appendChild(progDiv);
		}

		return lineWrapper;
	}

	createChannelBlock(channel){
		const block = this.makeDiv('center-block__channel-block');

		if (channel.title){

			if (channel.er_lcn){
				const num = this.makeDiv('center-block__channel-block__num');
				num.innerText = channel.er_lcn;
				block.appendChild(num);
			}

			const title = this.makeDiv('center-block__channel-block__title');
			title.innerText = channel.title;
			block.appendChild(title);
		}

		if (channel.description){
			block.setAttribute('tooltip', channel.description);
		}

		return block;
	}

	createProgrammsBlock = (progsArr) => {

		//long div with all progs
		const programmsDiv = this.makeDiv('center-block__programms__line');
		const _this = this;
		const coef = this.timeCoef;

		if (progsArr.length === 0) return programmsDiv;

		progsArr.forEach((progObj)=>{
			const {title, id, duration, start, program, hidden} = progObj;

			if (program){
				const {country, description, year, genres} = program;
			}

			const progDiv = _this.makeDiv('center-block__programms__prog');
			progDiv.style.width = duration/coef + 'px';
			const progsTitle = _this.makeDiv('center-block__programms__title');

			if (hidden === true){
				progDiv.classList.add('center-block__programms--hidden');
			}

			progsTitle.setAttribute('data-start', start);
			progsTitle.setAttribute('data-duration', duration);
			progsTitle.innerText = title || '';
			progsTitle.title = title || '';
			progDiv.appendChild(progsTitle);
			programmsDiv.appendChild(progDiv);

		});

		return programmsDiv;
	}

	/**
	 * Get minimal time to sync programms with each other
	 * Just 4 presentation
	 * @param programmsCol
	 */
	getMinMaxTime = (programmsCol) => {
		let minTime = new Date().getTime();
		let maxTime = 0;
		programmsCol.forEach((el) => {
			if (!minTime || el.start < minTime){
				minTime = el.start;
			}
			if (!maxTime || (el.start + el.duration) > maxTime){
				maxTime = el.start + el.duration;
			}
		});

		return {minTime, maxTime};
	}


	/**
	 * Apply draggable to timeline
	 * @param targetEl - element onclick which we start dragging
	 * @param dragEl - dragging element
	 * @param container - container element for limit min and max position of slider
	 * @param programmsList - element for sync scrolling on drag timeline
	 * @param timeLine - timeLine
	 */
	applyDrag = (targetEl, dragEl, container, programmsList, timeLine) => {
		const relation = programmsList.offsetWidth / container.offsetWidth;
		let selected = null; // Object of the element to be moved
		let	x_pos = 0;
		let x_elem = 0;

		function dragInit(elem) {
			selected = elem;
			x_elem = x_pos - selected.offsetLeft;
		}

		function move(e) {
			x_pos = document.all ? window.event.clientX : e.pageX;

			if (selected !== null) {
				let position = x_pos - x_elem;

				if (position < container.offsetLeft - 10){
					position = container.offsetLeft - 10
				} else if (position > container.offsetLeft + container.offsetWidth){
					position = container.offsetLeft + container.offsetWidth
				}

				selected.style.left = position + 'px';
				timeLine.scrollLeft = container.scrollLeft = (position - container.offsetLeft + 10)*relation;
			}
		}

		// Destroy the object when we are done
		function destroy() {
			selected = null;
		}

		// Bind the functions...
		targetEl.onmousedown = function () {
			dragInit(dragEl);
			return false;
		};

		document.onmousemove = move;
		document.onmouseup = destroy;
	}
}
