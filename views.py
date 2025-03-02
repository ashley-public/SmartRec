import ollama
import re

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Student
from .serializers import StudentSerializer
from django.http import HttpResponse

# using IP of ollama model
#client = ollama.Client(host='http://ollama:11000')
#client = ollama.Client(host='172.17.0.1:11434') 
#client = ollama.Client(host='http://ollama:11000')
client = ollama.Client(host='http://localhost:11000')

"""
@api_view(['POST'])
def login_view(request):
    user = authenticate(username=request.data['username'],
                        password=request.data['password'])
    return Response({"success": bool(user)})
"""

@api_view(['POST'])
def submit_form(request):
    student = Student.objects.create(first_name=request.data['first_name'],
                                     last_name=request.data['last_name'],
                                     adjectives=request.data['adjectives'],
                                     passions=request.data['passions'],
                                     college_major=request.data['college_major'],
                                     activities=request.data['activities'],
                                     special_circumstances=request.data['special_circumstances'],
                                     helping_community=request.data['helping_community'],
                                     )
    return Response({"message": "Form submitted successfully!"})

@api_view(['GET'])
def get_letter(request):
    return Response({
        "letter":
        f"AI-Generated Letter for {request.GET.get('first_name', 'Student')}"
    })

@api_view(['POST'])
def generate_letter(request):
    student_data = request.data

    #prompt = f"Write a recommendation letter for {student_data['first_name']} {student_data['last_name']}, who is passionate about {student_data['passions']} and is studying {student_data['college_major']}. They have been involved in {student_data['activities']}."

    prompt = f"""
        In English, please write a highly personalized college recommendation letter for the student based on the following details. The letter should highlight the student’s strengths, character, and potential, emphasizing their unique qualities, achievements, and aspirations. Please use a professional and encouraging tone throughout the letter.

        Student's first name: {student_data['first_name']}
        Student's last name: {student_data['last_name']}
        Three adjectives that best describe the student: {student_data.get('adjectives', 'N/A')}
        The student is passionate about: {student_data.get('passions', 'N/A')}
        The student intends to major in: {student_data.get('college_major', 'N/A')}
        The student has participated in the following extracurricular activities: {student_data.get('activities', 'N/A')}
        The student has held these leadership roles: {student_data.get('leadership', 'N/A')}
        The student has contributed to their community in these ways: {student_data.get('helping_community', 'N/A')}
        Include any special circumstances or challenges that have affected their academic performance or personal growth, and explain how they have shown resilience in overcoming them: {student_data.get('special_circumstances', 'N/A')}

        Make sure the letter is both a reflection of the student's past accomplishments and an expression of their future potential. Avoid including any address or personal contact information.
    """
    
    selected_model = "deepseek-r1:1.5b"

    client = ollama.Client(host='http://ollama:11434')

    client.pull(selected_model)

    response = client.generate(model=selected_model, prompt=prompt)

    print("Response from DeepSeek:", response)

    generated_letter = get_letter_content(response.get('response', ''))

    if not generated_letter:
        return Response({"message": "Failed to generate letter. Please try again."})

    student = Student.objects.create(
        first_name=student_data['first_name'],
        last_name=student_data['last_name'],
        generated_letter=generated_letter,
        adjectives=student_data.get('adjectives', ''),
        passions=student_data.get('passions', ''),
        college_major=student_data.get('college_major', ''),
        activities=student_data.get('activities', ''),
        leadership=student_data.get('leadership', ''),
        helping_community=student_data.get('helping_community', ''),
        special_circumstances=student_data.get('special_circumstances', '')
    )

    print(generated_letter)

    return Response({
        "message": "Letter generated successfully!", 
         "letter": generated_letter
         })

@api_view(['GET'])
def get_letters(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


def get_letter_content(text):
    # remove everything between <think>...</think>
    cleaned_text = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)
    return cleaned_text.strip()