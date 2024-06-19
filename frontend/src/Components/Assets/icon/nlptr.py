pip install easynmt
from easynmt import EasyNMT

# Initialize EasyNMT with a pre-trained model
translator = EasyNMT("opus-mt")

# Define input text
input_text = "Hello, how are you?"

# Translate input text from English to Hindi
translated_text_hi = translator.translate(input_text, source_lang="en", target_lang="hi")
print("Translated Text (Hindi):", translated_text_hi)

# Translate input text from English to Bengali
translated_text_bn = translator.translate(input_text, source_lang="en", target_lang="bn")
print("Translated Text (Bengali):", translated_text_bn)

# Translate input text from English to Tamil
translated_text_ta = translator.translate(input_text, source_lang="en", target_lang="ta")
print("Translated Text (Tamil):", translated_text_ta)

# Translate input text from English to Telugu
translated_text_te = translator.translate(input_text, source_lang="en", target_lang="te")
print("Translated Text (Telugu):", translated_text_te)