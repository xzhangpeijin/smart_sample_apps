#!/usr/bin/python

import psycopg2
import sys
import urllib2
import simplejson
import csv

con = None
snps = ['rs1465788', 'rs4900384', 'rs7202877', 'rs757411', 'rs425105', 'rs5753037', 'rs1051708', 'rs7804356', 'rs1769673', 'rs9388489', 'rs4763879', 'rs3087243', 'rs3825932', 'rs2292239', 'rs2664170', 'rs3129934', 'rs1990760', 'rs3024505', 'rs6822844', 'rs4788084', 'rs2104286', 'rs3741208', 'rs725613', 'rs2290400', 'rs6679677', 'rs2542151', 'rs3184504', 'rs3746722', 'rs3788013', 'rs2877716', 'rs243021', 'rs7756992', 'rs2383208', 'rs1552224', 'rs1024405', 'rs780094', 'rs4607517', 'rs1111875', 'rs2612067', 'rs4402960', 'rs2943641', 'rs864745', 'rs5215', 'rs2237892', 'rs972283', 'rs1083096', 'rs2793831', 'rs1801282', 'rs8042680', 'rs340874', 'rs1326663', 'rs4430796', 'rs7903146', 'rs7578597', 'rs1325593', 'rs7961581', 'rs1001013', 'rs4457053', 'rs1163439', 'rs12413409', 'rs1378942', 'rs17367504', 'rs751891', 'rs4293393', 'rs1107280', 'rs1075727', 'rs599839', 'rs4773144', 'rs1746048', 'rs1243607', 'rs1412444', 'rs2291834', 'rs9818870', 'rs974819', 'rs7739181', 'rs1293658', 'rs9982601', 'rs6725887', 'rs1155692', 'rs20417', 'rs20455', 'rs2306283', 'rs4149056', 'rs4149081', 'rs10792367', 'rs11191548', 'rs11209716', 'rs11739136', 'rs12946454', 'rs1799722', 'rs2016848', 'rs2070744', 'rs2277869', 'rs2301149', 'rs3025058', 'rs4149601', 'rs495828', 'rs4961', 'rs5065', 'rs5182', 'rs5186', 'rs6749447', 'rs699', 'rs7297610', 'rs8012552', 'rs880054']

try:
        req = urllib2.Request("http://opensnp.org/users.json", None)
        opener = urllib2.build_opener()
        f = opener.open(req)
        json = simplejson.load(f)
        users = '/'
        data = []
        for x in xrange(len(json)):
                if(json[x]['genotypes'] != []):
                        users += str(json[x]['id']) + ',' 
                        data.extend(['(' + str(json[x]['id']) + ", '" + json[x]['genotypes'][0]['filetype'] + "'"])
        users = users[:-1] + '.json'
	for x in xrange(len(snps)):
	        url = 'http://opensnp.org/snps/json/' + snps[x] + users
	        req = urllib2.Request(url, None)
	        f = opener.open(req)
	        snpdata = simplejson.load(f)
	        for y in xrange(len(data)):
	                if len(snpdata[y]) > 1 and snpdata[y]['user']['genotypes'] != []:
	                        data[y] += ", '" + snpdata[y]['user']['genotypes'][0]['local_genotype'] + "'"
	                else:
	                        data[y] += ", 'NA'"
        con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	cur.execute("CREATE TABLE genomics(patient_id INT PRIMARY KEY, filetype VARCHAR(20), rs1465788 VARCHAR(2), rs4900384 VARCHAR(2), rs7202877 VARCHAR(2), rs757411 VARCHAR(2), rs425105 VARCHAR(2), rs5753037 VARCHAR(2), rs1051708 VARCHAR(2), rs7804356 VARCHAR(2), rs1769673 VARCHAR(2), rs9388489 VARCHAR(2), rs4763879 VARCHAR(2), rs3087243 VARCHAR(2), rs3825932 VARCHAR(2), rs2292239 VARCHAR(2), rs2664170 VARCHAR(2), rs3129934 VARCHAR(2), rs1990760 VARCHAR(2), rs3024505 VARCHAR(2), rs6822844 VARCHAR(2), rs4788084 VARCHAR(2), rs2104286 VARCHAR(2), rs3741208 VARCHAR(2), rs725613 VARCHAR(2), rs2290400 VARCHAR(2), rs6679677 VARCHAR(2), rs2542151 VARCHAR(2), rs3184504 VARCHAR(2), rs3746722 VARCHAR(2), rs3788013 VARCHAR(2), rs2877716 VARCHAR(2), rs243021 VARCHAR(2), rs7756992 VARCHAR(2), rs2383208 VARCHAR(2), rs1552224 VARCHAR(2), rs1024405 VARCHAR(2), rs780094 VARCHAR(2), rs4607517 VARCHAR(2), rs1111875 VARCHAR(2), rs2612067 VARCHAR(2), rs4402960 VARCHAR(2), rs2943641 VARCHAR(2), rs864745 VARCHAR(2), rs5215 VARCHAR(2), rs2237892 VARCHAR(2), rs972283 VARCHAR(2), rs1083096 VARCHAR(2), rs2793831 VARCHAR(2), rs1801282 VARCHAR(2), rs8042680 VARCHAR(2), rs340874 VARCHAR(2), rs1326663 VARCHAR(2), rs4430796 VARCHAR(2), rs7903146 VARCHAR(2), rs7578597 VARCHAR(2), rs1325593 VARCHAR(2), rs7961581 VARCHAR(2), rs1001013 VARCHAR(2), rs4457053 VARCHAR(2), rs1163439 VARCHAR(2), rs12413409 VARCHAR(2), rs1378942 VARCHAR(2), rs17367504 VARCHAR(2), rs751891 VARCHAR(2), rs4293393 VARCHAR(2), rs1107280 VARCHAR(2), rs1075727 VARCHAR(2), rs599839 VARCHAR(2), rs4773144 VARCHAR(2), rs1746048 VARCHAR(2), rs1243607 VARCHAR(2), rs1412444 VARCHAR(2), rs2291834 VARCHAR(2), rs9818870 VARCHAR(2), rs974819 VARCHAR(2), rs7739181 VARCHAR(2), rs1293658 VARCHAR(2), rs9982601 VARCHAR(2), rs6725887 VARCHAR(2), rs1155692 VARCHAR(2), rs20417 VARCHAR(2), rs20455 VARCHAR(2), rs2306283 VARCHAR(2), rs4149056 VARCHAR(2), rs4149081 VARCHAR(2), rs10792367 VARCHAR(2), rs11191548 VARCHAR(2), rs11209716 VARCHAR(2), rs11739136 VARCHAR(2), rs12946454 VARCHAR(2), rs1799722 VARCHAR(2), rs2016848 VARCHAR(2), rs2070744 VARCHAR(2), rs2277869 VARCHAR(2), rs2301149 VARCHAR(2), rs3025058 VARCHAR(2), rs4149601 VARCHAR(2), rs495828 VARCHAR(2), rs4961 VARCHAR(2), rs5065 VARCHAR(2), rs5182 VARCHAR(2), rs5186 VARCHAR(2), rs6749447 VARCHAR(2), rs699 VARCHAR(2), rs7297610 VARCHAR(2), rs8012552 VARCHAR(2), rs880054 VARCHAR(2))")
	for x in xrange(len(data)):
	        data[x] += ')'
	        cur.execute("INSERT INTO genomics VALUES " + data[x])
	        
	cur.execute("CREATE TABLE drug_advice(SNP VARCHAR(20) PRIMARY KEY, Genotype VARCHAR(2), Drug VARCHAR(20), Advice TEXT)");
	
	reader = csv.reader(open('DrugInfo.csv', 'rb'));
	
	for row in reader:
	        if(row[0] != "SNP"):
	                drugdata = "('" + row[0] + "', '" + row[1] + "', '" + row[2] + "', '" + row[3] + "')";        	        
	                cur.execute("INSERT INTO drug_advice VALUES " + drugdata);
	        
	        
	con.commit()
	

except psycopg2.DatabaseError, e:
	print 'Error %s' % e
	sys.exit(1)

finally:
	if con:
		con.close()


