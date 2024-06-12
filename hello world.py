import requests


def download_pdb(pdb_id, save_path): #downloads a pdb file from the pdb website and writes it to a text file
    url = f'https://files.rcsb.org/download/{pdb_id}.pdb'
    response = requests.get(url)
    with open(save_path, 'w') as file:
        file.write(response.text)

pdb_id = '1A8M'  #my ID of choice (protein: TNF-alpha)
filename = download_pdb(pdb_id, f'{pdb_id}.pdb')

f = open(str(pdb_id) + '.pdb', 'r')
file_contents = f.read()
print(file_contents)
f.close