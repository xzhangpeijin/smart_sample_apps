from django.http import HttpResponse
from django.conf.urls.defaults import *
from django.conf import settings

from genomics.views import query

urlpatterns = patterns('',
    (r'^genomics/(?P<patient_id>\d+)$', query),
    (r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': '%s/static/'%settings.APP_HOME}),
)

