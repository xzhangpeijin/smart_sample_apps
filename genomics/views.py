# Create your views here.

from django.http import HttpResponse
from django.http import HttpResponseBadRequest
import psycopg2
import json
import pdb;

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
