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
    fetch(`${api}/users/login`, {
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
//payload = {
//firstname
//lastname
//email
//password
//type - (this should be user or admin)
//}
export const doRegister = (payload) =>
 fetch(`${api}/users/register`, {
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
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is an API error");
            return error;
        });

