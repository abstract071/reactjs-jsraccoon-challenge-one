"use strict";

var AppAPI = {
    requestUsers: (url) =>
        fetch(url).then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                console.log('Network response was not ok.');
            }
        })
};

export default AppAPI;