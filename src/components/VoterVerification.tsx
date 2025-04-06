
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { encrypt_data, decrypt_data } from "@/utils/encryption";
import NFCCard from "./NFCCard";
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
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

// Expected Government Signature
const EXPECTED_GOV_SIGNATURE = "gov_secure_2025";

const VoterVerification: React.FC = () => {
  const { toast } = useToast();
  const [voterData, setVoterData] = useState({
    voter_id: "",
    name: "",
    age: "",
    fingerprint_hash: "",
    gov_signature: EXPECTED_GOV_SIGNATURE
  });
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
    
    toast({
      title: "✅ Success",
      description: "Voter data encrypted and written to NFC card.",
    });
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
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="write" className="text-base py-3">
            <FileInput className="mr-2 h-5 w-5" />
            Create Voter Card
          </TabsTrigger>
          <TabsTrigger value="read" className="text-base py-3">
            <ScanLine className="mr-2 h-5 w-5" />
            Scan Voter Card
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-voting-primary">
                <FileJson className="mr-2 h-6 w-6" />
                Voter Card Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voter_id" className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Voter ID
                    </Label>
                    <Input 
                      id="voter_id" 
                      name="voter_id"
                      value={voterData.voter_id}
                      onChange={handleInputChange}
                      placeholder="Enter voter ID" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Name
                    </Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={voterData.name}
                      onChange={handleInputChange}
                      placeholder="Enter voter name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center">
                      <UserRound className="h-4 w-4 mr-2" />
                      Age
                    </Label>
                    <Input 
                      id="age" 
                      name="age"
                      value={voterData.age}
                      onChange={handleInputChange}
                      placeholder="Enter voter age" 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fingerprint_hash" className="flex items-center">
                      <Fingerprint className="h-4 w-4 mr-2" />
                      Fingerprint Hash
                    </Label>
                    <Input 
                      id="fingerprint_hash" 
                      name="fingerprint_hash"
                      value={voterData.fingerprint_hash}
                      onChange={handleInputChange}
                      placeholder="Enter fingerprint hash" 
                    />
                  </div>
                  
                  <Button onClick={writeCard} className="w-full bg-voting-primary hover:bg-voting-secondary">
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Encrypt and Write to NFC Card
                  </Button>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <NFCCard 
                    isCardWritten={isCardWritten} 
                    voterData={isCardWritten ? { name: voterData.name, voter_id: voterData.voter_id } : undefined}
                  />
                  <div className="text-sm text-muted-foreground mt-4 text-center">
                    <p className="flex items-center justify-center">
                      <ShieldCheck className="mr-1 h-4 w-4 text-voting-success" />
                      Official Gov Signature: {EXPECTED_GOV_SIGNATURE}
                    </p>
                    <p className="mt-2">This signature is embedded in the card for verification</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="read" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-voting-primary">
                <ScanLine className="mr-2 h-6 w-6" />
                Voter Card Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gov_signature" className="flex items-center">
                      <LockKeyhole className="h-4 w-4 mr-2" />
                      Enter Government Signature
                    </Label>
                    <Input 
                      id="gov_signature" 
                      value={govSignature}
                      onChange={(e) => setGovSignature(e.target.value)}
                      placeholder="Enter government signature for verification" 
                    />
                  </div>
                  
                  <Button 
                    onClick={readCard} 
                    className="w-full bg-voting-secondary hover:bg-voting-primary"
                    disabled={!encryptedCard}
                  >
                    <ScanLine className="mr-2 h-5 w-5" />
                    Scan NFC Card
                  </Button>
                  
                  {!encryptedCard && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
                      No NFC card has been created yet. Please go to the "Create Voter Card" tab to generate a card first.
                    </div>
                  )}
                  
                  {scannedData && (
                    <div className="p-4 bg-voting-accent rounded-md text-sm font-mono whitespace-pre-line border border-voting-secondary">
                      <div className="font-semibold mb-2 text-voting-primary">🔐 Voter Data Scanned:</div>
                      <div className="border-t border-voting-secondary/30 pt-2">
                        <p>🆔 Voter ID: {scannedData.voter_id}</p>
                        <p>🙍 Name: {scannedData.name}</p>
                        <p>🎂 Age: {scannedData.age}</p>
                        <p>🔏 Fingerprint Hash: {scannedData.fingerprint_hash}</p>
                        <p className={isFakeCard ? "text-voting-danger font-semibold" : "text-voting-success font-semibold"}>
                          {isFakeCard ? '❌ Signature: Invalid Card' : '✅ Signature: Valid'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-center justify-center">
                  <NFCCard 
                    isScanned={isCardScanned} 
                    isFake={isFakeCard} 
                    voterData={scannedData ? { name: scannedData.name, voter_id: scannedData.voter_id } : undefined}
                  />
                  <div className="text-sm text-muted-foreground mt-4">
                    <p className="text-center">Place NFC card on the reader</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={showFakeAlert} onOpenChange={setShowFakeAlert}>
        <AlertDialogContent className="bg-voting-danger text-white border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              FAKE NFC CARD DETECTED
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowFakeAlert(false)} className="bg-white text-voting-danger hover:bg-gray-100">
              Dismiss
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VoterVerification;
