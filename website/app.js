/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=ea792f352b45cbf73fa10d8de6b236a5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);

    getTemperature(baseURL, zipcode, apikey)
        .then(function(userData) {
            // add data to POST request
            postData('/add', { temperature: data.main.temp, date: newDate, user_response: feelings })
        }).then(function(newData) {
            // call updateUI to update browser content
            updateUI()
        })
        // reset form

}



// Async GET
const getTemperature = async(baseURL, zipcode, apikey) => {
        // const getTemperatureDemo = async (url)=>{
        const response = await fetch(baseURL + zipcode + ',ur' + apikey)
        console.log(response);
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    //post route
const postData = async(url = '', data = {}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: data.date,
                temp: data.temp,
                content: data.content
            })
        })
        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) { console.log(error); }
    }
    //update ui elemnet
const updateUI = async() => {
    const request = await fetch('/all');
    try {

        const allData = await request.json()
            // update new entry values
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].content;
    } catch (erorr) { console.log(error) }


}

