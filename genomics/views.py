# Create your views here.
from django.http import HttpResponse
from django.http import HttpResponseBadRequest
import urllib2
import cookielib
from urllib2 import urlopen, Request
import Cookie
import datetime 
import random
import urllib
import os
import psycopg2
import psycopg2.extras
import requests
import json
import sys
import time
import pdb;

snpbackup = ['rs1465788', 'rs4900384', 'rs7202877', 'rs757411', 'rs425105', 'rs5753037', 'rs1051708', 'rs7804356', 'rs1769673', 'rs9388489', 'rs4763879', 'rs3087243', 'rs3825932', 'rs2292239', 'rs2664170', 'rs3129934', 'rs1990760', 'rs3024505', 'rs6822844', 'rs4788084', 'rs2104286', 'rs3741208', 'rs725613', 'rs2290400', 'rs6679677', 'rs2542151', 'rs3184504', 'rs3746722', 'rs3788013', 'rs2877716', 'rs243021', 'rs7756992', 'rs2383208', 'rs1552224', 'rs1024405', 'rs780094', 'rs4607517', 'rs1111875', 'rs2612067', 'rs4402960', 'rs2943641', 'rs864745', 'rs5215', 'rs2237892', 'rs972283', 'rs1083096', 'rs2793831', 'rs1801282', 'rs8042680', 'rs340874', 'rs1326663', 'rs4430796', 'rs7903146', 'rs7578597', 'rs1325593', 'rs7961581', 'rs1001013', 'rs4457053', 'rs1163439', 'rs12413409', 'rs1378942', 'rs17367504', 'rs751891', 'rs4293393', 'rs1107280', 'rs1075727', 'rs599839', 'rs4773144', 'rs1746048', 'rs1243607', 'rs1412444', 'rs2291834', 'rs9818870', 'rs974819', 'rs7739181', 'rs1293658', 'rs9982601', 'rs6725887', 'rs1155692', 'rs20417', 'rs20455', 'rs2306283', 'rs4149056', 'rs4149081', 'rs10792367', 'rs11191548', 'rs11209716', 'rs11739136', 'rs12946454', 'rs1799722', 'rs2016848', 'rs2070744', 'rs2277869', 'rs2301149', 'rs3025058', 'rs4149601', 'rs495828', 'rs4961', 'rs5065', 'rs5182', 'rs5186', 'rs6749447', 'rs699', 'rs7297610', 'rs8012552', 'rs880054']

snps = ['rs1465788', 'rs4900384', 'rs7202877', 'rs757411', 'rs425105', 'rs5753037', 'rs1051708', 'rs7804356',  'rs9388489', 'rs4763879', 'rs3087243', 'rs3825932', 'rs2292239', 'rs2664170', 'rs3129934', 'rs1990760', 'rs3024505', 'rs6822844', 'rs4788084', 'rs2104286', 'rs3741208', 'rs725613', 'rs2290400', 'rs6679677', 'rs2542151', 'rs3184504', 'rs3746722', 'rs3788013', 'rs2877716', 'rs243021', 'rs7756992', 'rs2383208', 'rs1552224',  'rs780094', 'rs4607517', 'rs1111875', 'rs2612067', 'rs4402960', 'rs2943641', 'rs864745', 'rs5215', 'rs2237892', 'rs972283',  'rs2793831', 'rs1801282', 'rs8042680', 'rs340874', 'rs4430796', 'rs7903146', 'rs7578597',  'rs7961581',  'rs4457053', 'rs1163439', 'rs12413409', 'rs1378942', 'rs17367504', 'rs751891', 'rs4293393', 'rs599839', 'rs4773144', 'rs1746048', 'rs1243607', 'rs1412444', 'rs2291834', 'rs9818870', 'rs974819', 'rs7739181', 'rs9982601', 'rs6725887', 'rs20417', 'rs20455', 'rs2306283', 'rs4149056', 'rs4149081',  'rs11191548', 'rs11209716', 'rs11739136', 'rs12946454', 'rs1799722', 'rs2016848', 'rs2070744',  'rs3025058', 'rs4149601', 'rs495828', 'rs4961', 'rs5065', 'rs5182', 'rs5186', 'rs6749447', 'rs699', 'rs7297610',  'rs880054']
#'rs1083096','rs2277869','rs2301149','rs1769673','rs1325593','rs1001013','rs1024405','rs10792367','rs1075727''rs1326663''rs8012552' 'rs1107280''rs1293658'these are the scope that 23andme don't have
snpsdata={}
def auth(request):	
	patient_id = request.COOKIES["patient_id"]
	html="<html><script language='JavaScript' type='text/javascript'> function refreshParent()  { window.opener.location.href = window.opener.location.href;if (window.opener.progressWindow){window.opener.progressWindow.close();}window.close(); }</script> You have successfully clean the data of database!<a href='javascript:void(0)' onclick='refreshParent();'><br>close this window</a></html>"	
	_getAllSnpsNULL()
	if(_isPatientIdInDatabase(patient_id)==True):
		_updateDatabase(patient_id)
	else:	
		_insertToDatabase(patient_id)
	response = HttpResponse(html)
	response.set_cookie("patient_id",patient_id)
	return response

#main function to get data and add to the database
def hello(request):
	html="<html><script language='JavaScript' type='text/javascript'> function refreshParent()  { window.opener.location.href = window.opener.location.href;if (window.opener.progressWindow){window.opener.progressWindow.close();}window.close(); }</script> You have successfully update/insert your data from 23andme!<a href='javascript:void(0)' onclick='refreshParent();'><br>close this window</a></html>"	
	response = HttpResponse(html)
	if ("patient_id" in request.COOKIES):
		patient_id=request.COOKIES["patient_id"]
	else:
		patient_id='141'
		print patient_id
	code=request.GET.get('code',"empty")
	if(code=="empty"):#did not redirect from the 23andme,use refresh token
		refresh_token=_getRefreshTokenFromDatabase(patient_id)
		if(refresh_token!="NA"):
			refresh_token_response=_getAccess_token_response_ByRefreshToken(patient_id,refresh_token,_arrayToStringWithABlank(snps))
			token=refresh_token_response.json['access_token']
			_saveRefreshTokenToDatabase(patient_id,refresh_token_response.json["refresh_token"])
			_getAllSnps(token)
			if(_isPatientIdInDatabase(patient_id)==True):
				_updateDatabase(patient_id)
			else:	
				_insertToDatabase(patient_id)
	else:#which means have the code get data from 23andme and refresh
		response_token=_getAccess_token_response(code)		
		token=response_token.json['access_token']
		print token
		_saveRefreshTokenToDatabase(patient_id,response_token.json["refresh_token"])
		print response_token.json["refresh_token"]
		#_getRefreshTokenFromDatabase(patient_id)
		_getAllSnps(token)
		#_deleteRecordIndatabase(patient_id)
		#_getAllSnpsNULL()
		if(_isPatientIdInDatabase(patient_id)==True):
			_updateDatabase(patient_id)
		else:	
			_insertToDatabase(patient_id)	
	return HttpResponse(response)

#To delete a patient record in database by patient_id
def _deleteRecordIndatabase(patient_id):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	cur.execute("DELETE FROM GENOMICS WHERE patient_id = "+patient_id)
	con.commit()
	con.close()

#To make the data of snps all "NA" for observing the differences after update the data
def _getAllSnpsNULL():
	for item in snpbackup:
		snpsdata[item]="NA"

def _getAllSnps(token):
	headers = {'Authorization': 'Bearer %s' % token}
	snpNames=""
	for item in snps:
		snpNames=snpNames+item+' '  
	response = requests.get("https://api.23andme.com/1/genotypes/?locations="+snpNames,headers=headers)
	for item in snpbackup:
		snpsdata[item]="NA"
	for item in snps:
		if response.json[0][item]=="__":
			snpsdata[item]="NA"
		else:
			snpsdata[item]=response.json[0][item]
	string=""
	for item in snpbackup:
		string=string+item+" "+snpsdata[item]+" "

def _insertToDatabase(patient_id):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	i=0
	excuString="INSERT INTO GENOMICS(patient_id,filetype,"
	for item in snpbackup:
		excuString=excuString+item+' '
		if i!=len(snpbackup)-1:
			excuString=excuString+','
		i=i+1
	excuString=excuString+") VALUES('"+patient_id+"','23andme',"
	i=0
	for item in snpbackup:
		excuString=excuString+_getSnpFromDictionry(item)+' '
		if i!=len(snpbackup)-1:
			excuString=excuString+','
		i=i+1
	excuString=excuString+")"
	cur.execute(excuString)
	con.commit()
	con.close()

def _getRefreshTokenFromDatabase(patient_id):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	#cur = con.cursor()
	cur = con.cursor(cursor_factory=psycopg2.extras.DictCursor)
	cur.execute("SELECT refresh_token FROM GENOMICS WHERE patient_id = " + patient_id)
	rows = cur.fetchall()   
	print rows[0][0]
	return rows[0][0]

def _saveRefreshTokenToDatabase(patient_id,refresh_token):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	excuString="UPDATE GENOMICS SET refresh_token= "+"'"+refresh_token+"'"	
	excuString=excuString+"WHERE patient_id = "+patient_id
	#print excuString
	cur.execute(excuString)
	con.commit()
	con.close()

def _updateDatabase(patient_id):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	excuString="UPDATE GENOMICS SET "
	i=0
	for item in snpbackup:	
		excuString=excuString+item+'='+_getSnpFromDictionry(item)+' '
		if i!=len(snpbackup)-1:
			excuString=excuString+','
		i=i+1
	excuString=excuString+"WHERE patient_id = "+patient_id
	cur.execute(excuString)
	con.commit()
	con.close()

def _getSnpFromDictionry(snpName):
	if snpName in snpsdata:
		return "'"+snpsdata[snpName]+"'"
	else:
		return "'NA'"

def _snpsdataToString():
	str=''
	for key, value in snpsdata.items():  
		str=str+key+' '+value+"\r\n"
	return str

#get a single snp type by snp's name
def _getSingleSnp(token,snpName):
	headers = {'Authorization': 'Bearer %s' % token}    
	response = requests.get("https://api.23andme.com/2/demo/genotypes/?locations="+snpName,headers=headers)
	if response.status_code==200:
		snpType=response.json[0][snpName]
		if snpType=="__":
			snpType="NA"
		return snpType#choose [0] to get mother's snp
	else:
		return "NA"#other means getting failed or 

def _getAccess_token_response_ByRefreshToken(patient_id,RefreshToken,snpString):
	parameters = {
    	'client_id': 'b7ff57f150ce71259d9ee30ceec49098', # your client key
    	'client_secret': 'de8fec473677212c2cf8b5b4b01553b7', # your client secret
    	'grant_type': 'refresh_token',
    	'refresh_token': RefreshToken, # the refresh token from the previous response
    	'redirect_uri': 'http://localhost:8001/hello',
    	'scope': 'basic haplogroups names '+snpString, # space-delimited list of scopes
	}
	response = requests.post("https://api.23andme.com/token/",data = parameters)	
	return response

#get access_token by the auth code get from HTML
def _getAccess_token(code):
	parameters=_get23AndMe_Parameters(code,_arrayToStringWithABlank(snps))
    	response = requests.post("https://api.23andme.com/token/",data = parameters)
	return response.json['access_token']

def _getAccess_token_response(code):
	parameters=_get23AndMe_Parameters(code,_arrayToStringWithABlank(snps))
    	response = requests.post("https://api.23andme.com/token/",data = parameters)
	return response

def _get23AndMe_Parameters(code,snpString):
	parameters = {
    	'client_id': 'b7ff57f150ce71259d9ee30ceec49098', # your client key
    	'client_secret': 'de8fec473677212c2cf8b5b4b01553b7', # your client secret
    	'grant_type': 'authorization_code',
    	'code': code, # the authorization code obtained above
    	'redirect_uri': 'http://localhost:8001/hello',
    	'scope': 'basic haplogroups names '+snpString, # space-delimited list of scopes
    	}
	return parameters

#join an array to a string,split by a space
def _arrayToStringWithABlank( array = [] ):
	arrayStr=''
	for item in array:
		arrayStr=arrayStr+' '+item
	return arrayStr

def _isPatientIdInDatabase(patient_id):
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	cur.execute("SELECT * FROM GENOMICS WHERE patient_id = " + patient_id)
	rows=cur.fetchall()
	if(len(rows)==0):
		return False
	else:
		return True;

#add a refresh_token column to database
def _addColumnRefresh():
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	#cur.execute("ALTER TABLE GENOMICS ADD COLUMN refresh_token VARCHAR(30) DEFAULT 'NA';")
	cur.execute("ALTER TABLE GENOMICS ALTER refresh_token TYPE VARCHAR(50);")
	con.commit()
	con.close()

def pquery(request, patient_id):
	print request.COOKIES	
	result = ""
	con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	cur.execute("SELECT * FROM GENOMICS WHERE patient_id = " + patient_id)
	if(_isPatientIdInDatabase(patient_id)==False):
		x={}
		response=HttpResponse(x,mimetype='application/json')
	else:
		response=HttpResponse(json.dumps(build_dict(cur, cur.fetchone())), mimetype='application/json')	
	response.set_cookie("patient_id",patient_id)	
	return response
    
def build_dict(cursor, row):
    x = {}
    for key,col in enumerate(cursor.description):
        x[col[0]] = row[key]
    return x
    
def getdrug(request):
    med_data = request.GET;
    
    if(med_data is None):
        return HttpResponseBadRequest();
        
    drug_advice = [];
    
    search = "";
    
    for x in xrange(len(med_data)):
        key = 'Meds[' + str(x) + '][Med]';
        if(x != 0):
            search += " OR ";
        search += "drug='" + med_data[key].lower() + "'";
        
    con = psycopg2.connect(database='smart', user='smart', password='smart')
    cur = con.cursor();
    cur.execute("SELECT * FROM DRUG_ADVICE WHERE " + search);
    data = cur.fetchall();
    if(data is None):
        return HttpResponse("No Data", mimetype='text')
    else:
        result = [];
        for row in data:
            result.append(build_dict(cur, row));
        return HttpResponse(json.dumps(result), mimetype='application/json');