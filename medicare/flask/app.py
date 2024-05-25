from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from pdf2image import convert_from_path
import google.generativeai as genai
import os 
import ast

app = Flask(__name__)
CORS(app)
# Configure the Google Generative AI API
genai.configure(api_key='AIzaSyBLtQQELnXSqj9v4ULk7IToH9RtaNCwOSc')  # Replace with your actual API key
model = genai.GenerativeModel('gemini-pro')

poppler_path = r"C:\Users\Lenovo\poppler-24.02.0\Library\bin"

# Ensure you have the correct path to the tesseract executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_patient_data_from_pdf(pdf_file, poppler_path=None):
    
    # Convert PDF to images
    pages = convert_from_path(pdf_file, 300, poppler_path=poppler_path)  # Adjust the DPI as needed

    # Initialize an empty string to store the extracted text
    extracted_text = ""

    # Iterate through each page image
    for page in pages:
        # Use pytesseract to perform OCR on the image and extract text
        text = pytesseract.image_to_string(page)

        # Append the extracted text to the result
        extracted_text += text + "\n\n"  # Add extra newline for page separation

    return extracted_text

def call_google_gemini_gen_api(extracted_text):
    """
    Call the Google Gemini Generative Model API to process extracted text.
    """
    # Define the medical report schema
    medical_report_schema = {"id":"medical_report","description":"Extracted medical information from a given report.","attributes":[{"id":"test_date","value":"null"},{"id":"tsh_level","value":"null"},{"id":"t3_level","value":"null"},{"id":"t4_level","value":"null"},{"id":"free_t3_level","value":"null"},{"id":"free_t4_level","value":"null"},{"id":"tpoab_level","value":"null"},{"id":"tgab_level","value":"null"},{"id":"interpretation","value":"null"},{"id":"recommendations","value":"null"},{"id":"additional_notes","value":"null"}]}

    # Create the prompt for the API
    prompt = f"Task: Medical Information Extraction , Description:  You're tasked with developing a system to extract medical information from text obtained by parsing a medical report PDF file. The extracted information needs to be filled into a provided JSON schema{medical_report_schema} please ensure to keep id and values in double inverted comma. \nInput: \n Here is a string representing text extracted from a medical report PDF:\n {extracted_text} \n The text will contain sections such as test date, TSH level, T3 level, T4 level, free T3 level, free T4 level, TPOAb level, TGAb level, interpretation, recommendations, and additional notes.\n\n Output: \n Fill in the schema attributes with the extracted information according to your analysis. If information is available, fill in the value; otherwise, leave it as null. \n {medical_report_schema}. Return the output as JSON."

    # Generate content using the model
    response = model.generate_content(prompt)
    return response.text

@app.route('/')
def home():
    return "Welcome to the Flask PDF Text Extraction API!"

@app.route('/extract-pdf-text', methods=['POST'])
def extract_pdf_text():
    
    # if 'file' not in request.files:
    #     return jsonify({"error": "No PDF file provided"}), 400

    # file = request.files['file']
    # if file.filename == '':
    #     return jsonify({"error": "No selected file"}), 400

    # # Ensure the temporary directory exists
    # temp_dir = os.path.join(os.getcwd(), 'temp')
    # os.makedirs(temp_dir, exist_ok=True)
    data = request.get_json()
    filename = data.get('filename', '')
    basepath = r"G:\Web Development\QTIMinds\qti\medicare\client\public\uploads"
    temp_file_path = basepath + "/" + filename

    try:
        extracted_text = extract_patient_data_from_pdf(temp_file_path, poppler_path)
    except Exception as e:
        return jsonify({"error": f"Failed to read PDF file: {str(e)}"}), 500
    # finally:
    #     # Clean up the temporary file
    #     os.remove(temp_file_path)

    try:
        api_response = call_google_gemini_gen_api(extracted_text)
        return ast.literal_eval(api_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)