window.onload = () => {
  const ironhackBCN = {
    lat: 19.571015, 
    lng: -99.0366019
  };
  
  const markers = []
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  const center = {
    lat: undefined,
    lng: undefined
  };

function placeRestaurants(restaurants){
    restaurants.forEach(function(restaurant){
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
      markers.push(pin)
    });
}

fetch(`/api/restaurants`)
  .then(r => {
      if(!r.ok) return Promise.reject(r.statusText); 
      return r.json();
  })
  .then(response=>{
      placeRestaurants(response.docs)
      return console.log(response.docs);
  })
  .then(x => console.log(markers));

};

