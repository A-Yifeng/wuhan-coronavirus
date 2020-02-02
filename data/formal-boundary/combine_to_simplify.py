import json
import os
import visvalingamwyatt as vw
import copy

fileL = ['allCities4.geojson','allDirAdmin4.geojson','allDistricts4.geojson','allProvinces4.geojson']
protNew = {'type':'FeatureCollection','features':[]}
allNewFeatures = []

allDirAdminFeatures = []
allCityDistrictFeatures = []
allCityFeatures = []
allProvinceFeatures = []
for i in range(0, len(fileL)):
    file = fileL[i]
    with open(file,'r') as fr:
        all = fr.read()
    allJson = json.loads(all)
    print(len(allJson['features']))
    print(i, '____________________new_____________________')
    for feature in allJson['features']:
        keyL = list(feature.keys())
        # print(keyL, file)
        # try:
        #     print(feature['city'])
        # except:
        #     pass
        feature['properties'] = {}
        if 'province' in keyL:
            feature['properties']['province'] = feature['province']
        if ('city' in keyL) and file != 'allProvinces.geojson':
            feature['properties']['city'] = feature['city']
        if 'subCity' in keyL:
            feature['properties']['subCity'] = feature['subCity']
        if 'district' in keyL:
            feature['properties']['district'] = feature['district']

        if i == 0:
            feature['properties']['admin-level'] = 'city'
        if i == 1:
            feature['properties']['admin-level'] = 'dirAdmin-district'
        if i == 2:
            feature['properties']['admin-level'] = 'city-district'
        if i == 3:
            feature['properties']['admin-level'] = 'province'

        latL = []
        lngL = []
        for plg in feature['geometry']['coordinates']:
            for latlng in plg[0]:
                latL.append(float(latlng[1]))
                lngL.append(float(latlng[0]))

        minLng = min(lngL)
        maxLng = max(lngL)

        minLat = min(latL)
        maxLat = max(latL)

        bbox = [minLng, minLat, maxLng, maxLat]
        feature['properties']['bbox'] = bbox
        allNewFeatures.append(feature)

    # print(list(allJson.keys()), )

cityNew = copy.deepcopy(protNew)
cityDistrictNew = copy.deepcopy(protNew)
dirAdminDistrictNew = copy.deepcopy(protNew)
provinceNew = copy.deepcopy(protNew)

cityNew['features'] = allNewFeatures
cityDistrictNew['features'] = allCityDistrictFeatures
dirAdminDistrictNew['features'] = allDirAdminFeatures
provinceNew['features'] = allProvinceFeatures

protNew['features'] = allNewFeatures

print(len(allNewFeatures))
with open('combine_original_7.geojson','w') as fw:
    fw.write(json.dumps(protNew, separators=(',',':'), ensure_ascii=False))