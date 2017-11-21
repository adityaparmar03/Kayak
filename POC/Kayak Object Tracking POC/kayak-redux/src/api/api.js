const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5000'

const headers = {
    'Accept': 'application/json'
};

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

