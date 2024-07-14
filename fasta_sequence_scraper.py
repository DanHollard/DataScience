import requests
import sqlite3

# Function to download PDB file
def download_pdb(pdb_id, save_path):
    url = f'https://www.rcsb.org/fasta/entry/{pdb_id}/display'
    response = requests.get(url)
    with open(save_path, 'w') as file:
        file.write(response.text)

# Function to parse the FASTA file
def parse_fasta(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        header = lines[0].strip()
        sequence = ''.join(line.strip() for line in lines[1:])
        
        # Extract protein name and sequence ID from the header
        header_parts = header.split('|')
        sequence_id = header_parts[0].replace('>', '')
        protein_name = header_parts[1] if len(header_parts) > 1 else 'Unknown Protein'
        
        return protein_name, sequence_id, sequence

# Function to store sequence in the database
def store_in_db(protein_name, sequence_id, sequence):
    conn = sqlite3.connect('protein_sequences.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ProteinSequences (
            ProteinName VARCHAR(255) NOT NULL,
            SequenceID VARCHAR(50) PRIMARY KEY,
            FullSequence TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        INSERT OR REPLACE INTO ProteinSequences (ProteinName, SequenceID, FullSequence)
        VALUES (?, ?, ?)
    ''', (protein_name, sequence_id, sequence))
    
    conn.commit()
    conn.close()

# Main part of the script
pdb_id = input("Please enter the 4 digit PDB code: ")  # my ID of choice (protein: TNF-alpha)
filename = f'{pdb_id}.pdb'
download_pdb(pdb_id, filename)

# Parse the downloaded FASTA file
protein_name, sequence_id, sequence = parse_fasta(filename)

# Store the parsed data in the SQL table
store_in_db(protein_name, sequence_id, sequence)

# Display the contents of the file
with open(filename, 'r') as f:
    file_contents = f.read()
    print(file_contents)


