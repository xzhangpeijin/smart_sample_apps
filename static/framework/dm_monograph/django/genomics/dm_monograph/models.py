from django.db import models

# Create your models here.

class SNP(models.Model):
	name = models.CharField(max_length=20)
	genotype = models.CharField(max_length=2)
	
class User(models.Model):
	hospital_id = models.CharField(max_length=30)

