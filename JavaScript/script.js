import Calendar from './Calendar.mjs'

// DOM Elements constants
const monthElement = document.getElementById("monthElement");
const yearElement = document.getElementById("yearElement");

const leftKey = document.getElementById("leftKey");
const rightKey = document.getElementById("rightKey");

const datesDiv = document.getElementById("datesDiv");
const todayBtn = document.getElementById("todayBtn");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
const meredian = document.getElementById("meredian")

const inputMonth  = document.getElementById("inputMonth");
const inputYear  = document.getElementById("inputYear");

const goToDateBtn  = document.getElementById("goToDateBtn");
const addBtn = document.getElementById("addBtn");
const seeAllBtn = document.getElementById("seeAllBtn");

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// some variables and functions
let today = new Date();
let monthIndex = today.getMonth()
let year = today.getFullYear();
let minutesValue = today.getMinutes();
let secondsValue = today.getSeconds();
let hoursValue = today.getHours();
let clickedDate = ""

// some utility functions
function generateCalenderWithTodaysDate(dateObject){
    let calendar = new Calendar(months[dateObject.getMonth()],dateObject.getFullYear())
    monthElement.innerHTML = months[dateObject.getMonth()].toUpperCase()
    yearElement.innerHTML = dateObject.getFullYear()
    calendar.returnArray().forEach((date,index)=>{
        let d = document.createElement("span")    
        if(index > calendar.returnArray().lastIndexOf(calendar.calculateNumberOfDays()) || index < calendar.returnArray().indexOf(1)){
            d.classList.add("blur")
        }
        if(dateObject.getDate() === date && !d.classList.contains("blur")){
            d.classList.add("active")
            d.setAttribute("title","Today")
        }
        d.classList.add("date")
        
        d.innerHTML = date;
        d.addEventListener("click",()=>{
            if(d.innerHTML === String(today.getDate()) && !d.classList.contains("blur")){
                document.querySelectorAll(".date").forEach(item=>{
                item.classList.remove("active") 
            })
                d.classList.add("active")
                d.classList.remove("activeColor");
                return;
            }
            clickedDate = new Date(`${d.innerHTML} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`).toDateString()
            document.querySelectorAll(".date").forEach(item=>{
                item.classList.remove("active")  
                if(Number(item.innerHTML) === today.getDate() && !item.classList.contains("blur")){
                    item.classList.add("activeColor")
                }
            })
            d.classList.add("active")
            //TODO Local Storage
        })
        datesDiv.appendChild(d);
    })
}

function generateCalendar(dateObject){
    let calendar = new Calendar(months[dateObject.getMonth()],dateObject.getFullYear())
    monthElement.innerHTML = months[dateObject.getMonth()].toUpperCase()
    yearElement.innerHTML = dateObject.getFullYear()
    calendar.returnArray().forEach((date,index)=>{
        let d = document.createElement("span")
        
        if(index > calendar.returnArray().lastIndexOf(calendar.calculateNumberOfDays()) || index < calendar.returnArray().indexOf(1)){
            d.classList.add("blur")
        }
        d.classList.add("date")
        d.innerHTML = date;
        d.addEventListener("click",()=>{
            document.querySelectorAll(".date").forEach(item=>item.classList.remove("active"))
            d.classList.add("active");
            clickedDate = new Date(`${d.innerHTML} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`).toDateString()
        })
        datesDiv.appendChild(d);
    })
}

// function for saving data in local storage 
function addToLocalStorage(object){
    if(window.localStorage.getItem("Calendar") === null){
        window.localStorage.setItem("Calendar","[]");
    }
    let array = JSON.parse(window.localStorage.getItem("Calendar"));
    array = [...array,object];
    window.localStorage.setItem("Calendar",JSON.stringify(array));
}

// Main Logic Starts
// updating today's date
window.addEventListener("DOMContentLoaded",()=>{
    generateCalenderWithTodaysDate(today)
    hours.innerHTML = today.getHours() < 13 ? today.getHours() < 10 ? `0${today.getHours()}` : today.getHours() : today.getHours() - 12 < 10  ? `0${today.getHours()-12}` : today.getHours() - 12;
    minutes.innerHTML = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    seconds.innerHTML = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    meredian.innerHTML = today.getHours() > 13 ? "PM" : "AM"
})

// rendering the clock in every second
setInterval(()=>{
    secondsValue++;
    if(secondsValue >=60){
        secondsValue = 0;
        minutesValue++;
    }
    if(minutesValue >=60){
        minutesValue = 0;
        hoursValue++;
    }
    hours.innerHTML = hoursValue < 13 ? hoursValue < 10 ? `0${hoursValue}` : hoursValue : hoursValue - 12 < 10  ? `0${hoursValue-12}` :hoursValue - 12;
    minutes.innerHTML = minutesValue < 10 ? `0${minutesValue}` : minutesValue;
    seconds.innerHTML = secondsValue < 10 ? `0${secondsValue}` : secondsValue;
    meredian.innerHTML = today.getHours() > 13 ? "PM" : "AM"
},1000)
    
// goto todays date
todayBtn.addEventListener("click",()=>{
    datesDiv.innerHTML = "";
    generateCalenderWithTodaysDate(today);
    year = today.getFullYear()
    monthIndex = today.getMonth()
})

// going back in year
leftKey.addEventListener("click",()=>{
    datesDiv.innerHTML = ""
    monthIndex--;
    if(monthIndex === -1){
        monthIndex = 11;
        year --;
    }
    let date = new Date();
    date.setMonth(monthIndex)
    date.setFullYear(year)
    generateCalendar(date);
    if(monthIndex === today.getMonth() && year === today.getFullYear()){
        datesDiv.innerHTML = ""
        generateCalenderWithTodaysDate(today);
        return;
    }
})

// going forward in year
rightKey.addEventListener("click",()=>{
    datesDiv.innerHTML = ""
    monthIndex++;
    if(monthIndex === 12){
        monthIndex = 0;
        year ++;
    }
    let date = new Date();
    date.setMonth(monthIndex)
    date.setFullYear(year)
    generateCalendar(date);
    if(monthIndex === today.getMonth() && year === today.getFullYear()){
        datesDiv.innerHTML = ""
        generateCalenderWithTodaysDate(today);
        return;
    }
})

// going to random date using Bootstrap modal
goToDateBtn.addEventListener("click",()=>{
   if(inputMonth.value !== "" && inputYear.value !== ""){
       let date = new Date();
       year = Number(inputYear.value)
       monthIndex = Number(inputMonth.value);
       date.setFullYear(Number(inputYear.value))
       date.setMonth(Number(inputMonth.value))
       datesDiv.innerHTML = ""
       generateCalendar(date)
       document.getElementById("closeBtn").click()
       inputYear.value = "";
       inputMonth.value = "";  
       document.getElementById("closeBtn").click()
       inputYear.value = "";
       inputMonth.value = "";
    }
})

// adding an event 
let eventDesciption = document.getElementById("eventDesciption")
let inputDate = document.getElementById("inputDate")
addBtn.addEventListener("click",()=>{
    let dateElement = document.querySelector(".active")
    inputDate.value = new Date(`${dateElement.innerHTML} ${months[monthIndex]} ${year}`).toDateString()

})

// saving that event in Local Storage
document.getElementById("saveBtn").addEventListener("click",()=>{
    let object = {
        date:inputDate.value,
        text:eventDesciption.value,
    }

    if(eventDesciption.value !== ""){
        addToLocalStorage(object);
    }

    inputDate.value = ""
    eventDesciption.value = ""
    document.getElementById("closeEventDescriptionBtn").click()
})

// displaying all events
seeAllBtn.addEventListener("click",()=>{
    let allEventsContainer = document.getElementById("allEventsContainer")
    allEventsContainer.innerHTML = "";

    if(window.localStorage.getItem("Calendar") === null || JSON.parse(window.localStorage.getItem("Calendar")) === []){
        allEventsContainer.innerHTML = "<h3 class='text-center' >Nothing to Show</h3>";
    }
    else{

        let array = JSON.parse(window.localStorage.getItem("Calendar"));
        array.forEach((item,index)=>{
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.margin = "10px"
        card.innerHTML = ` <div class="card-body">
        <h5 class="card-title">${item.date}</h5>
        <p class="card-text">${item.text}</p>
        <i id="deleteBtn${index}" class="fas fa-trash-alt"></i>
         </div>`

        allEventsContainer.appendChild(card);

        let btn= document.getElementById(`deleteBtn${index}`);
        btn.addEventListener("click",()=>{
            array.splice(index,1);
            btn.parentElement.parentElement.remove();
            window.localStorage.setItem("Calendar",JSON.stringify(array));
        })
    })
}

})

// clearing all events in Local Storage
document.getElementById("clearAll").addEventListener("click",()=>{
    window.localStorage.removeItem("Calendar")
    document.getElementById("closeSeeAllModal").click()
})