import pandas as pd
import numpy as np
import pandas as pd
import os
import re
import time

from gensim.models import Word2Vec
from tqdm import tqdm

tqdm.pandas()

file_path = "C:\\Users\\liube\\Downloads\\CRIMS-BBG_Field_Usage.xlsx"
dataframe1 = pd.read_excel(file_path)

sentences = []
def preprocess(dataframe1, sentences):
    for _, row  in dataframe1.iterrows():
        sentence = ['for', row['DATA_TYP'], 'this', row['Bloomberg Mnemonic'], 'is', 'similar', 'to', row['Charles River Fields']]
        sentences.append(sentence)
preprocess(dataframe1, sentences)
print(f"\n\n--Tokens--\n\n{sentences}")
print(f"LOADED {len(dataframe1)}")

model = Word2Vec(sentences=sentences, vector_size=3, window=5, min_count=1, workers=4)
print(len(model.wv))
print(f"\n\n--My Vocab--\n\n")
print(model.wv.index_to_key)
print(model.wv['INDEX_FLOOR'])
print(model.wv.similar_by_word('INDEX_FLOOR'))