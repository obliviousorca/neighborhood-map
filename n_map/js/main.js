     var locations = [{
         title: 'New York , USA',
         type: 'NA City',
         location: {
             lat: 40.730610,
             lng: -73.935242
         }
     },

     {
         title: 'London , England',
         type: 'EU City',
         location: {
             lat: 51.508530,
             lng: -0.076132
         }

     },

     {
         title: 'Rome , Italy',
         type: 'EU City',
         location: {
             lat: 41.9028,
             lng: 12.4964
         }
     },

     {
         title: 'Reykjavik , Iceland',
         type: 'EU City',
         location: {
             lat: 64,
             lng: -21
         }
     },

     {
         title: 'Ottawa , Canada',
         type: 'NA City',
         location: {
             lat: 45.4215,
             lng: -75.6981200
         }
     },

     {
         title: 'Sydney , Australia',
         type: 'AU City',
         location: {
             lat: -33,
             lng: 151
         }
     }

 ];
 var details;
 var a;
 var markers_visibility = [];
 var fourSqrsVenues = [];
 var fourSqrsData = [];
 var markers = [];
 var info_windows = [];
 var latlon;
 var location_marker;
 var map;

 function createMarker(lat, lon, infoText, imgData, typ) {

     var newmarker = new google.maps.Marker({

         position: new google.maps.LatLng(lat, lon),

         map: map,

         title: infoText,

         type: typ

     });

     markers_visibility.push(newmarker);

     function toggleBounce() {
         if (newmarker.getAnimation() === null) {
             newmarker.setAnimation(google.maps.Animation.BOUNCE);
             setTimeout(function() {
                 newmarker.setAnimation(null);
             }, 700);

         } else {
             newmarker.setAnimation(null);
         }
     }

     newmarker.addListener('click', toggleBounce);

     a = newmarker.infowindow = new google.maps.InfoWindow({

         content: imgData,
         type: typ
     });

     google.maps.event.addListener(newmarker, 'click', function() {


         var test = fourSqrsVenues;

         this.infowindow.open(map, this);

     });
 }

 function processMarker(_marker) {
     var _venueId;

     var _venueData;

     var fourSqrAPI = "https://api.foursquare.com/v2/venues/explore?ll=" + _marker.position.lat() + "," + _marker.position.lng() + "&client_id=RMUX5HBSR5HMDKG3RCXK3O2VIY0BCRNMSD14V2DGQV0PK02U&client_secret=I3TIMAEYGCPDPB1T0332OOF3O2JP454OZ0PVCGWOXB1UIR4Y&v=20170323";

     $.getJSON(fourSqrAPI).done(function(data) {


         var testData = data;

         $.each(data.response.groups, function(i, groups) {

             if (i === 0) {

                 $.each(groups.items, function(j, items) {

                     if (j === 0) {

                         var venueName = items.venue.name;

                         var venueCat = items.venue.categories[0].name;

                         $.each(items.tips, function(k, tips) {

                             if (k === 0) {

                                 var fName = tips.user.firstName;

                                 var lName = tips.user.lastName;

                                 if (fName === null) fName = "";

                                 if (lName === null) lName = "";

                                 var userDetails = fName + " " + lName;

                                 details = "<div style='font-size:17px;text-decoration:underline;font-weight:bold; margin-bottom:7px;'>" + _marker.title + "</div> <div style='margin-bottom:3px;'><span style='font-size:13px;font-weight:bold;'>Name:</span> " + venueName + "</br></div>  <div style='margin-bottom:3px;'> <span style='font-size:13px;font-weight:bold;'>Category:</span> " + venueCat + "</br></div>  <span style='font-size:13px;font-weight:bold;'>Tip:</span> " + tips.text + " (<i>submitted by: " + userDetails + "</i>)";

                                 createMarker(_marker.position.lat(), _marker.position.lng(), _marker.title, details, _marker.type);
                             }
                         });
                     }
                 });
             }
         });
     }).fail(function() {
         console.log("error");
     });
 }

 function randomIntFromInterval(min, max) {

     return Math.floor(Math.random() * (max - min + 1) + min);

 }

 function initAutocomplete() {

     map = new google.maps.Map(document.getElementById('map'), {

         center: {
             lat: 31.7917,
             lng: 7.0926
         },

         zoom: 3,

         mapTypeId: 'roadmap'

     });

     for (var i = 0; i < locations.length; i++) {

         location_marker = new google.maps.Marker({

             map: map,

             title: locations[i].title,

             position: locations[i].location,

             type: locations[i].type
         });
         location_marker.setVisible(false);
         vm.foodArray()[i].marker = location_marker;


         markers.push(location_marker);

         processMarker(location_marker, i);
     }
 }

 var ViewModel = function() {

     this.categoryList = [],

         // dynamically retrieve categories to
         // create drop down list later
         locations.map(food => {
             if (!this.categoryList.includes(food.type))
                 this.categoryList.push(food.type);
         }),

         this.foodArray = ko.observableArray(locations);
     // Observable Array for drop down list
     this.categories = ko.observableArray(this.categoryList);
     // This will hold the selected value from drop down menu
     this.selectedCategory = ko.observable();
     /**
             * Filter function, return filtered food by
             * selected category from
      <select>
          */
     this.filterFood = ko.computed(() => {
             if (!this.selectedCategory()) {
                 // No input found, return all food
                 return this.foodArray();
             } else {
                 // input found, match food type to filter
                 return ko.utils.arrayFilter(this.foodArray(), (food) => {
                     var teasfkj = this.selectedCategory().type;
                     var teasfkjzsd = this.selectedCategory();


                     for (var i = 0; i < markers_visibility.length; i++) {

                         var teasfsda = this.selectedCategory();

                         var teasfdsg = markers_visibility[i].type;

                         var ewsdzlkjv = markers_visibility[i];

                         markers_visibility[i].infowindow.close(map, markers_visibility[i]);

                         markers_visibility[i].setVisible(false);
                         // locations[i].marker.setAnimation(google.maps.Animation.BOUNCE);
                         if (this.selectedCategory() === markers_visibility[i].type) {
                             var test = "";
                             markers_visibility[i].setVisible(true);

                             //markers_visibility[i].infowindow.open(map, markers_visibility[i]);
                             //markers_visibility[i].setAnimation(google.maps.Animation.BOUNCE);
                             //setTimeout(function () {
                             //    markers_visibility[i].setAnimation(null);
                             //     }, 700);

                             //var bn = markers_visibility[i].setAnimation(null);
                             ///////////////////Find a way to check the selected category's titles and display in list
                             //locations[i].marker.setVisible(true);
                         }
                     }
                     return (food.type === this.selectedCategory());
                 });
             } //.conditional
         }), //.filterFood
         //.constructor

         // this.filterMarkers = function() {
         //      for(var i = 0; i < locations.length; i++) {
         //         this.marker = new google.maps.Marker({
         //             position: new google.maps.LatLng(locations[i].lat, locations[i].long),
         //             map: map,
         //             title: locations[i].title
         //         });
         //         if(selectedCategory() != locations[i].type){
         //             this.marker.setVisible(false);
         //         }
         //         else {
         //             this.marker.setVisible(true);
         //         }
         //      }
         // },
         this.focusMarker = function(place) {
             //i = 0;
             console.log(this.title);
             //for (var i = 0; i < locations.length; i++) {

             // console.log()
             // console.log(place.marker);
             // while(x
             //<5) {

             // if (markers_visibility[x]==location_marker.title){
             //     // setVisible(true)
             //     console.log('A')
             // }
             // x++;
             // }
             // location_marker[i].setVisible(false);
             //markers_visibility[1].setVisible(false);

             for (var i = 0; i < markers_visibility.length; i++) {

                 //var teasfsda = this.selectedCategory();

                 //var teasfdsg = markers_visibility[i].type;

                 var ewsdzlkjv = markers_visibility[i].title;

                 //markers_visibility[i].setVisible(false);

                 markers_visibility[i].infowindow.close(map, markers_visibility[i]);

                 if (this.title === markers_visibility[i].title) {
                     var teasfa = markers_visibility[i];
                     var test = "";
                     markers_visibility[i].infowindow.open(map, markers_visibility[i]);
                 }

             }

             // markers_visibility[0].createMarker.a.open(map, markers_visibility[0]);

             map.setCenter(this.location);

             map.setZoom(4);

         };
 };

 var vm = new ViewModel();
 ko.applyBindings(vm);

 // function focusMarker(place) {

 //     map.setCenter(locations[place].location);

 //     map.setZoom(4);

 // };

 // vm.filterMarkers();
 function gmapsError() {
     console.log("Google Maps has failed to load. Please check your internet connection and try again.");
 }

 $('.hamburger').on('click', function(e) {
     // Prevent link from jumping to the top of the page
     e.preventDefault();
     // If menu is already showing, slide it up. Otherwise, slide it down.
     $('.menu').toggleClass('slide-down');
 });
