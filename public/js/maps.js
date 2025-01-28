


          maptilersdk.config.apiKey = maptoken;
        

          
          const map = new maptilersdk.Map({
            container: 'map', // container's id or the HTML element in which the SDK will render the map
            style: maptilersdk.MapStyle.STREETS,
            center: [77.2088,28.6139], // starting position [lng, lat]
            zoom: 14 ,// starting zoomZ
            geolocate: maptilersdk.GeolocationType.POINT
          });
          const gc = new maptilersdkMaptilerGeocoder.GeocodingControl({
            enableReverse: "always",
            adjustUrl(url) {
              // for reverse geocoding use only address type
              if (/\/\d+\.?\d*%2C\d+.?\d*.json$/.test(url.pathname)) {
                url.searchParams.set("types", "address");
                url.searchParams.set("limit", "3");
              }
            },
          });
          var popup = new maptilersdk.Popup({ offset: 25 }).setText(
            'Your Holiday Destination'
        );
    
        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';

          map.addControl(gc, 'top-left');
          const marker = new maptilersdk.Marker()
  .setLngLat([ 77.2088,28.6139])
  .setPopup(popup)
  .addTo(map);