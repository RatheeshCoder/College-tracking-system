    // Sample bus data (replace with real-time data)
    const busLocations = [
        { id: "Bus001", route: "RouteA", lat: 11.0168, lng: 76.9558,busType:"Normal",busTime:"11:00",price:"$100",ConName:"Sam",ConPh:1234567890,service:"12/12/2023",womenFree:"YES" },
        { id: "Bus002", route: "RouteB", lat: 10.9925, lng: 76.9614,busType:"Deluxe",busTime:"12:00",price:"$100",ConName:"John",ConPh:987654321,service:"10/2/2023",womenFree:"NO" },
        { id: "Bus003", route: "RouteC", lat: 11.0256, lng: 76.9460,busType:"Normal",busTime:"01:00",price:"$100",ConName:"Kumar",ConPh:67890654321,service:"1/1/2023",womenFree:"YES" },
        { id: "Bus004", route: "RouteD", lat: 11.0150, lng: 76.9684 ,busType:"Deluxe",busTime:"04:00",price:"$100",ConName:"Mani",ConPh:890-7654321,service:"11/5/2023",womenFree:"NO"},
      
    ];

    // Initialize Leaflet map
    const map = L.map('map').setView([11.0168, 76.9558], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Define a set of unique colors for routes
    const routeColors = {
        RouteA: 'red',
        RouteB: 'blue',
        RouteC: 'green',
        RouteD: 'purple',
        RouteE: 'orange',
    };

    // Create a layer group to manage markers
    const markerLayer = L.layerGroup().addTo(map);

    // Function to add bus markers to the map
    function addBusMarkers(busData) {
        busData.forEach(bus => {
            const marker = L.marker([bus.lat, bus.lng], {
                icon: new L.Icon({
                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${routeColors[bus.route] || 'gray'}.png`,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                })
            });

            // Attach a popup to the marker with the bus ID and route
            marker.bindPopup(`Bus ID: ${bus.id}, Route: ${bus.route}`);
            marker.on('mouseover', function () {
                this.openPopup();
            });

            markerLayer.addLayer(marker);
        });
    }

    // Add initial bus markers
    addBusMarkers(busLocations);

    // Function to track a specific bus by its number and route
    function trackBus() {
        const selectedBusNumber = document.getElementById("busNumber").value;
        const selectedBusRoute = document.getElementById("busRoute").value;

        // Clear existing markers and close any open popups
        markerLayer.clearLayers();

        // Find the selected bus in the data
        const selectedBus = busLocations.find(bus => bus.id === selectedBusNumber && bus.route === selectedBusRoute);

        if (selectedBus) {
            // Add a marker for the selected bus
            const marker = L.marker([selectedBus.lat, selectedBus.lng]).addTo(map);

            // Zoom in to the location of the selected bus with a fly-in effect
            map.flyTo([selectedBus.lat, selectedBus.lng], 15, {
                duration: 2
            });

            // Open a popup at the bus's location
            marker.bindPopup(`Bus ID: ${selectedBus.id}, Route: ${selectedBus.route}`).openPopup();

            // Display the selected bus information
            document.getElementById("selectedBusNumber").textContent = selectedBus.id;
            document.getElementById("selectedBusRoute").textContent = selectedBus.route;
            document.getElementById("busType").textContent = selectedBus.busType;
            document.getElementById("busTime").textContent = selectedBus.busTime;
            document.getElementById("price").textContent = selectedBus.price;
            document.getElementById("ConName").textContent = selectedBus.ConName;
            document.getElementById("ConPh").textContent = selectedBus.ConPh;
            document.getElementById("service").textContent = selectedBus.service;
            document.getElementById("womenFree").textContent = selectedBus.womenFree;
            document.getElementById("busInfo").style.display = "block";
        } else {
            // Show an alert if the bus is not found
            alert("Bus not found!");
        }
    }

    // Add an event listener to the search button
    document.getElementById("searchButton").addEventListener("click", trackBus);

    // Make the latitude and longitude fields readonly
    document.getElementById("busNumber").readOnly = true;
    document.getElementById("busRoute").readOnly = true;