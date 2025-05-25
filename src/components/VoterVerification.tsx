
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { encrypt_data, decrypt_data } from "@/utils/encryption";
import NFCCard from "./NFCCard";
import VoterDataSelector from "./VoterDataSelector";
import { 
  UserRound, 
  FileInput, 
  Fingerprint, 
  LockKeyhole, 
  FileJson, 
  ShieldCheck, 
  ScanLine,
  AlertTriangle,
  X,
  Check
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Expected Government Signature
const EXPECTED_GOV_SIGNATURE = "gov_secure_2025";

interface VoterProfile {
  voter_id: string;
  name: string;
  age: string;
  fingerprint_hash: string;
  is_fake?: boolean;
}

const VoterVerification: React.FC = () => {
  const { toast } = useToast();
  const [voterData, setVoterData] = useState({
    voter_id: "",
    name: "",
    age: "",
    fingerprint_hash: "",
    gov_signature: EXPECTED_GOV_SIGNATURE
  });
  const [selectedVoter, setSelectedVoter] = useState<VoterProfile | null>(null);
  const [govSignature, setGovSignature] = useState("");
  const [encryptedCard, setEncryptedCard] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [showFakeAlert, setShowFakeAlert] = useState(false);
  const [isCardScanned, setIsCardScanned] = useState(false);
  const [isFakeCard, setIsFakeCard] = useState(false);
  const [isCardWritten, setIsCardWritten] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVoterData(prev => ({ ...prev, [name]: value }));
  };

  const handleVoterSelection = (voter: VoterProfile) => {
    setSelectedVoter(voter);
    
    // For fake cards, use invalid signature
    const signature = voter.is_fake ? "fake_signature_invalid" : EXPECTED_GOV_SIGNATURE;
    
    setVoterData({
      voter_id: voter.voter_id,
      name: voter.name,
      age: voter.age,
      fingerprint_hash: voter.fingerprint_hash,
      gov_signature: signature
    });
    // Reset states when new voter is selected
    setEncryptedCard(null);
    setIsCardWritten(false);
    setIsCardScanned(false);
    setScannedData(null);
    setIsFakeCard(false);
  };

  const writeCard = () => {
    if (!voterData.voter_id || !voterData.name || !voterData.age || !voterData.fingerprint_hash) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create a voter card.",
        variant: "destructive"
      });
      return;
    }

    const encrypted = encrypt_data(voterData);
    setEncryptedCard(encrypted);
    setIsCardWritten(true);
    
    if (selectedVoter?.is_fake) {
      toast({
        title: "⚠️ Fake Card Created",
        description: "This card contains invalid signatures for testing purposes.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Success",
        description: "Voter data encrypted and written to NFC card.",
      });
    }
  };

  const readCard = () => {
    if (!encryptedCard) {
      toast({
        title: "❌ Error",
        description: "No NFC card found. Please create a card first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const decrypted = decrypt_data(encryptedCard);
      const signatureValid = decrypted.gov_signature === govSignature;
      
      setScannedData(decrypted);
      setIsCardScanned(true);
      setIsFakeCard(!signatureValid);
      
      if (!signatureValid) {
        setShowFakeAlert(true);
        toast({
          title: "🚨 Invalid Card Detected",
          description: "This card has an invalid government signature.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "✅ Valid Card",
          description: "Card verification successful.",
        });
      }
      
    } catch (error) {
      toast({
        title: "⚠️ Decryption Failed",
        description: "Could not read the NFC card data. The card may be corrupt.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      <VoterDataSelector 
        onSelectVoter={handleVoterSelection}
        selectedVoter={selectedVoter}
      />
      
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 sm:mb-8 h-12 sm:h-14 mx-2 sm:mx-0">
          <TabsTrigger value="write" className="text-sm sm:text-base py-2 sm:py-3 data-[state=active]:bg-voting-primary data-[state=active]:text-white transition-all duration-200">
            <FileInput className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Create Voter Card</span>
            <span className="sm:hidden">Create</span>
          </TabsTrigger>
          <TabsTrigger value="read" className="text-sm sm:text-base py-2 sm:py-3 data-[state=active]:bg-voting-primary data-[state=active]:text-white transition-all duration-200">
            <ScanLine className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Scan Voter Card</span>
            <span className="sm:hidden">Scan</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="animate-fade-in mx-2 sm:mx-0">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center text-voting-primary text-lg sm:text-xl">
                <FileJson className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                <span>Voter Card Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                  <div className="space-y-2">
                    <Label htmlFor="voter_id" className="flex items-center text-sm sm:text-base font-medium">
                      <UserRound className="h-4 w-4 mr-2 flex-shrink-0" />
                      Voter ID
                    </Label>
                    <Input 
                      id="voter_id" 
                      name="voter_id"
                      value={voterData.voter_id}
                      onChange={handleInputChange}
                      placeholder="Enter voter ID"
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-voting-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center text-sm sm:text-base font-medium">
                      <UserRound className="h-4 w-4 mr-2 flex-shrink-0" />
                      Name
                    </Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={voterData.name}
                      onChange={handleInputChange}
                      placeholder="Enter voter name"
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-voting-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center text-sm sm:text-base font-medium">
                      <UserRound className="h-4 w-4 mr-2 flex-shrink-0" />
                      Age
                    </Label>
                    <Input 
                      id="age" 
                      name="age"
                      value={voterData.age}
                      onChange={handleInputChange}
                      placeholder="Enter voter age" 
                      type="number"
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-voting-primary transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fingerprint_hash" className="flex items-center text-sm sm:text-base font-medium">
                      <Fingerprint className="h-4 w-4 mr-2 flex-shrink-0" />
                      Fingerprint Hash
                    </Label>
                    <Input 
                      id="fingerprint_hash" 
                      name="fingerprint_hash"
                      value={voterData.fingerprint_hash}
                      onChange={handleInputChange}
                      placeholder="Enter fingerprint hash"
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-voting-primary transition-colors font-mono"
                    />
                  </div>
                  
                  <Button 
                    onClick={writeCard} 
                    className="w-full h-12 sm:h-14 bg-voting-primary hover:bg-voting-secondary text-sm sm:text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Encrypt and Write to NFC Card
                  </Button>
                </div>
                
                <div className="flex flex-col items-center justify-center order-1 lg:order-2 py-4 sm:py-8">
                  <NFCCard 
                    isCardWritten={isCardWritten} 
                    voterData={isCardWritten ? { name: voterData.name, voter_id: voterData.voter_id } : undefined}
                    isFake={selectedVoter?.is_fake}
                    className="transform transition-all duration-300 hover:scale-105"
                  />
                  <div className="text-xs sm:text-sm text-muted-foreground mt-4 text-center space-y-2">
                    <p className="flex items-center justify-center">
                      <ShieldCheck className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-voting-success flex-shrink-0" />
                      <span className="font-medium">Official Gov Signature: {EXPECTED_GOV_SIGNATURE}</span>
                    </p>
                    <p className="leading-relaxed">This signature is embedded in the card for verification</p>
                    {selectedVoter?.is_fake && (
                      <p className="text-red-600 font-medium flex items-center justify-center">
                        <AlertTriangle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        This is a fake card for testing purposes
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="read" className="animate-fade-in mx-2 sm:mx-0">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center text-voting-primary text-lg sm:text-xl">
                <ScanLine className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                <span>Voter Card Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
                  <div className="space-y-2">
                    <Label htmlFor="gov_signature" className="flex items-center text-sm sm:text-base font-medium">
                      <LockKeyhole className="h-4 w-4 mr-2 flex-shrink-0" />
                      Enter Government Signature
                    </Label>
                    <Input 
                      id="gov_signature" 
                      value={govSignature}
                      onChange={(e) => setGovSignature(e.target.value)}
                      placeholder="Enter government signature for verification"
                      className="h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-voting-primary transition-colors font-mono"
                    />
                  </div>
                  
                  <Button 
                    onClick={readCard} 
                    className="w-full h-12 sm:h-14 bg-voting-secondary hover:bg-voting-primary text-sm sm:text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    disabled={!encryptedCard}
                  >
                    <ScanLine className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Scan NFC Card
                  </Button>
                  
                  {!encryptedCard && (
                    <div className="p-3 sm:p-4 bg-amber-50 border-2 border-amber-200 rounded-lg text-xs sm:text-sm text-amber-800">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium">No Card Available</span>
                      </div>
                      <p>No NFC card has been created yet. Please go to the "Create Voter Card" tab to generate a card first.</p>
                    </div>
                  )}
                  
                  {scannedData && !isFakeCard && (
                    <div className="p-3 sm:p-4 bg-green-50 rounded-lg text-xs sm:text-sm font-mono border-2 border-green-200 animate-fade-in">
                      <div className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        ✅ Valid Voter Data Verified
                      </div>
                      <div className="space-y-2 text-green-900">
                        <p><span className="font-medium">🆔 Voter ID:</span> {scannedData.voter_id}</p>
                        <p><span className="font-medium">👤 Name:</span> {scannedData.name}</p>
                        <p><span className="font-medium">🎂 Age:</span> {scannedData.age}</p>
                        <p><span className="font-medium">🔏 Fingerprint:</span> {scannedData.fingerprint_hash}</p>
                        <p className="text-green-700 font-semibold">✅ Signature: Valid Government Card</p>
                      </div>
                    </div>
                  )}

                  {isFakeCard && (
                    <div className="p-3 sm:p-4 bg-red-50 rounded-lg text-xs sm:text-sm border-2 border-red-200 animate-fade-in">
                      <div className="font-semibold mb-3 text-red-800 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        ❌ FAKE CARD DETECTED
                      </div>
                      <div className="space-y-2 text-red-900">
                        <p className="text-red-700 font-semibold">❌ Invalid Government Signature</p>
                        <p className="text-sm">This card failed verification and should not be accepted for voting.</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-center justify-center order-1 lg:order-2 py-4 sm:py-8">
                  <NFCCard 
                    isScanned={isCardScanned} 
                    isFake={isFakeCard} 
                    voterData={scannedData && !isFakeCard ? { name: scannedData.name, voter_id: scannedData.voter_id } : undefined}
                    className="transform transition-all duration-300 hover:scale-105"
                  />
                  <div className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
                    <p>Place NFC card on the reader</p>
                    {isCardScanned && (
                      <p className={`mt-2 font-medium ${isFakeCard ? 'text-red-600' : 'text-green-600'}`}>
                        {isFakeCard ? '🚨 Card Rejected' : '✅ Card Verified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={showFakeAlert} onOpenChange={setShowFakeAlert}>
        <AlertDialogContent className="bg-red-600 text-white border-none mx-4 sm:mx-0 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl font-bold flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              FAKE NFC CARD DETECTED
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-100">
              This card has failed government signature verification and should not be accepted for voting or any official services.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => setShowFakeAlert(false)} 
              className="bg-white text-red-600 hover:bg-gray-100 font-medium"
            >
              Dismiss Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VoterVerification;
