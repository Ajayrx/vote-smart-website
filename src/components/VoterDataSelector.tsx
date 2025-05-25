
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck } from "lucide-react";

interface VoterProfile {
  voter_id: string;
  name: string;
  age: string;
  fingerprint_hash: string;
}

interface VoterDataSelectorProps {
  onSelectVoter: (voter: VoterProfile) => void;
  selectedVoter: VoterProfile | null;
}

const sampleVoters: VoterProfile[] = [
  { voter_id: "NCR-001234", name: "Rajesh Kumar", age: "35", fingerprint_hash: "a8b9c0d1e2f34567890" },
  { voter_id: "NCR-002345", name: "Priya Sharma", age: "28", fingerprint_hash: "b9c0d1e2f345678901a" },
  { voter_id: "NCR-003456", name: "Amit Singh", age: "42", fingerprint_hash: "c0d1e2f345678901ab2" },
  { voter_id: "NCR-004567", name: "Sunita Devi", age: "39", fingerprint_hash: "d1e2f345678901abc3" },
  { voter_id: "NCR-005678", name: "Vikram Yadav", age: "31", fingerprint_hash: "e2f345678901abcd4" },
  { voter_id: "NCR-006789", name: "Anjali Gupta", age: "26", fingerprint_hash: "f345678901abcde5" },
  { voter_id: "NCR-007890", name: "Ravi Patel", age: "45", fingerprint_hash: "345678901abcdef6" },
  { voter_id: "NCR-008901", name: "Meera Jain", age: "33", fingerprint_hash: "45678901abcdefg7" },
  { voter_id: "NCR-009012", name: "Suresh Reddy", age: "38", fingerprint_hash: "5678901abcdefgh8" },
  { voter_id: "NCR-010123", name: "Kavita Nair", age: "29", fingerprint_hash: "678901abcdefghi9" },
  { voter_id: "NCR-011234", name: "Deepak Agarwal", age: "41", fingerprint_hash: "78901abcdefghij0" },
  { voter_id: "NCR-012345", name: "Rohini Das", age: "36", fingerprint_hash: "8901abcdefghijk1" },
  { voter_id: "NCR-013456", name: "Manoj Tiwari", age: "43", fingerprint_hash: "901abcdefghijkl2" },
  { voter_id: "NCR-014567", name: "Sita Ram", age: "32", fingerprint_hash: "01abcdefghijklm3" },
  { voter_id: "NCR-015678", name: "Arjun Mishra", age: "27", fingerprint_hash: "1abcdefghijklmn4" },
  { voter_id: "NCR-016789", name: "Geeta Verma", age: "44", fingerprint_hash: "abcdefghijklmno5" },
  { voter_id: "NCR-017890", name: "Kiran Joshi", age: "30", fingerprint_hash: "bcdefghijklmnop6" },
  { voter_id: "NCR-018901", name: "Rahul Chopra", age: "37", fingerprint_hash: "cdefghijklmnopq7" },
  { voter_id: "NCR-019012", name: "Lata Saxena", age: "40", fingerprint_hash: "defghijklmnopqr8" },
  { voter_id: "NCR-020123", name: "Vinod Pandey", age: "34", fingerprint_hash: "efghijklmnopqrs9" },
  { voter_id: "NCR-021234", name: "Rekha Bansal", age: "25", fingerprint_hash: "fghijklmnopqrst0" },
  { voter_id: "NCR-022345", name: "Ashok Mehta", age: "46", fingerprint_hash: "ghijklmnopqrstu1" },
  { voter_id: "NCR-023456", name: "Pushpa Goyal", age: "48", fingerprint_hash: "hijklmnopqrstuv2" },
  { voter_id: "NCR-024567", name: "Naresh Malhotra", age: "35", fingerprint_hash: "ijklmnopqrstuvw3" },
  { voter_id: "NCR-025678", name: "Shanti Kapoor", age: "52", fingerprint_hash: "jklmnopqrstuvwx4" },
  { voter_id: "NCR-026789", name: "Mohan Lal", age: "49", fingerprint_hash: "klmnopqrstuvwxy5" },
  { voter_id: "NCR-027890", name: "Kamala Devi", age: "51", fingerprint_hash: "lmnopqrstuvwxyz6" },
  { voter_id: "NCR-028901", name: "Jagdish Prasad", age: "47", fingerprint_hash: "mnopqrstuvwxyza7" },
  { voter_id: "NCR-029012", name: "Usha Sinha", age: "33", fingerprint_hash: "nopqrstuvwxyzab8" },
  { voter_id: "NCR-030123", name: "Bharat Chandra", age: "38", fingerprint_hash: "opqrstuvwxyzabc9" },
  { voter_id: "NCR-031234", name: "Savita Kumari", age: "31", fingerprint_hash: "pqrstuvwxyzabcd0" },
  { voter_id: "NCR-032345", name: "Govind Singh", age: "29", fingerprint_hash: "qrstuvwxyzabcde1" },
  { voter_id: "NCR-033456", name: "Radha Rani", age: "26", fingerprint_hash: "rstuvwxyzabcdef2" },
  { voter_id: "NCR-034567", name: "Hari Om", age: "45", fingerprint_hash: "stuvwxyzabcdefg3" },
  { voter_id: "NCR-035678", name: "Parvati Sharma", age: "42", fingerprint_hash: "tuvwxyzabcdefgh4" },
  { voter_id: "NCR-036789", name: "Ramesh Gupta", age: "39", fingerprint_hash: "uvwxyzabcdefghi5" },
  { voter_id: "NCR-037890", name: "Krishna Devi", age: "36", fingerprint_hash: "vwxyzabcdefghij6" },
  { voter_id: "NCR-038901", name: "Shyam Sundar", age: "44", fingerprint_hash: "wxyzabcdefghijk7" },
  { voter_id: "NCR-039012", name: "Manju Bala", age: "41", fingerprint_hash: "xyzabcdefghijkl8" },
  { voter_id: "NCR-040123", name: "Dinesh Kumar", age: "37", fingerprint_hash: "yzabcdefghijklm9" },
  { voter_id: "NCR-041234", name: "Sarita Agarwal", age: "34", fingerprint_hash: "zabcdefghijklmn0" },
  { voter_id: "NCR-042345", name: "Mukesh Yadav", age: "40", fingerprint_hash: "abcdefghijklmno1" },
  { voter_id: "NCR-043456", name: "Anita Singh", age: "28", fingerprint_hash: "bcdefghijklmnop2" },
  { voter_id: "NCR-044567", name: "Balram Das", age: "50", fingerprint_hash: "cdefghijklmnopq3" },
  { voter_id: "NCR-045678", name: "Kanchan Verma", age: "32", fingerprint_hash: "defghijklmnopqr4" },
  { voter_id: "NCR-046789", name: "Santosh Kumar", age: "43", fingerprint_hash: "efghijklmnopqrs5" },
  { voter_id: "NCR-047890", name: "Nirmala Devi", age: "46", fingerprint_hash: "fghijklmnopqrst6" },
  { voter_id: "NCR-048901", name: "Pramod Jain", age: "35", fingerprint_hash: "ghijklmnopqrstu7" },
  { voter_id: "NCR-049012", name: "Sunanda Rao", age: "30", fingerprint_hash: "hijklmnopqrstuv8" },
  { voter_id: "NCR-050123", name: "Yogesh Pandey", age: "27", fingerprint_hash: "ijklmnopqrstuvw9" }
];

const VoterDataSelector: React.FC<VoterDataSelectorProps> = ({ onSelectVoter, selectedVoter }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-voting-primary">
          <Users className="mr-2 h-5 w-5" />
          Quick Demo - Select Pre-filled Voter Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select onValueChange={(value) => {
                const voter = sampleVoters.find(v => v.voter_id === value);
                if (voter) onSelectVoter(voter);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voter from the electoral roll..." />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {sampleVoters.map((voter) => (
                    <SelectItem key={voter.voter_id} value={voter.voter_id}>
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4" />
                        <span>{voter.name} - {voter.voter_id}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedVoter && (
            <div className="p-3 bg-voting-accent rounded-md border border-voting-secondary">
              <h4 className="font-medium text-voting-primary mb-2">Selected Voter:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium">Name:</span> {selectedVoter.name}</div>
                <div><span className="font-medium">Voter ID:</span> {selectedVoter.voter_id}</div>
                <div><span className="font-medium">Age:</span> {selectedVoter.age}</div>
                <div><span className="font-medium">Fingerprint:</span> {selectedVoter.fingerprint_hash.substring(0, 15)}...</div>
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            <p className="font-medium text-blue-800 mb-1">💡 Demo Feature</p>
            <p>This feature simulates the voting day verification process. Select any voter from our sample electoral roll to auto-fill their details and test the NFC card generation and verification workflow.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoterDataSelector;
