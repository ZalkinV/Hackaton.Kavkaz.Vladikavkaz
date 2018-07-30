function Main()
{
    MapInitialization();

    var pointsLine = new H.geo.LineString();
    var routePolyLine = BuildUserPath(pointsLine, 0.001)
    histMap.setViewBounds(routePolyLine.getBounds());
}

function BuildUserPath(line, minDistance)
{
    var previousPoint = undefined;
    var manualPointsLine = new H.geo.LineString();
    var route;
    line = manualPointsLine;
    for (var i = 0; i < 20; i++)
    {
        manualPointsLine.pushLatLngAlt(40+i/100, 40+i/100);
        if (line.getPointCount() == 2) {
            route = new H.map.Polyline(line, {style: {strokeColor: "red", lineWidth: 5}});
            histMap.addObject(route);
        }
        else if (line.getPointCount() > 2) {
            route.setGeometry(line);
        }
    }

    /*while (line.getPointCount() != 1)
    {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var newPositionPoint = new H.geo.Point(latitude, longitude);

            //если расстояние от новой до последней добавленной точки больше минимального
            if (previousPoint == undefined)
            {
                line.pushPoint(newPositionPoint);
                previousPoint = newPositionPoint;
            }
            else if (newPositionPoint.distance(previousPoint) > minDistance) {
                line.pushPoint(newPositionPoint);
                previousPoint = newPositionPoint;
            }
        });

        if (line.getPointCount() == 1) {
            route = new H.map.Polyline(line, {style: {strokeColor: "red", lineWidth: 5}});
            histMap.addObject(route);
        }
        else if (line.getPointCount() > 1) {
            route.setGeometry(line);
        }
    }*/
    return route;
}

function PlaceMarker(position)
{
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var marker = new H.map.Marker({lat: latitude, lng: longitude});
    histMap.addObject(marker);
    histMap.setCenter({lat: latitude, lng: longitude});
}

function MapInitialization()
{
    var platform = new H.service.Platform({
        app_id: 'We5vBKJPfPaYDMeLMdnA',
        app_code: 'ZTOStN1FahDsKqf28dhzTQ',
    });

    var defaultLayers = platform.createDefaultLayers();

    window.histMap = new H.Map
    (
        document.getElementById("map"),
        defaultLayers.normal.map,
        {
            zoom: 8,
        }
    );

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(histMap));
    var ui = H.histMapUi.UI.createDefault(histMap, defaultLayers);
}
Main();