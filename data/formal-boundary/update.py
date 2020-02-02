import json


def main():
    # with open('AMap_adcode_citycode.csv', 'r') as fr:
    #     adcodes = fr.read().split('\n')
    #
    # citynames = []
    # citycodes = []
    # for adcode in adcodes:
    #     linkage = adcode.split(',')
    #
    #     if linkage[1][-2:] == '00':
    #         citycodes.append(linkage[1])
    #         citynames.append(linkage[0])

    with open('combine_original_20.topojson','r') as fr:
        all = json.loads(fr.read())
    fn = '2020-02-02'
    dir = 'E:\WuhanVirus\leaflet_map\\11.06_LeafletMap\data\\formal-boundary\\2020-02-02\\'
    with open(dir + fn + '-provinces.json','r') as fr:
        data = json.loads(fr.read())

    domainProvinces_cfm = []
    domainCities_cfm = []

    domainProvinces_cured = []
    domainCities_cured = []

    domainProvinces_dead = []
    domainCities_dead = []

    for k, v in data.items():
        if float(v['province'][0]) != 0:
            domainProvinces_cfm.append(v['province'][0])
        if float(v['province'][1]) != 0:
            domainProvinces_cured.append(v['province'][1])
        if float(v['province'][2]) != 0:
            domainProvinces_dead.append(v['province'][2])
        for k1, v1 in v['sub-province'].items():
            if float(v1[0]) != 0:
                domainCities_cfm.append(v1[0])
            if float(v1[1]) != 0:
                domainCities_cured.append(v1[1])
            if float(v1[2]) != 0:
                domainCities_dead.append(v1[2])

    for item in all['objects']['combine_original_7']['geometries']:
        item['properties']['confirmed'] = -1
        item['properties']['cured'] = -1
        item['properties']['dead'] = -1
        if item['properties']['admin-level'] == 'city':
            thisCityName = item['properties']['city']
            for k, v in data.items():
                for k1, v1 in v['sub-province'].items():
                    if k1 in thisCityName:
                        item['properties']['confirmed'] = float(v1[0])
                        item['properties']['cured'] = float(v1[1])
                        item['properties']['dead'] = float(v1[2])
        if item['properties']['admin-level'] in ['city-district', 'dirAdmin-district']:
            thisProvinceName = item['properties']['province']
            thisDistrictName = item['properties']['district']
            for k, v in data.items():
                for k1, v1 in v['sub-province'].items():
                    if k in thisProvinceName and k1 in thisDistrictName:
                        item['properties']['confirmed'] = float(v1[0])
                        item['properties']['cured'] = float(v1[1])
                        item['properties']['dead'] = float(v1[2])
    # for item in all['objects']['combine_original_7']['geometries']:
    #     print (item)

    with open(dir + fn + '_2.topojson','w') as fw:
        fw.write(json.dumps(all, separators=(',', ':'), ensure_ascii=False))

    clusters = 'var dataCities_cfm = ' + json.dumps(domainCities_cfm) + '; '
    clusters += 'var dataCities_cured = ' + json.dumps(domainCities_cured) + '; '
    clusters += 'var dataCities_dead = ' + json.dumps(domainCities_dead) + '; '

    clusters += 'var dataProvinces_cfm = ' + json.dumps(domainProvinces_cfm) + '; '
    clusters += 'var dataProvinces_cured = ' + json.dumps(domainProvinces_cured) + '; '
    clusters += 'var dataProvinces_dead = ' + json.dumps(domainProvinces_dead) + ';'
    with open(dir + 'clusters_' + fn + '_2.js','w') as fw:
        fw.write(clusters)
if __name__ == '__main__':
    main()