var map
var Fujian_prov = []
var lastStyle
var lastObj

var bnd1
var bnd2
var bnd3
var bnd4
var bnd5

var perc100
var perc50
var perc20
var perc10
var perc5

var bboxProv
var bboxCity
var bboxSub

var provPlgs = []
var cityPlgs = []
var subPlgs = []

var cluster1; var cluster2; var cluster3; var cluster4; var cluster5; var cluster6
var cityCb_cfm = [0]
var cityCb_cured = [0]
var cityCb_dead = [0]
var provinceCb_cfm = [0]
var provinceCb_cured = [0]
var provinceCb_dead = [0]

var styles1 = [{ "color": "#000000", "fillColor": "#ffffb2", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#fed976", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#feb24c", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#fd8d3c", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#fc4e2a", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#e31a1c", "fillOpacity": '0.95', "weight": 3 },
{ "color": "#000000", "fillColor": "#b10026", "fillOpacity": '0.95', "weight": 3 },
]
var styles2 = [{ "color": "#a9a9a9", "fillColor": "#ffffb2", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fed976", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#feb24c", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fd8d3c", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#fc4e2a", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#e31a1c", "fillOpacity": '0.95', "weight": 2 },
{ "color": "#a9a9a9", "fillColor": "#b10026", "fillOpacity": '0.95', "weight": 2 },
]
var styles3 = [{ "color": "#959595", "fillColor": "#ffffb2", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fed976", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#feb24c", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fd8d3c", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#fc4e2a", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#e31a1c", "fillOpacity": '0.95', "weight": 1.5 },
{ "color": "#959595", "fillColor": "#b10026", "fillOpacity": '0.95', "weight": 1.5 },
]

function initMap() {
    tianditu_sat_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_map_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_ter_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_ibo_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })

    tianditu_cva_3857 = L.tileLayer('http://{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&tk=c77ff55fbeec6f05de4685b93f816b9a', {
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    })
    var map1 = L.map('map', {
        attributionControl: false,
        crs: L.CRS.EPSG3857,
        layers: [tianditu_ter_3857, tianditu_cva_3857],
        minZoom: 1,
        maxZoom: 13,
        worldCopyJump: true,
        maxBounds: [[180, -1800], [-180, 1800]]
    })
    map1.setView([30.2, 119.7], 5)

    var baseMaps = {
        "天地图（经纬度投影)": tianditu_map_3857,
        "天地图卫星图（经纬度投影）": tianditu_sat_3857,
        "天地图地形图（经纬度投影）": tianditu_ter_3857,
        // "天地图矢量注记（经纬度投影）": tianditu_cva_3857,
    }

    var markerOverlays = {
        "地名注记（经纬度投影）": tianditu_cva_3857
    }

    $('.leaflet-top.leaflet-left .leaflet-control-zoom.leaflet-control').remove()

    L.control.layers(baseMaps, markerOverlays).addTo(map1);

    var zoomControl = L.control.zoom({
        position: 'bottomright'
    });

    map1.addControl(zoomControl);
    $('.leaflet-bottom.leaflet-right .leaflet-control-zoom.leaflet-bar.leaflet-control').css('margin-bottom', '120px').css('margin-right', '20px')

    // L.latlngGraticule({
    //     showLabel: true,
    //     dashArray: [4, 4],
    //     fontColor: '#999999',
    //     zoomInterval: graticule_zoom
    // }).addTo(map1);

    return map1
}

function loadBounds() {
    var promises = []
    // promises.push($.getJSON('data/formal-boundary/combine_original_100.topojson'))
    // promises.push($.getJSON('data/formal-boundary/combine_original_50.topojson'))
    promises.push($.getJSON('data/formal-boundary/2020-02-02/2020-02-02_2.topojson'))
    // promises.push($.getJSON('data/formal-boundary/combine_original_10.topojson'))
    // promises.push($.getJSON('data/formal-boundary/combine_original_5.topojson'))

    Promise.all(promises).then(loadProv)
}

function loadProv(data) {
    // console.log('data', data)
    // var cur_bound = map.getBounds()
    // var zoom_p = map.getZoom()

    // var north = cur_bound.getNorth()
    // var south = cur_bound.getSouth()
    // var west = cur_bound.getWest()
    // var east = cur_bound.getEast()

    // c100 = data[0]
    // c50 = data[1]
    c20 = data[0]
    // c10 = data[3]
    // c5 = data[4]

    // perc100 = topojson.feature(c100, c100.objects.combine_original_7)
    // perc50 = topojson.feature(c50, c50.objects.combine_original_7)
    perc20 = topojson.feature(c20, c20.objects.combine_original_7)
    // perc10 = topojson.feature(c10, c10.objects.combine_original_7)
    // perc5 = topojson.feature(c5, c5.objects.combine_original_7)

    // for (i = 0; i < perc100.length; i ++) {
    //     var thisBbox = perc100[i]['properties']['bbox']
    //     if (perc100[i]['properties']['admin-level'] == 'province') {
    //         bboxProv.push(thisBbox)
    //     } else if (perc100[i]['properties']['admin-level'] == 'city') {
    //         bboxCity.push(thisBbox)
    //     } else if (perc100[i]['properties']['admin-level'] == 'city-district' || perc100[i]['properties']['admin-level'] == 'dirAdmin-district') {
    //         bboxSub.push(thisBbox)
    //     }
    // }


    bnd1 = L.geoJson(perc20, {
        style: {
            fillOpacity: 0,
            color: '#000',
            opacity: 1,
            weight: 3
        },
        filter: function (feature) {
            if (feature['properties']['admin-level'] == 'province') {
                return true
            }
        }
    })

    bnd2 = L.geoJson(perc20, {
        style: function (feature) {
            // console.log(feature['properties'])
            cfm = feature['properties']['confirmed']
            for (i = 0; i < 6; i ++) {
                // console.log(feature['properties']['city'], cfm, cityCb_cfm[i + 1])
                if (cfm >= cityCb_cfm[i] && cfm <= cityCb_cfm[i + 1]) {
                    return styles2[i]
                }
            }
            return ({ 
                "color": "#a9a9a9", 
                "fillColor": "#fff", 
                "fillOpacity": '0.95', 
                "weight": 2 
            })
        },
        filter: function (feature) {
            if (feature['properties']['admin-level'] == 'city') {
                return true
            }
        }
    })

    bnd3 = L.geoJson(perc20, {
        style: {
            fillOpacity: 0.5,
            // fillColor: '#ef4030',

            color: '#959595',
            opacity: 1,
            weight: 1.5
        },
        filter: function (feature) {
            if ((feature['properties']['admin-level'] == 'city-district') || (feature['properties']['admin-level'] == 'dirAdmin-district')) {
                return true
            }
        }
    })
    // bnd3.addTo(map)
    bnd2.addTo(map)
    bnd1.addTo(map)
}

function update_legend(colors, grades, nameGrades, legendTitle) {
    $('#contourfLegend').empty()
    console.log(colors, grades, nameGrades, legendTitle)
    document.getElementById('contourfLegend').innerHTML = '<div id="legend_title">' + legendTitle + '<b></b></div>'
    for (var i = 5; i >= 0; i--) {
        if (i == 5) {
            document.getElementById('contourfLegend').innerHTML += '<i style="background:' + colors[i] + '"></i>' + nameGrades[i] + '&nbsp<br>';
        } else {
            document.getElementById('contourfLegend').innerHTML += '<i style="background:' + colors[i] + '"></i>' + nameGrades[i] + '&nbsp<br>';
        }
    }
}

function update_shape() {
    var cur_bound = map.getBounds()
    var zoom_p = map.getZoom()

    var north = cur_bound.getNorth()
    var south = cur_bound.getSouth()
    var west = cur_bound.getWest()
    var east = cur_bound.getEast()

    if (zoom_p < 5) {
        for (i = 0; i < bboxProv.length; i++) {
            if ((bboxProv[0] > west || bboxProv[2] < east) && (bboxProv[1] > south || bboxProv[3] < north)) {

            }
        }
    } else if (zoom_p == 6 || zoom_p == 7) {
        for (i = 0; i < perc10.length; i++) {

        }
    } else if (zoom_p == 8 || zoom_p == 9) {
        for (i = 0; i < perc20.length; i++) {

        }
    } else if (zoom_p == 10 || zoom_p == 11) {
        for (i = 0; i < perc50.length; i++) {

        }
    } else {
        for (i = 0; i < perc100.length; i++) {

        }
    }
}

function testing() {
    var options = {
        maxZoom: 13,  // max zoom to preserve detail on; can't be higher than 24
        tolerance: 3, // simplification tolerance (higher means simpler)
        extent: 4096, // tile extent (both width and height)
        buffer: 64,   // tile buffer on each side
        debug: 0,     // logging level (0 to disable, 1 or 2)
        lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
        promoteId: null,    // name of a feature property to promote to feature.id. Cannot be used with `generateId`
        generateId: false,  // whether to generate feature ids. Cannot be used with `promoteId`
        indexMaxZoom: 13,       // max zoom in the initial tile index
        indexMaxPoints: 0 // max number of points per tile in the index
    }
    var options = { debug: 0 }

    L.geoJson(data[1], {
        style: {
            fillOpacity: 0.7,
            fillColor: '#ef4030',
            renderer: L.canvas(),

            color: '#000',
            opacity: 1,
            weight: 3.5
        },
        onEachFeature: function (feature, layer) {
        }
    }).addTo(map)

    L.geoJson(data[0], {
        style: {
            fillOpacity: 0.7,
            fillColor: '#ef4030',
            renderer: L.canvas(),

            color: '#a00905',
            opacity: 0.7,
            weight: 1.5
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseout: function (e) {
                    // lastStyle['fillOpacity'] = 0.85
                    this.setStyle(lastStyle)
                },
                mouseover: function (e) {
                    lastStyle = this.options.style
                    this.setStyle({ color: "black", fillColor: '#e0e922', weight: 3.5 })
                }
            })
        }
    }).addTo(map)
}

function getClusters() {

    clusters1 = ss.ckmeans(dataCities_cfm, 6)
    console.log(dataCities_cfm,cluster1)
    for (i = 0; i < clusters1.length; i++) { cityCb_cfm.push(clusters1[i][clusters1[i].length - 1]) }

    clusters2 = ss.ckmeans(dataCities_cured, 6)
    for (i = 0; i < clusters2.length; i++) { cityCb_cured.push(clusters2[i][clusters2[i].length - 1]) }

    clusters3 = ss.ckmeans(dataCities_dead, 6)
    for (i = 0; i < clusters3.length; i++) { cityCb_dead.push(clusters3[i][clusters3[i].length - 1]) }

    clusters4 = ss.ckmeans(dataProvinces_cfm, 6)
    for (i = 0; i < clusters4.length; i++) { provinceCb_cfm.push(clusters4[i][clusters4[i].length - 1]) }

    clusters5 = ss.ckmeans(dataProvinces_cured, 6)
    for (i = 0; i < clusters5.length; i++) { provinceCb_cured.push(clusters5[i][clusters5[i].length - 1]) }

    clusters6 = ss.ckmeans(dataProvinces_dead, 6)
    for (i = 0; i < clusters6.length; i++) { provinceCb_dead.push(clusters6[i][clusters6[i].length - 1]) }

    // console.log(provinceCb_cured)
}

(function () {
    getClusters()

    var legendColors = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c']
    var grades = 6
    var nameGrades = []
    nameGrades.push(cityCb_cfm[0] + '~' + cityCb_cfm[1])
    nameGrades.push(cityCb_cfm[1] + '~' + cityCb_cfm[2])
    nameGrades.push(cityCb_cfm[2] + '~' + cityCb_cfm[3])
    nameGrades.push(cityCb_cfm[3] + '~' + cityCb_cfm[4])
    nameGrades.push( cityCb_cfm[4] + '~' + cityCb_cfm[5])
    nameGrades.push( cityCb_cfm[5] + '~' + cityCb_cfm[6])

    console.log('[[[[', cityCb_cfm)
    update_legend(legendColors, grades, nameGrades, '确诊人数')

    map = initMap()
    loadBounds()

    // map.on('moveend', function () {
    //     update_shape() 
    // })
})()