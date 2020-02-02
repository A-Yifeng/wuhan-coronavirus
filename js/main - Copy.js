var map
var Fujian_prov = []
var lastStyle
var lastObj

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
        layers: [tianditu_ter_3857],
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
    promises.push($.getJSON('data/formal-boundary/all_s100.topojson'))
    promises.push($.getJSON('data/formal-boundary/all_s50.topojson'))
    promises.push($.getJSON('data/formal-boundary/all_s25.topojson'))
    promises.push($.getJSON('data/formal-boundary/all_s10.topojson'))
    promises.push($.getJSON('data/formal-boundary/all_s5.topojson'))

    Promise.all(promises).then(loadProv)
}

function loadProv(data) {
    console.log('data', data)
    c100 = data[0]
    c50 = data[1]
    c25 = data[2]
    c10 = data[3]
    c5 = data[4]

    var perc100 = topojson.feature(c100, c100.objects.all_s100)
    var perc50 = topojson.feature(c50, c50.objects.all_s100)
    var perc25 = topojson.feature(c25, c25.objects.all_s100)
    var perc10 = topojson.feature(c10, c10.objects.all_s100)
    var perc5 = topojson.feature(c5, c5.objects.all_s100)

    bnd2 = L.geoJson(perc25, {
        style: {
            fillOpacity: 0.7,
            fillColor: '#ef4030',
            // renderer: L.canvas(),

            color: '#000',
            opacity: 1,
            weight: 3
        },
        filter: function(feature) {
            // if (feature['properties']['admin-level'] == 'city-district') || feature['properties']['admin-level'] == 'dirAdmin-district') {
            if (feature['properties']['admin-level'] == 'city-district') {
                console.log(feature['properties'])
                return true
            }
        }
    })
    bnd2.addTo(map)
}

function testing() {
    var cur_bound = map.getBounds()
    var zoom_p = map.getZoom()

    var north = cur_bound.getNorth()
    var south = cur_bound.getSouth()
    var west = cur_bound.getWest()
    var east = cur_bound.getEast()

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
    var options = {debug:0}

    // tileIndex = geojsonvt(data[0], options)
    // // console.log('idx---', tileIndex)
    // var testTile = tileIndex.getTile(5, 27, 12).features
    // console.log('testing', testTile)
    // var thisGeojson = {
    //     'type':'MultiPolygon',
    //     'geometry':{}
    // }
    
    // L.geoJson(testTile['source'][0]).addTo(map)

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

    console.log('slicing done')
    // $.getJSON('data/Fujian_xz_bbox2.json', function (result) {
    //     all = result['Fujian_xz']
    //     for (i = 0; i < all.length; i++) {
    //         bbox = all[i]
    //         if ((west < bbox[0]) || (south < bbox[1]) || (east > bbox[2]) || (north > bbox[3])) {
    //             FujianList.push(i)
    //         }
    //     }
    //     const origLen = Fujian_prov.length
    //     for (i = 0; i < FujianList.length; i++) {
    //         $.getJSON('data/Fujian_xz/' + String(i) + '.geojson', function (result) {
    //             Fujian_prov.push(L.geoJson(result, {
    //             }).addTo(map))
    //         })
    //     }
    //     console.log('beginning', origLen, 'now', Fujian_prov.length)
    //     for (i = 0; i < origLen; i++) {
    //         if (map.hasLayer(Fujian_prov[i])) {
    //             map.removeLayer(Fujian_prov[i])
    //         }
    //     }
    //     console.log('origLen', origLen, 'after slicing', Fujian_prov.length)
    //     Fujian_prov = Fujian_prov.slice(origLen, Fujian_prov.length)
    // })
    // $.getJSON('data/Fujian_xz_bbox2.json', function(result) {
    //     all = result['Fujian_xz']
    //     for (i = 0; i < all.length; i ++) {
    //         bbox = all[i]
    //         if ((west < bbox[0]) && (south < bbox[1]) && (east > bbox[2]) && (north > bbox[3])) {
    //             FujianList.push(i)
    //         }
    //     }
    //     var origLen = Fujian_prov.length
    //     for (i = 0; i < Fujian_prov.length; i ++) {
    //         if (map.hasLayer(Fujian_prov[i])) {
    //             map.removeLayer(Fujian_prov[i])
    //         }
    //     }
    //     for (i = 0; i < FujianList.length; i ++) {
    //         $.getJSON('data/Fujian_xz/' + String(i) + '.geojson', function(result) {
    //             Fujian_prov.push(L.geoJson(result, {
    //             }).addTo(map))
    //         })
    //     }

    // })


}

(function () {
    map = initMap()
    loadBounds()



    // $.getJSON('data/Fujian_xz_gj2.topojson', function (result) {
    //     console.log('adding prov')
    //     console.log(result)
    //     var layer = L.vectorGrid.slicer(result,
    //         {
    //             rendererFactory: L.canvas.tile,
    //             // vectorTileLayerStyles: {
    //                 // 'Fujian_xz_gj2': function (properties, zoom) {
    //                 //     console.log(properties);
    //                 //     return {
    //                 //         fillColor: '#800026',
    //                 //         fillOpacity: 0.5,
    //                 //         stroke: true,
    //                 //         fill: true,
    //                 //         color: 'black',
    //                 //         weight: 2,
    //                 //     }
    //                 // }
    //             // }
    //         }).addTo(map)
    // })

    //map.on('moveend', function () { loadProv() })
})()