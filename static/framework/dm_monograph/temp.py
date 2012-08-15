#!/usr/bin/python

import psycopg2
import sys
import urllib2
import simplejson
import csv

con = psycopg2.connect(database='smart', user='smart', password='smart')
cur = con.cursor()

cur.execute("CREATE TABLE drug_advice(SNP TEXT, Genotype VARCHAR(2), Drug TEXT, Advice TEXT)");
	
reader = csv.reader(open('DrugInfo.csv', 'rb'));
	
for row in reader:
        if(row[0] != "SNP"):
	        drugdata = "('" + row[0] + "', '" + row[1] + "', '" + row[2] + "', '" + row[3].replace("'", "\'") + "')";        	        
	        cur.execute("INSERT INTO drug_advice VALUES " + drugdata);
	        
	        
con.commit();
con.close();
