const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=ea792f352b45cbf73fa10d8de6b236a5';
const error = '';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// button event lisner function

document.getElementById('generate').addEventListener('click', performAction);

function performAction(a) {
    const zipcode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);

    const getdata = async(baseURL, zipcode, apikey) => {

        const response = await fetch(baseURL + zipcode + ',us' + apikey);
        const data = await response.json();
        console.log(response);
        try {
            console.log(data);
            return data
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
            body: JSON.stringify(data)
        });
        try {

            const newdata = await postRequest.json();
            console.log(newdata);
            return newdata;
        } catch (error) {
            console.log('Error', error);
        }
    }


    getdata(baseURL, zipcode, apikey)
        //post data
        .then((data) => postData('/add', { temp: getdata.data, date: newDate, content: feelings }))
        // calling function uqdate ui
        .then(() => updateUI())
        //function to add data in gui

    const updateUI = async() => {
        const request = await fetch('/all');
        try {

            const allData = await request.json()
                // update new entry values
            console.log(allData);
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp;
            document.getElementById('content').innerHTML = allData.content;
        } catch (error) {
            console.log("error", error);
        }
    }
}
