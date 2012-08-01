# Create your views here.

from django.http import HttpResponse
import psycopg2
import json


def query(request, patient_id):
        result = ""
        con = psycopg2.connect(database='smart', user='smart', password='smart')
	cur = con.cursor()
	cur.execute("SELECT * FROM GENOMICS WHERE patient_id = " + patient_id)
        for record in cur:
               result += record;
    return HttpResponse(result, mimetype='text/plain');
