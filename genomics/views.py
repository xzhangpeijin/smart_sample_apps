# Create your views here.

from django.http import HttpResponse
from django.http import HttpResponseBadRequest
import psycopg2
import json


def pquery(request, patient_id):
    result = ""
    con = psycopg2.connect(database='smart', user='smart', password='smart')
    cur = con.cursor()
    cur.execute("SELECT * FROM GENOMICS WHERE patient_id = " + patient_id)
    return HttpResponse(json.dumps(build_dict(cur, cur.fetchone())), mimetype='application/json');
    
def build_dict(cursor, row):
    x = {}
    for key,col in enumerate(cursor.description):
        x[col[0]] = row[key]
    return x
    
def getdrug(request):
    med_data = request.GET;
    
    if(med_data is None):
        return HttpResponseBadRequest();
    
   
    
    return HttpResponse(med_data, mimetype='text');
