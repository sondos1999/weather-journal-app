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

    const getTemperature = async(baseURL, zipcode, apikey) => {

        const response = await fetch(baseURL + zipcode + ',us' + apikey)
        console.log(response);
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('Error', error);
        }
    }

    const postData = async(url = '', data = {}) => {
        const postRequest = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        try {

            const newData = await postRequest.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log('Error', error);
        }
    }


    getTemperature(baseURL, zipcode, apikey)
        .then(function(data) {
            // Add data to POST request

            postData('/add', { temperature: data.main.temp, date: newDate, user_response: feelings })
                // Function which updates UI
                .then(function() {
                    updateUI()
                })
        })
}

// Async GET



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
