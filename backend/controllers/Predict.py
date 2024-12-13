# predict.py
import pandas as pd
import pickle
import sys
import json
# Load the model and preprocessing objects from the .pkl file
with open('./controllers/model.pkl', 'rb') as f:
    model_data = pickle.load(f)

# Extract components from the loaded dictionary
knn = model_data['knn_model']
label_encoders = model_data['label_encoders']
career_label_encoder = model_data['career_label_encoder']
scaler = model_data['scaler']
categorical_cols = model_data['categorical_cols']
numeric_cols = model_data['numeric_cols']

# Function to preprocess user input and make predictions
def preprocess_and_predict(user_input):
    input_df = pd.DataFrame([user_input], columns=user_input.keys())

    # Handle categorical columns (encode with existing encoders)
    for col in categorical_cols:
        if col in input_df.columns:
            try:
                input_df[col] = label_encoders[col].transform(input_df[col])
            except ValueError:
                # If unseen, replace with most frequent category
                most_frequent_value = input_df[col].mode()[0]
                input_df[col] = most_frequent_value

    # Scale the numeric columns
    input_df[numeric_cols] = scaler.transform(input_df[numeric_cols])

    # Drop irrelevant columns
    input_df = input_df.drop(columns=['Personal_Interests', 'Others'], errors='ignore')

    # Make a prediction using the loaded KNN model
    career_pred = knn.predict(input_df)

    # Inverse transform the predicted career back to the original label
    predicted_career = career_label_encoder.inverse_transform(career_pred)

    return predicted_career[0]

if __name__ == '__main__':
    user_input = input()
    # print(type(user_input))
    # print(user_input)
    try:
        user_input_json = json.loads(user_input)  # Parse the string to JSON
        # print(type(user_input_json))  # It will print <class 'dict'>
        # print(user_input_json)  # Print the JSON object (Python dictionary)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON input: {e}")

    # print(user_input_json)
    predicted_career = preprocess_and_predict(user_input_json)
    print(predicted_career) # Ensure this prints the output properly
