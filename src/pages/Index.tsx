
import { useState } from "react";
import VoterVerification from "@/components/VoterVerification";
import { Button } from "@/components/ui/button";
import { Info, Github, FileInput, ScanLine, ShieldCheck, Building2, ChevronDown, Home, CreditCard, Hospital, Banknote } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import NFCCard from "@/components/NFCCard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'voting' | 'services'>('voting');
  const [selectedUser, setSelectedUser] = useState<string | null>("priya");
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null);
  
  const userProfiles = {
    arjun: {
      name: "Arjun Kumar",
      voter_id: "NCR-789456",
      age: "35",
      card: {
        name: "Arjun Kumar",
        voter_id: "NCR-789456"
      }
    },
    priya: {
      name: "Priya Sharma",
      voter_id: "NCR-664278",
      age: "62",
      card: {
        name: "Priya Sharma",
        voter_id: "NCR-664278"
      },
      pension: {
        account_id: "PCT-6543",
        monthly_amount: "₹3,200",
        last_payout: "1st April 2025"
      }
    },
    rahul: {
      name: "Rahul Singh",
      voter_id: "NCR-112233",
      age: "28",
      card: {
        name: "Rahul Singh",
        voter_id: "NCR-112233"
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-voting-primary text-white py-4 shadow-lg">
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
            
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "text-white hover:bg-white/10",
                        activeSection === 'voting' && "bg-white/10"
                      )}
                      onClick={() => setActiveSection('voting')}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Voter Verification
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "text-white hover:bg-white/10",
                        activeSection === 'services' && "bg-white/10"
                      )}
                      onClick={() => setActiveSection('services')}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Government Services
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
      
      {/* Mobile Navigation */}
      <div className="md:hidden bg-voting-secondary text-white p-2">
        <div className="flex justify-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-white hover:bg-white/10 flex-1",
              activeSection === 'voting' && "bg-white/10"
            )}
            onClick={() => setActiveSection('voting')}
          >
            <Home className="mr-2 h-4 w-4" />
            Voter Verification
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "text-white hover:bg-white/10 flex-1",
              activeSection === 'services' && "bg-white/10"
            )}
            onClick={() => setActiveSection('services')}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Gov Services
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'voting' && (
          <>
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
          </>
        )}
        
        {activeSection === 'services' && (
          <div className="max-w-5xl mx-auto">
            {/* Dark theme header section */}
            <div className="bg-[#0A1220] text-white p-8 rounded-t-xl shadow-lg">
              <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-4xl font-bold mb-6">
                  Government <span className="text-cyan-400">Services</span>
                </h2>
                <p className="text-lg text-gray-300">
                  Project Ncrypt's identity verification system extends beyond voting to secure access to essential government services.
                </p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <Info className="h-4 w-4 mr-2" />
                  <span>Sound On</span>
                </div>
              </div>

              {/* User card selection */}
              <div className="max-w-4xl mx-auto bg-[#0F1A2A] p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-medium text-center mb-6">Select User Card</h3>
                
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {Object.entries(userProfiles).map(([id, profile]) => (
                    <button
                      key={id}
                      onClick={() => {
                        setSelectedUser(id);
                        setShowServiceDetails(null);
                      }}
                      className={cn(
                        "px-6 py-3 rounded-md flex items-center text-gray-300 transition-colors",
                        selectedUser === id ? "bg-voting-secondary text-white" : "bg-gray-800/50 hover:bg-gray-800"
                      )}
                    >
                      <User className="h-5 w-5 mr-2" />
                      {profile.name}
                    </button>
                  ))}
                </div>
                
                {/* Selected card display */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="relative">
                    {selectedUser && (
                      <NFCCard 
                        isCardWritten={true}
                        voterData={userProfiles[selectedUser].card}
                        className="shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      />
                    )}
                  </div>
                  
                  {/* Service details panel */}
                  {showServiceDetails === 'pension' && selectedUser === 'priya' && (
                    <div className="bg-[#0F1A2A] border border-gray-800 rounded-lg p-4 max-w-md w-full">
                      <div className="flex items-center text-cyan-400 mb-4">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <h4 className="text-lg font-semibold">Pension Account Details</h4>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span className="font-medium text-white">{userProfiles.priya.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Age:</span>
                          <span className="font-medium text-white">{userProfiles.priya.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Pension Account ID:</span>
                          <span className="font-medium text-white">{userProfiles.priya.pension.account_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Pension:</span>
                          <span className="font-medium text-cyan-400">{userProfiles.priya.pension.monthly_amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Payout:</span>
                          <span className="font-medium text-white">{userProfiles.priya.pension.last_payout}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Services grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={() => setShowServiceDetails(null)}
                  className="bg-[#0F1A2A] hover:bg-[#162032] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300"
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Banknote className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Ration Center</h4>
                  <p className="text-sm text-gray-400">Public Distribution System</p>
                </button>
                <button
                  onClick={() => setShowServiceDetails(null)}
                  className="bg-[#0F1A2A] hover:bg-[#162032] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300"
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hospital className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Health Hospital</h4>
                  <p className="text-sm text-gray-400">Government Medical Services</p>
                </button>
                <button
                  onClick={() => setShowServiceDetails('pension')}
                  className={cn(
                    "bg-[#0F1A2A] hover:bg-[#162032] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300",
                    showServiceDetails === 'pension' && "ring-2 ring-cyan-400"
                  )}
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Pension Centre</h4>
                  <p className="text-sm text-gray-400">Government Pension Scheme</p>
                </button>
              </div>
              
              {/* Call to action button */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setActiveSection('voting')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-6 rounded-full flex items-center"
                >
                  <ScanLine className="mr-2 h-5 w-5" />
                  Explore Voting Verification
                </Button>
              </div>
              
              {/* NFC activated notification */}
              <div className="absolute right-8 bottom-8 max-w-xs bg-[#0F1A2A] border border-gray-800 rounded-lg p-4 shadow-lg hidden md:block">
                <div className="text-sm font-medium mb-1">NFC Card Activated</div>
                <div className="text-xs text-gray-400">Tap on a government service to access your details.</div>
              </div>
            </div>
          </div>
        )}
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

// Missing User icon component
const User = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
};

export default Index;
