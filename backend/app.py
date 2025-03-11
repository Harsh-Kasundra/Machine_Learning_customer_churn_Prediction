from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from imblearn.combine import SMOTEENN
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from flask_cors import CORS  # Import CORS
import os
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load training dataset
tel_churn = pd.read_csv("tel_churn.csv")

tel_churn=tel_churn.drop('Unnamed: 0',axis=1)

# Function to map tenure to tenure groups
def tenure_group(tenure):
    if tenure <= 12:
        return 'tenure_group_1 - 12'
    elif tenure <= 24:
        return 'tenure_group_13 - 24'
    elif tenure <= 36:
        return 'tenure_group_25 - 36'
    elif tenure <= 48:
        return 'tenure_group_37 - 48'
    elif tenure <= 60:
        return 'tenure_group_49 - 60'
    else:
        return 'tenure_group_61 - 72'

# One-hot encoding for categorical features
tel_churn = pd.get_dummies(tel_churn, drop_first=False)

# Separate features and target
x = tel_churn.drop(columns=['Churn'])
y = tel_churn['Churn']

x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2)

# Handle class imbalance using SMOTEENN
sm = SMOTEENN()
X_resampled, y_resampled = sm.fit_resample(x,y)

xr_train,xr_test,yr_train,yr_test=train_test_split(X_resampled, y_resampled,test_size=0.2)

# Train RandomForest model
model_rf_smote=RandomForestClassifier(n_estimators=100, criterion='gini', random_state = 100,max_depth=6, min_samples_leaf=8)
model_rf_smote.fit(xr_train,yr_train)
yr_predict = model_rf_smote.predict(xr_test)

model_score_r = model_rf_smote.score(xr_test, yr_test)
print(model_score_r)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.json
        print("\n🔹 Received Input Data:", data)  # Print input data in console

        # Convert tenure to integer
        if 'tenure' in data:
            data['tenure'] = int(data['tenure'])  # Convert tenure to int

        # Convert input to DataFrame
        new_customer_df = pd.DataFrame([data])

        # Apply tenure grouping
        new_customer_df['tenure_group'] = new_customer_df['tenure'].apply(tenure_group)
        new_customer_df.drop(columns=['tenure'], inplace=True)

        # One-hot encoding
        new_customer_df = pd.get_dummies(new_customer_df, drop_first=False)

        # Ensure new_customer_df matches training feature columns
        missing_cols = set(x.columns) - set(new_customer_df.columns)
        for col in missing_cols:
            new_customer_df[col] = 0  # Add missing columns with 0
        new_customer_df = new_customer_df[x.columns]  # Align column order

        # Convert all data types to match training data
        new_customer_df = new_customer_df.astype(int)

        # 🔍 Debugging Logs
        print("\n🔹 Shape of Processed Data for Prediction:", new_customer_df.shape)
        print("\n🔹 Data Types After Conversion:\n", new_customer_df.dtypes)

        # Predict churn using the trained model
        prediction = model_rf_smote.predict(new_customer_df)[0]
        churn_result = "Yes" if prediction == 1 else "No"

        print("\n✅ Prediction Result:", churn_result)  # Print prediction in console

        return jsonify({"churn_prediction": churn_result})
    
    except Exception as e:
        print("\n❌ Error:", str(e))  # Print error in console
        return jsonify({"error": str(e)}), 400



if __name__ == '__main__':
    port = int(os.environ.get("PORT",5000))
    app.run(host='0.0.0.0',port=port)
