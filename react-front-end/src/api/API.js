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

export const doLogout = (payload) =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(payload),
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
export const gethistory = () =>
    fetch(`${api}/user/bookinghistory`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
       // body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************

export const getAllUsers = () =>
    fetch(`${api}/admin/getallusers`, {
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
export const deleteUser = (payload) =>
    fetch(`${api}/user/delete`, {
        method: 'delete',
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
 fetch(`${api}/user/update`, {
        method: 'PUT',
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
export const upload = (payload) =>
    fetch(`${api}/user/upload`, {
        method: 'POST',
        body:payload,
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
export const addVendorApi = (payload) =>
    fetch(`${api}/admin/addvendor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
    .catch(error => {
        console.log("This is an API error");
        return error;
    });


export const deleteVendorApi = (payload) =>
    fetch(`${api}/admin/deletevendor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {

        return res.status;
    })
    .catch(error => {
        console.log("This is an API error");
        return error;
    });

export const getVendors = (payload) =>
    fetch(`${api}/admin/vendors`, {
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


export const getBills = () =>
    fetch(`${api}/admin/bills`, {
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



export const searchFlights = (payload) =>
    fetch(`${api}/flight/flights?origincity=`+payload.origincity+`&originstate=`+payload.originstate+
                `&destinationcity=`+payload.destinationcity+`&destinationstate=`+payload.destinationstate
                +`&triptype=`+payload.triptype+`&flightclass=`+payload.flightclass+`&departureday=`+payload.departureday+
                    `&arrivalday=`+payload.arrivalday, {
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
    fetch(`${api}/hotel/hotels?city=`+payload.city+`&state=`+payload.state+`&occupancy=`+payload.occupancy, {
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
    fetch(`${api}/car/cars?pickupcity=`+payload.pickupcity+`&pickupstate=`+payload.pickupstate+
        `&dropoffcity=`+payload.dropoffcity+`&dropoffstate=`+payload.dropoffstate, {
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

export const clickTracker = (payload) =>
    fetch(`${api}/analytics/clicktracker`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("This is an API error");
        return error;
    });



export const addHistory = (payload) =>
    fetch(`${api}/user/addhistory`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });


export const searchHistory = () =>
    fetch(`${api}/user/searchhistory`, {
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


export const bookFlight = (payload) =>
    fetch(`${api}/flight/book`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("Error booking flight");
        return error;
    });

export const bookCar = (payload) =>
    fetch(`${api}/car/book`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("Error booking Car");
        return error;
    });


export const bookHotel = (payload) =>
    fetch(`${api}/hotel/book`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("Error booking Hotel");
        return error;
    });



export const addFlight = (payload) =>
    fetch(`${api}/flight/addflight`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error booking flight");
            return error;
        });

export const getFlightList = () =>
    fetch(`${api}/flight/getflightlist`, {
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




export const addCar = (payload) =>
    fetch(`${api}/car/addcar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error booking car");
            return error;
        });

export const getCarList = () =>
    fetch(`${api}/car/getcarlist`, {
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



export const addHotel = (payload) =>
    fetch(`${api}/hotel/addhotel`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error booking hotel");
            return error;
        });

export const getHotelList = () =>
    fetch(`${api}/hotel/gethotellist`, {
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



export const getChart = (payload) =>
    fetch(`${api}/analytics/getchart`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("This is an API error");
        return error;
    });



export const deleteHotel = (payload) =>
    fetch(`${api}/hotel/deletehotel`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error deleting hotel");
            return error;
        });


export const deleteFlight = (payload) =>
    fetch(`${api}/flight/deleteflight`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error deleting flight");
            return error;
        });


export const deleteCar = (payload) =>
    fetch(`${api}/car/deletecar`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("Error deleting car");
            return error;
        });