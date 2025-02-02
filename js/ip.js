document.addEventListener("DOMContentLoaded", function() {
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('ip-address').innerText = `${data.ip}`;
                document.getElementById('country').innerText = `Country: ${data.country}`;
                document.getElementById('city').innerText = `City: ${data.city}`;
                document.getElementById('location').innerText = `Location: ${data.loc}`;
                document.getElementById('time').innerText = `Access Time: ${new Date().toLocaleString()}`;
                document.getElementById('software').innerText = `Soft: ${data.org}`;
            })
            .catch(error => console.error('Error:', error));
    });
   