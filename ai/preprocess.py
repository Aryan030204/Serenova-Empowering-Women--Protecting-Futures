import pandas as pd

def load_and_clean_data(file_path):
    """Load dataset and preprocess"""
    df = pd.read_csv(file_path)

    # Show dataset columns
    print("Dataset Columns:", df.columns.tolist())

    # Drop duplicates & missing values
    df = df.drop_duplicates()
    df = df.dropna()

    return df

if __name__ == "__main__":
    dataset = load_and_clean_data("./datasets/dataset.csv")
    print("Cleaned dataset preview:\n", dataset.head())
