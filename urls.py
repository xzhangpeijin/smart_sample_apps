from django.http import HttpResponse
from django.conf.urls.defaults import *
from django.conf import settings

from genomics.views import *

urlpatterns = patterns('',
    (r'^framework/dm_monograph/psql/patient/(?P<patient_id>\d+)$', pquery),
    (r'^framework/genomics_advisor/psql/patient/(?P<patient_id>\d+)$', pquery),
    (r'^framework/dm_monograph/psql/drugs/$', getdrug),
    (r'^framework/genomics_advisor/psql/drugs/$', getdrug),
    (r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': '%s/static/'%settings.APP_HOME}),
)

