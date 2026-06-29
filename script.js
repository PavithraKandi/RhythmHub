let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchBtn');
let searchResults = document.getElementById('searchResults');

let trendingId = document.getElementById("trendingId");
let melodyId = document.getElementById("melodyId");
let partyId= document.getElementById("partyId");


displayResults = function(results,container) {
    
    if(results.length === 0){
        let p = document.createElement("p");
        container.appendChild(p);
        p.classList.add("text-gray-500","m-3");
        p.textContent = "No songs found";
        return;
    }
    for(let song of results) {
        const { trackName, artistName, artworkUrl100, previewUrl } = song;
        let card = document.createElement('div');
        container.appendChild(card);
        card.classList.add("bg-white", "rounded-xl", "shadow-lg", "p-4");
        let img = document.createElement('img');
        img.classList.add("w-full", "h-52", "object-cover", "rounded-lg","cursor-pointer");
        card.appendChild(img);
        img.src = artworkUrl100;
        let audio = document.createElement('audio');
        card.appendChild(audio);
        audio.classList.add("w-full", "mt-2");
        audio.src = previewUrl;
        let title = document.createElement('h3');
        card.appendChild(title);
        title.classList.add("text-lg", "font-semibold", "mt-2");
        title.textContent = trackName; 
        let artist = document.createElement('p');
        artist.classList.add("text-gray-600", "mt-1");
        card.appendChild(artist);
        artist.textContent = artistName;
        
        audio.controls = true;
    }      
        
} 
function searchSongs(query,container,showAll){    
     
    
    // Perform search functionality here
    console.log("Search button clicked!");
    
    let url = "https://itunes.apple.com/search?term=" + query + "&country=us&entity=musicTrack";
    console.log(url);
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(showAll){
            displayResults(data.results,container);
        }else{
            displayResults([data.results[0]],container);
        }
       
    });

};

searchButton.addEventListener('click', function() {
   searchResults.innerHTML = ''; 
   searchSongs(searchInput.value.trim(),searchResults,true);
});

searchInput.addEventListener('keydown',function(event){
    if(event.key === "Enter"){
        searchResults.innerHTML = '';
        searchSongs(searchInput.value.trim(),searchResults,true);
    }
});

const trending = [
    "believer","thassadiya","chamiki","hellallallo"
]
const melody = [
    "parichayamila","Pilichina","Idhedho Bagundhe","Sahiba"
]
const party = [
    "Psycho Saiyaan","Seeti Maar","Ringa Ringa","Odiyamma"
]
trendingId.innerHTML = '';
for(let song of trending){
    searchSongs(song,trendingId,false);
}
melodyId.innerHTML = '';
for(let song of melody){
    searchSongs(song,melodyId,false);
}
partyId.innerHTML = '';
for(let song of party){
    searchSongs(song,partyId,false);
}