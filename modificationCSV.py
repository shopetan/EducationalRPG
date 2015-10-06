import csv

f1 = open("Q_DB_TEST.csv", "r")
f2 = open("write_test.csv","w")

reader = csv.reader(f1)
writer = csv.writer(f2, lineterminator='\n')

for row in reader:
	writer.writerow(row)
	print row

f1.close()
f2.close()
