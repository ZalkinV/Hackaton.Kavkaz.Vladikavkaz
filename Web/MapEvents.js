window.geoWatchId;

window.userRouteButton = document.getElementById("userRouteButton");
userRouteButton.addEventListener('click', function() {
    if (userRouteButton.className != "activeButton")
    {
        userRouteButton.className = "activeButton";
        BuildingUserPath();
    }
    else
    {
        userRouteButton.className = "";
        navigator.geolocation.clearWatch(geoWatchId);
    }
});

window.getCurrentPositionButton = document.getElementById("getCurrentPositionButton");
getCurrentPositionButton.addEventListener('click', function () {
    if (getCurrentPositionButton.className != "activeButton")
    {
        getCurrentPositionButton.className = "activeButton";
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var newPositionPoint = new H.geo.Point(latitude, longitude);
            window.currentPositionMarker = new H.map.Marker(newPositionPoint);
            histMap.addObject(currentPositionMarker);
            histMap.setCenter({lat: latitude, lng: longitude});
            histMap.setZoom(15);
        });
    }
    else
    {
        getCurrentPositionButton.className = "";
        histMap.removeObject(currentPositionMarker);
    }
});

function BuildingUserPath(minDistance = 0.0000001)
{
    var pointsLine = new H.geo.LineString();
    var previousPoint = undefined;
    var route;

    geoWatchId = navigator.geolocation.watchPosition(
        function (position)
        {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var newPositionPoint = new H.geo.Point(latitude, longitude);

            //если расстояние от новой до последней добавленной точки больше минимального
            if (previousPoint == undefined)
            {
                pointsLine.pushPoint(newPositionPoint);
            }
            else if (newPositionPoint.distance(previousPoint) > minDistance)
            {
                pointsLine.pushPoint(newPositionPoint);
            }
            previousPoint = newPositionPoint;


            if (pointsLine.getPointCount() == 2)
            {
                route = new H.map.Polyline(pointsLine, {
                    style: {strokeColor: "green", lineWidth: 8},
                    arrows: { fillColor: "white", frequency: 2, width: 0.8, height: 0.7}
                });
                histMap.addObject(route);
            }
            else if (pointsLine.getPointCount() > 2)
            {
                route.setGeometry(pointsLine);
            }
        },
        function(error){console.log("Error: "+error.message)},
        { timeout: 100000});
}