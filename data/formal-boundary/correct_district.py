import json

with open('allDistricts.geojson','r') as fr:
    all = json.loads(fr.read())

with open('zunyi.geojson','r') as fr:
    z = json.loads(fr.read())

protNew = {'type':'FeatureCollection','features':[]}
cityDistrictNames = []
newFeatures = []

dirAdmin = ['上海市','北京市','天津市','重庆市']
readZunyi = False
for i in range(0, len(all['features'])):
    feature = all['features'][i]
    thisName = feature['province'] + feature['city'] + feature['district']
    if ('贵州' in feature['province']) and (feature['city'] == '遵义市'):
        if readZunyi == False:
            readZunyi = True
            print(thisName)
            for feature2 in z['features']:
                newFeatures.append(feature2)
    else:
        if ((thisName in cityDistrictNames) == False) and ((feature['city'] in dirAdmin) == False) :
            newFeatures.append(feature)
    cityDistrictNames.append(thisName)

protNew['features'] = newFeatures
with open('allDistricts4.geojson', 'w') as fw:
    fw.write(json.dumps(protNew, ensure_ascii=False, separators=(',',':')).replace(']],[[',']]],[[['))