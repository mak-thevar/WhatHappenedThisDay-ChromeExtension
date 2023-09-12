window.onload =  () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    document.getElementById("title").innerHTML = `What Happened This Day? (<i>${monthNames[d.getMonth()]} ${d.getDate()}</i>)`
    chrome.runtime.sendMessage({ action: 'scrapeData' }, (response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.html, 'text/html');
        const events = extractDataFromHTML(doc);
        console.log(events);
        populateEvents(events);
    });
};

function populateEvents(events) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear previous events
    events.forEach(event => {

        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.onclick = ()=>{
            window.open(`https://www.google.com/search?q=${event.title}`);
        }

        const title = document.createElement('div');
        title.className = 'event-title';
        title.textContent = event.title;

        const year = document.createElement('span');
        year.className = 'event-year';
        year.textContent = `(${event.year})`;

        const description = document.createElement('div');
        description.className = 'event-description';
        description.textContent = event.description;

        title.appendChild(year);
        eventItem.appendChild(title);
        eventItem.appendChild(description);
        
        eventList.appendChild(eventItem);
    });
}
