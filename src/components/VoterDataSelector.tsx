import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, AlertTriangle } from "lucide-react";

interface VoterProfile {
  voter_id: string;
  name: string;
  age: string;
  fingerprint_hash: string;
  is_fake?: boolean;
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
  { voter_id: "NCR-050123", name: "Yogesh Pandey", age: "27", fingerprint_hash: "ijklmnopqrstuvw9" },
  
  // Fake cards with invalid signatures
  { voter_id: "FAKE-001", name: "John Hacker", age: "35", fingerprint_hash: "fake123hash456", is_fake: true },
  { voter_id: "FAKE-002", name: "Jane Fraudster", age: "28", fingerprint_hash: "invalid789xyz", is_fake: true },
  { voter_id: "FAKE-003", name: "Bob Criminal", age: "42", fingerprint_hash: "corrupted999", is_fake: true },
];

const VoterDataSelector: React.FC<VoterDataSelectorProps> = ({ onSelectVoter, selectedVoter }) => {
  return (
    <Card className="mb-4 sm:mb-6 mx-2 sm:mx-0 shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center text-voting-primary text-lg sm:text-xl">
          <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="leading-tight">Quick Demo - Select Voter Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex-1 min-w-0">
              <Select onValueChange={(value) => {
                const voter = sampleVoters.find(v => v.voter_id === value);
                if (voter) onSelectVoter(voter);
              }}>
                <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base border-2 hover:border-voting-secondary transition-colors">
                  <SelectValue placeholder="Select a voter from the electoral roll..." />
                </SelectTrigger>
                <SelectContent className="max-h-60 sm:max-h-80 overflow-y-auto">
                  <div className="p-2 text-xs text-muted-foreground border-b mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="h-3 w-3 text-green-600" />
                      <span>Valid Cards</span>
                    </div>
                  </div>
                  {sampleVoters.filter(v => !v.is_fake).map((voter) => (
                    <SelectItem key={voter.voter_id} value={voter.voter_id}>
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="truncate">{voter.name} - {voter.voter_id}</span>
                      </div>
                    </SelectItem>
                  ))}
                  <div className="p-2 text-xs text-muted-foreground border-b border-t mt-2 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span>Fake/Invalid Cards (For Testing)</span>
                    </div>
                  </div>
                  {sampleVoters.filter(v => v.is_fake).map((voter) => (
                    <SelectItem key={voter.voter_id} value={voter.voter_id}>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="truncate text-red-700">{voter.name} - {voter.voter_id}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedVoter && (
            <div className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 ${
              selectedVoter.is_fake 
                ? 'bg-red-50 border-red-200 shadow-red-100' 
                : 'bg-voting-accent border-voting-secondary shadow-blue-100'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium text-sm sm:text-base ${
                  selectedVoter.is_fake ? 'text-red-700' : 'text-voting-primary'
                }`}>
                  Selected Voter:
                </h4>
                {selectedVoter.is_fake && (
                  <div className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-medium">FAKE CARD</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-600">Name:</span> 
                  <span className={`font-medium ${selectedVoter.is_fake ? 'text-red-700' : 'text-gray-900'} sm:block`}>
                    {selectedVoter.name}
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-600">Voter ID:</span> 
                  <span className={`font-medium ${selectedVoter.is_fake ? 'text-red-700' : 'text-gray-900'} sm:block`}>
                    {selectedVoter.voter_id}
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-600">Age:</span> 
                  <span className={`font-medium ${selectedVoter.is_fake ? 'text-red-700' : 'text-gray-900'} sm:block`}>
                    {selectedVoter.age}
                  </span>
                </div>
                <div className="flex justify-between sm:block">
                  <span className="font-medium text-gray-600">Fingerprint:</span> 
                  <span className={`font-medium ${selectedVoter.is_fake ? 'text-red-700' : 'text-gray-900'} font-mono text-xs sm:block`}>
                    {selectedVoter.fingerprint_hash.substring(0, 12)}...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-xs sm:text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <p className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>Demo Feature</span>
            </p>
            <p className="leading-relaxed">
              This feature simulates the voting day verification process. Select any voter from our sample electoral roll to auto-fill their details and test the NFC card generation and verification workflow. Try both valid and fake cards to see the security features in action.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoterDataSelector;
