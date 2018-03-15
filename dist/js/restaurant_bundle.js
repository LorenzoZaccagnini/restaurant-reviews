!function i(o,u,c){function l(t,e){if(!u[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(s)return s(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var a=u[t]={exports:{}};o[t][0].call(a.exports,function(e){var n=o[t][1][e];return l(n||e)},a,a.exports,i,o,u,c)}return u[t].exports}for(var s="function"==typeof require&&require,e=0;e<c.length;e++)l(c[e]);return l}({1:[function(e,n,t){"use strict";navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js",{scope:"./"}).then(function(){console.log("Service worker has been successfully registered.")}).catch(function(e){console.log("error ",e)})},{}],2:[function(e,n,t){"use strict";var r=function(){function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}();var a=function(){function t(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t)}return r(t,[{key:"openDatabase",value:function(){if(!navigator.serviceWorker)return Promise.resolve()}}],[{key:"fetchRestaurants",value:function(n){fetch(t.DATABASE_URL,{credentials:"same-origin"}).then(function(e){return e.json()}).then(function(e){return n(null,e)}).catch(function(e){return n(e,null)})}},{key:"fetchRestaurantById",value:function(r,a){t.fetchRestaurants(function(e,n){if(e)a(e,null);else{var t=n.find(function(e){return e.id==r});t?a(null,t):a("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(r,a){t.fetchRestaurants(function(e,n){if(e)a(e,null);else{var t=n.filter(function(e){return e.cuisine_type==r});a(null,t)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,a){t.fetchRestaurants(function(e,n){if(e)a(e,null);else{var t=n.filter(function(e){return e.neighborhood==r});a(null,t)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,a,i){t.fetchRestaurants(function(e,n){if(e)i(e,null);else{var t=n;"all"!=r&&(t=t.filter(function(e){return e.cuisine_type==r})),"all"!=a&&(t=t.filter(function(e){return e.neighborhood==a})),i(null,t)}})}},{key:"fetchNeighborhoods",value:function(a){t.fetchRestaurants(function(e,t){if(e)a(e,null);else{var r=t.map(function(e,n){return t[n].neighborhood}),n=r.filter(function(e,n){return r.indexOf(e)==n});a(null,n)}})}},{key:"fetchCuisines",value:function(a){t.fetchRestaurants(function(e,t){if(e)a(e,null);else{var r=t.map(function(e,n){return t[n].cuisine_type}),n=r.filter(function(e,n){return r.indexOf(e)==n});a(null,n)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"/img/"+e.photograph+".jpg"}},{key:"mapMarkerForRestaurant",value:function(e,n){return new google.maps.Marker({position:e.latlng,title:e.name,url:t.urlForRestaurant(e),map:n,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337/restaurants"}}]),t}();n.exports=a},{}],3:[function(e,n,t){"use strict";var r,a=e("./dbhelper"),i=(r=a)&&r.__esModule?r:{default:r};var o,u=void 0;window.initMap=function(){c(function(e,n){e?console.error(e):(o=new google.maps.Map(document.getElementById("map"),{zoom:16,center:n.latlng,scrollwheel:!1}),h(),i.default.mapMarkerForRestaurant(u,o))})};var c=function(t){if(u)t(null,u);else{var e=m("id");e?i.default.fetchRestaurantById(e,function(e,n){(u=n)?(l(),t(null,n)):console.error(e)}):(error="No restaurant id in URL",t(error,null))}},l=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var n=document.getElementById("restaurant-img");n.className="restaurant-img",n.src=i.default.imageUrlForRestaurant(u),n.alt=e.name+" restaurant's photo.",document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,u.operating_hours&&s(),f()},s=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u.operating_hours,n=document.getElementById("restaurant-hours");for(var t in e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=t,r.appendChild(a);var i=document.createElement("td");i.innerHTML=e[t],r.appendChild(i),n.appendChild(r)}},f=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u.reviews,n=document.getElementById("reviews-container"),t=document.createElement("h3");if(t.innerHTML="Reviews",n.appendChild(t),!e){var r=document.createElement("p");return r.innerHTML="No reviews yet!",void n.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(d(e))}),n.appendChild(a)},d=function(e){var n=document.createElement("li");n.tabIndex=0;var t=document.createElement("h4");t.innerHTML=e.name,n.appendChild(t);var r=document.createElement("h6");r.innerHTML=e.date,n.appendChild(r);var a=document.createElement("h5");a.innerHTML="Rating: "+e.rating,n.appendChild(a);var i=document.createElement("p");return i.innerHTML=e.comments,n.appendChild(i),n},h=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u,n=document.getElementById("breadcrumb"),t=document.createElement("li");t.innerHTML=e.name,n.appendChild(t)},m=function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}},{"./dbhelper":2}],4:[function(e,n,t){"use strict";var r="restaurant-reviews-v1";self.addEventListener("install",function(e){e.waitUntil(caches.open(r).then(function(e){return e.addAll(["/","/img","restaurant.html","index.html","js/app.js","js/main.js","js/dbhelper.js","js/restaurant_info.js","css/styles.css","https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css","https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"]).catch(function(e){return console.log("caches open : ",e)})}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==r)return caches.delete(e)}))}))}),self.addEventListener("fetch",function(t){var e=t.request.url;if(e.startsWith("chrome-extension://")||e.startsWith("https://csi.gstatic.com")||e.startsWith("https://maps.googleapis.com"))return fetch(t.request);t.respondWith(caches.open(r).then(function(n){return n.match(t.request).then(function(e){return e||fetch(t.request).then(function(e){return n.put(t.request,e.clone()),e})})}))})},{}]},{},[3,2,1,4]);
//# sourceMappingURL=maps/restaurant_bundle.js.map