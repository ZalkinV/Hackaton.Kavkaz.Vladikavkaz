function MapInitialization()
{
    var platform = new H.service.Platform({
        app_id: 'We5vBKJPfPaYDMeLMdnA',
        app_code: 'ZTOStN1FahDsKqf28dhzTQ',
    });

    var defaultLayers = platform.createDefaultLayers();
    //отправлять обезличенную информацию на сервера, а на устройстве обрабатывать её без отправки на сервер
    window.histMap = new H.Map
    (
        document.getElementById("map"),
        defaultLayers.normal.map,
        {
            zoom: 6,
            center: {lat: 44, lng: 44}
        }
    );

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(histMap));
    window.histMapUi = H.ui.UI.createDefault(histMap, defaultLayers);
}

MapInitialization();