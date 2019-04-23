let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1' : 
        APIURL = 'http://localhost:3008';
        break;

    case 'blue-final-project-client.com' : 
        APIURL = 'https://blue-final-project-database.herokuapp.com';
        break;    
    
    default: 
        APIURL = 'https://blue-final-project-database.herokuapp.com';
        break;
}

export default APIURL;