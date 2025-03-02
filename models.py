from django.db import models

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    adjectives = models.TextField(blank=True, null=True)
    passions = models.TextField(blank=True, null=True)
    college_major = models.TextField(blank=True, null=True)
    activities = models.TextField(blank=True, null=True)
    leadership = models.TextField(blank=True, null=True)
    helping_community = models.TextField(blank=True, null=True)
    special_circumstances = models.TextField(blank=True, null=True)
    generated_letter = models.TextField()
    
    class Meta:
        app_label = 'app'