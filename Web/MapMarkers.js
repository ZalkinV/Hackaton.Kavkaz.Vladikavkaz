function AddMarkerToGroup(group, coordinate, name, description, site, address)
{
    var marker = new H.map.Marker(coordinate);
    var html =
        "<div class='bubble'>" +
        "<a href='" + site + "' >" + name + "</a>" +
        "<p class='description'><br>Описание:<br>" + description + "</p>" +
        "<p class='address'>" + address + "</p>";
    marker.setData(html);
    group.addObject(marker);
}

function AddInfoBubble(group)
{
    var previousChoosenBubble = undefined;

    group.addEventListener('tap', function (evt) {
        var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
            content: evt.target.getData()
        });

        histMapUi.addBubble(bubble);

        if (previousChoosenBubble != undefined) {
            previousChoosenBubble.dispose();
        }
        previousChoosenBubble = bubble;

        ShowSidebar();
    });

    histMap.addObject(group);
}

function CreateMarkers()
{
    var markersGroup = new H.map.Group();
    AddMarkerToGroup(markersGroup, {lat: 43.02599, lng: 44.67591}, "Мечеть Мухтарова", "Суннитская мечеть", "http://ru.wikipedia.org/wiki/Мечеть_Мухтарова_(Владикавказ)", "ул. Коцоева, д.62");
    AddMarkerToGroup(markersGroup, {lat: 43.0016565, lng: 44.6757222}, "Мемориал Славы", "Архитектурно-скульптурный комплекс", "https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%BC%D0%BE%D1%80%D0%B8%D0%B0%D0%BB_%D0%A1%D0%BB%D0%B0%D0%B2%D1%8B_(%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BA%D0%B0%D0%B2%D0%BA%D0%B0%D0%B7)", "ул. Коцоева, д.62");
    AddMarkerToGroup(markersGroup, {lat: 43.02591, lng: 44.68081},"Парк культуры и отдыха имени Коста Хетагурова", "Парк в Иристонском муниципальном округе", "http://ru.wikipedia.org/wiki/Парк_имени_Коста_Хетагурова", "пр.Мира");
    AddMarkerToGroup(markersGroup, {lat: 42.97054, lng: 44.66856}, "Владикавказский дендрарий", "Парк", "https://russia.travel/objects/317453/", "Московское шоссе");
    AddMarkerToGroup(markersGroup, {lat:43.02867, lng:44.68123}, "Художественный музей им. Махарбека Туганова", "Государственная галерея русско-осетинского изобразительного искусств", "http://www.hudmuz15.ru/", "пр. Мира, 12");
    AddMarkerToGroup(markersGroup, {lat:43.02132, lng:44.67983}, "Памятник генералу Плиеву", "Памятник", "https://ru.wikipedia.org/wiki/%D0%9F%D0%BB%D0%B8%D0%B5%D0%B2,_%D0%98%D1%81%D1%81%D0%B0_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87", "пл. Штыба");
    AddMarkerToGroup(markersGroup, {lat:43.02666, lng:44.69203}, "Северо-Осетинский государственный университет имени К. Л. Хетагурова", "Университет", "http://www.nosu.ru/", "ул. Ватутина, 44-46");
    AddInfoBubble(markersGroup);
}
CreateMarkers();