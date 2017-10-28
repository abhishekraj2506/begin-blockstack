with open ("/Users/abhishekraj/Documents/orgs.txt", "r") as myfile:
	data = myfile.readlines()
	for line in data:
        print line.strip().split('\t')
        print '\n'
      