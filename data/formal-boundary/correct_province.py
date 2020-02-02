import json

with open('allProvinces4.geojson','r') as fr:
    all = json.loads(fr.read())

protNew = {'type':'FeatureCollection','features':[]}
cityDistrictNames = []
newFeatures = []

# dirAdmin = ['上海市','北京市','天津市','重庆市']
# readZunyi = False
# print(len(all['features']))
# for i in range(0, len(all['features'])):
#     feature = all['features'][i]
#     thisName = feature['province']
#     print('new one',thisName)
#     if ((thisName in cityDistrictNames) == False):
#         newFeatures.append(feature)
#
#     cityDistrictNames.append(thisName)

# protNew['features'] = newFeatures
with open('allProvinces4.geojson', 'w') as fw:
    fw.write(json.dumps(all, ensure_ascii=False, separators=(',',':')).replace(']],[[',']]],[[['))