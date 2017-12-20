# import requests
# from bs4 import BeautifulSoup
# url='https://s.taobao.com/list?q=%E7%89%9B%E4%BB%94%E8%A3%A4&cat=50344007&style=grid&seller_type=taobao&spm=a217m.8316598.1000187.1';

# res=requests.get(url);
# soup=BeautifulSoup(res.text,"html5lib")
# print(res.text)
# for k in soup.find_all('a'):

import re
import requests
import sys
from pymongo import MongoClient

url = 'https://s.taobao.com/search'
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
    }
ss=sys.argv[1]
def spide(q):
  payload = {'q': '牛仔裤','s':0,'ie':'utf8'}  #字典传递url参数   
  payload['q']=ss
  client=MongoClient('localhost',27017)
  db=client.tb_db
  col=db[ss] 
  items=[]
  # file = open('taobao_test.txt','w',encoding='utf-8')

  for k in range(0,100):        #100次，就是100个页的商品数据
    payload ['s'] = 44*k+0   #此处改变的url参数为s，s为1时第一页，s为45是第二页，89时第三页以此类推                     
    resp = requests.get(url, params = payload,headers=headers)
    print(resp.url)          #打印访问的网址
    resp.encoding = 'utf-8'  #设置编码
    title = re.findall(r'"raw_title":"([^"]+)"',resp.text,re.I) #正则保存所有raw_title的内容，这个是书名，下面是价格，地址
    price = re.findall(r'"view_price":"([^"]+)"',resp.text,re.I)    
    sale=re.findall(r'"view_sales":"([^"]+)"',resp.text,re.I)    
    loc = re.findall(r'"item_loc":"([^"]+)"',resp.text,re.I)
    nick=re.findall(r'"nick":"([^"]+)"',resp.text,re.I)
    x = len(sale)     #每一页商品的数量

    for i in range(0,x):    #把列表的数据保存到文件中
      xiaoliang=int(re.findall(r'\d{0,}',sale[i])[0])
      item={
        "name":title[i],
        "price":float(price[i]),
        "sale":xiaoliang,
        "loc":loc[i],
        "nick":nick[i]
      }
      items.append(item)
  col.insert(items)
spide(ss)