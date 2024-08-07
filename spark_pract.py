"""SimpleApp.py"""
import re
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

logFile = "C:\\Users\\liube\\Documents\\test.json"  # Should be some file on your system
spark = SparkSession.builder.appName("SimpleApp").master("local[*]").getOrCreate()

dataf = spark.read.json(logFile, multiLine=True)
filtered = dataf.select('name', 'age', 'porn_genre').filter(col("porn_genre") == "Lesbian")
lesbianLovers = filtered.collect()
for l in lesbianLovers:
    print(f"Name={l['name']}, Age={l['age']}")
spark.stop()