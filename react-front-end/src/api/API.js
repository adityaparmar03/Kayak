const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};


//Sample

//************************************************************************************************
/*payload = {
email
password
type - (this should be user or admin)
}*/

export const doLogin = (payload) => 
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
         console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


//************************************************************************************************
//payload = {
//email
//password
//}
export const doRegister = (payload) =>
 fetch(`${api}/user/register`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************


export const checkSession = () =>
 fetch(`${api}/user/checkSession`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************

//payload = {
//email
//password
//firstname
//lastname
//streetaddress
//city
//zzip code etc
//}
export const doUpdate = (payload) =>
 fetch(`${api}/users/update`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {

        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************



/*
payload=
{
userId:"userId",
sessionId:"sessionId",
eventTime:this.timeConverter(date.getTime()),
eventName:"eventName",
pageId:"pageId",
buttonId:"buttonId",
objectId:"objectId"
}
*/
export const clickTracker = (payload) =>
    fetch(`${api}/clicktracker`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {



        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });


        

// export const searchFlights = (payload) =>
//     fetch(`${api}/flight/flights?origincity=San Jose&originstate=CA&destinationcity=Delhi&destinationstate=Delhi&triptype=One-Way&flightclass=economy`, {
//         method: 'GET',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         credentials:'include'
//     }).then(res => {

//         return res.json();
//     })
//         .catch(error => {
//             console.log("This is an API error");
//             return error;
//         });


// export const searchHotels = (payload) =>
//     fetch(`${api}/hotel/hotels?city=San Jose&state=CA&roomtype=delux`, {
//         method: 'GET',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         credentials:'include'
//     }).then(res => {


//         return res.json();
//     })
//         .catch(error => {
//             console.log("This is an API error");
//             return error;
//         });


export const searchFlights = (payload) =>
    fetch(`${api}/flight/flights?origincity=`+payload.origincity+`&originstate=`+payload.originstate+
                `&destinationcity=`+payload.destinationcity+`&destinationstate=`+payload.destinationstate
                +`&triptype=`+payload.triptype+`&flightclass=`+payload.flightclass+`&departureday=`+payload.departureday, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then(res => {

        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });


export const searchHotels = (payload) =>
    fetch(`${api}/hotel/hotels?city=San Jose&state=CA&roomtype=delux`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then(res => {

        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });




export const searchCars = (payload) =>
    fetch(`${api}/car/cars?pickupcity=San Jose&pickupstate=CA&dropoffcity=San Jose&dropoffstate=CA&triptype=Two-Way`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then(res => {

        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });
