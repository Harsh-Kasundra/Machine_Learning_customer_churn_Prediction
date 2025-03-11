import pandas as pd

# Load dataset
df = pd.read_csv("first_telc.csv")

# Ensure column names are clean
df.columns = df.columns.str.strip()

# Check if 'tenure' column exists
if 'tenure' not in df.columns:
    raise ValueError("Column 'tenure' not found in dataset.")

# Convert 'TotalCharges' and 'tenure' to numeric
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(df['TotalCharges'].median())
df['tenure'] = pd.to_numeric(df['tenure'], errors='coerce')

# Apply tenure group function
def tenure_group(tenure):
    if tenure <= 12:
        return '1 - 12'
    elif tenure <= 24:
        return '13 - 24'
    elif tenure <= 36:
        return '25 - 36'
    elif tenure <= 48:
        return '37 - 48'
    elif tenure <= 60:
        return '49 - 60'
    else:
        return '61 - 72'

df['tenure_group'] = df['tenure'].apply(tenure_group)

print("Preprocessing successful!")
