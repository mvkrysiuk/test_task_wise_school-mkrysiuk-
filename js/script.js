import {getDataFromApi} from "./connectApi.js";
import {calculateTimeDiff} from "./time.js";
import {renderTime} from "./time.js";
import {calculateSpeed} from "./time.js";
import {renderSpeed} from "./time.js";


const inputStartTime = document.getElementById('start_time');
const inputFinishTime = document.getElementById('finish_time');
inputStartTime.addEventListener('click', evt => {
    return evt.target.type = 'datetime-local';
});
inputFinishTime.addEventListener('click', evt => {
    return evt.target.type = 'datetime-local';
});

const renderList = document.querySelector('.render_list');
const totalDistance = document.querySelector('.total_distance');
const longestDistance = document.querySelector('.longest_distance');

async function renderActivityTracker() {
    const dataTracker = await getDataFromApi();
    let totalsDistanceByActivity = [];
    let longestData = [];

    for(let item of dataTracker.items) {
        let resultObj = {
            date : new Date(item.start_time),
            activity_type: item.activity_type,
            distance: item.distance,
            times: calculateTimeDiff(item.start_time, item.finish_time)
         };
        resultObj.speed = calculateSpeed(item.distance, resultObj.times);

    if(totalsDistanceByActivity[item.activity_type] === undefined) {
        totalsDistanceByActivity[item.activity_type] = 0; 
    }
    totalsDistanceByActivity[item.activity_type] += Number(item.distance); 

    if(longestData[item.activity_type] === undefined) {
        longestData[item.activity_type] = resultObj;
    }
    if(Number(item.distance) > longestData[item.activity_type].distance) {
        longestData[item.activity_type] = resultObj;
    }

    renderList.innerHTML += `
        <div class="list"> 
            <span class="record">${resultObj.date.toLocaleDateString('en-us', {month:"long", day:"numeric"})}</span>
            <span class="record">${resultObj.activity_type}</span>
            <span class="record">${resultObj.distance + " km"}</span>
            <span class="record">${renderTime(resultObj.times)}</span>
            <span class="record">${renderSpeed(resultObj.speed)}</span>
        </div>
    `;
    }

    for(let index in totalsDistanceByActivity) {
        totalDistance.innerHTML += `
            <p>Total ${index.toLowerCase()} distance: <span class="record_total">${totalsDistanceByActivity[index]} km</span></p>
        `;
    }

    for(let index in longestData) {
        longestDistance.innerHTML += `
            <span class="longest_index">Longest ${index.toLowerCase()}:</span>
            <span class="record_longest_data">${longestData[index].date.toLocaleDateString('en-us', {month:"short", day:"numeric"})}</span>
            <span class="record_longest_distance">${longestData[index].distance} km </span>
            <span class="record_longest_time">${renderTime(longestData[index].times)}</span>
        `;
    }
}

renderActivityTracker();


