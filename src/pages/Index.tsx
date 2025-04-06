
import { useState } from "react";
import VoterVerification from "@/components/VoterVerification";
import { Button } from "@/components/ui/button";
import { Info, Github } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

const Index = () => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-voting-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white p-1 mr-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-voting-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Project Ncrypt</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-voting-primary">
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>About Project Ncrypt</DialogTitle>
                    <DialogDescription>
                      <p className="mt-2">
                        Project Ncrypt is a secure NFC-based voter verification system that uses encryption to protect voter data.
                      </p>
                      <p className="mt-2">
                        This web-based demonstration showcases the system's ability to:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Generate encrypted voter cards</li>
                        <li>Verify authenticity with government signatures</li>
                        <li>Detect and reject fake/tampered cards</li>
                        <li>Securely display verified voter information</li>
                      </ul>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Based on the original Python implementation by Ajayrx
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <a 
                href="https://github.com/Ajayrx/nfc-voting-system" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-white text-voting-primary hover:bg-gray-100 flex">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-voting-primary mb-6 text-center">
            NFC Voter Verification System
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            This system demonstrates the secure creation and verification of NFC-based voter ID cards using encryption and digital signatures.
          </p>
          
          <VoterVerification />
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-voting-primary mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FileInput className="h-6 w-6 text-voting-primary" />
              </div>
              <h4 className="font-semibold mb-2">1. Create Voter Card</h4>
              <p className="text-sm text-gray-600">Enter voter details and encrypt them to create a secure digital NFC card.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ScanLine className="h-6 w-6 text-voting-primary" />
              </div>
              <h4 className="font-semibold mb-2">2. Scan Card</h4>
              <p className="text-sm text-gray-600">Scan the NFC card and verify the government signature for authenticity.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-voting-primary" />
              </div>
              <h4 className="font-semibold mb-2">3. Verify Identity</h4>
              <p className="text-sm text-gray-600">System verifies the card's authenticity and displays the voter's information.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>Project Ncrypt - NFC Voter Verification System</p>
          <p className="text-sm mt-2 text-slate-400">
            Based on the original implementation by 
            <a 
              href="https://github.com/Ajayrx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              Ajayrx
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
