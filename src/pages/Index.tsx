import { useState } from "react";
import VoterVerification from "@/components/VoterVerification";
import { Button } from "@/components/ui/button";
import { Info, Github, FileInput, ScanLine, ShieldCheck, Building2, ChevronDown, Home, CreditCard, Hospital, Banknote, Package, VolumeX, Volume2, AlertTriangle } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'voting' | 'services'>('voting');
  const [selectedUser, setSelectedUser] = useState<string | null>("priya");
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [govSignature, setGovSignature] = useState("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verificationAttempted, setVerificationAttempted] = useState<boolean>(false);
  
  const userProfiles = {
    arjun: {
      name: "Arjun Kumar",
      voter_id: "NCR-789456",
      age: "35",
      card: {
        name: "Arjun Kumar",
        voter_id: "NCR-789456"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-2247",
        family_members: "4",
        category: "APL",
        monthly_allocation: "25kg Rice, 10kg Wheat, 5L Oil",
        last_collection: "March 15, 2025"
      },
      medical: {
        id: "HLT-31456",
        coverage: "Comprehensive",
        last_checkup: "February 2, 2025",
        upcoming_appointment: "May 12, 2025",
        doctor: "Dr. Mehta"
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
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-1155",
        family_members: "2",
        category: "BPL",
        monthly_allocation: "35kg Rice, 15kg Wheat, 5L Oil, 2kg Sugar",
        last_collection: "April 1, 2025"
      },
      pension: {
        account_id: "PCT-6543",
        monthly_amount: "₹3,200",
        last_payout: "1st April 2025",
        years_of_service: "32",
        retirement_date: "2023"
      },
      medical: {
        id: "HLT-22875",
        coverage: "Senior Coverage Plus",
        last_checkup: "March 25, 2025",
        upcoming_appointment: "April 25, 2025",
        doctor: "Dr. Sunita Reddy",
        prescriptions: "Blood pressure medication, calcium supplements"
      }
    },
    rahul: {
      name: "Rahul Singh",
      voter_id: "NCR-112233",
      age: "28",
      card: {
        name: "Rahul Singh",
        voter_id: "NCR-112233"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-3367",
        family_members: "3",
        category: "APL",
        monthly_allocation: "20kg Rice, 10kg Wheat, 3L Oil",
        last_collection: "March 22, 2025"
      },
      medical: {
        id: "HLT-40223",
        coverage: "Basic",
        last_checkup: "January 15, 2025",
        upcoming_appointment: "July 15, 2025",
        doctor: "Dr. Patel"
      }
    },
    // Fake user for testing
    fake_user: {
      name: "John Hacker",
      voter_id: "FAKE-001",
      age: "35",
      card: {
        name: "John Hacker",
        voter_id: "FAKE-001"
      },
      gov_signature: "fake_signature_invalid",
      ration: {
        card_number: "FAKE-001",
        family_members: "1",
        category: "INVALID",
        monthly_allocation: "UNAUTHORIZED ACCESS",
        last_collection: "NEVER"
      },
      medical: {
        id: "FAKE-001",
        coverage: "NONE",
        last_checkup: "INVALID",
        upcoming_appointment: "BLOCKED",
        doctor: "UNAUTHORIZED"
      }
    }
  };

  const handleSignatureVerification = () => {
    setVerificationAttempted(true);
    if (!selectedUser) return;
    
    const user = userProfiles[selectedUser as keyof typeof userProfiles];
    const isValid = user.gov_signature === govSignature;
    setIsVerified(isValid);
    
    if (isValid) {
      toast({
        title: "✅ Verification Successful",
        description: "Government signature verified. Access granted to services.",
      });
    } else {
      toast({
        title: "🚨 Verification Failed",
        description: "Invalid government signature. Access denied.",
        variant: "destructive"
      });
    }
  };

  const handleServiceClick = (service: string) => {
    if (!verificationAttempted) {
      toast({
        title: "Verification Required",
        description: "Please verify your government signature first to access services.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isVerified) {
      toast({
        title: "Access Denied",
        description: "Invalid signature. Cannot access government services.",
        variant: "destructive"
      });
      return;
    }
    
    setShowServiceDetails(service);
  };

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
    setShowServiceDetails(null);
    setVerificationAttempted(false);
    setIsVerified(false);
    setGovSignature("");
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-voting-primary text-white py-3 sm:py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white p-1 mr-2 sm:mr-3 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-voting-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold">Project Ncrypt</h1>
            </div>
            
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "text-white hover:bg-white/10 text-sm sm:text-base",
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
                        "text-white hover:bg-white/10 text-sm sm:text-base",
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

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-voting-primary text-xs sm:text-sm px-2 sm:px-4">
                    <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">About</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="mx-4 sm:mx-0">
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
                        Based on the original implementation by Ajayrx
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
                <Button size="sm" className="bg-white text-voting-primary hover:bg-gray-100 text-xs sm:text-sm px-2 sm:px-4">
                  <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">GitHub</span>
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
              "text-white hover:bg-white/10 flex-1 text-sm",
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
              "text-white hover:bg-white/10 flex-1 text-sm",
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
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {activeSection === 'voting' && (
          <>
            <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-voting-primary mb-4 sm:mb-6 text-center">
                NFC Voter Verification System
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-center max-w-3xl mx-auto text-sm sm:text-base">
                This system demonstrates the secure creation and verification of NFC-based voter ID cards using encryption and digital signatures.
              </p>
              
              <VoterVerification />
            </div>
            
            <div className="mt-8 sm:mt-12 max-w-3xl mx-auto text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-voting-primary mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <FileInput className="h-5 w-5 sm:h-6 sm:w-6 text-voting-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">1. Create Voter Card</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Enter voter details and encrypt them to create a secure digital NFC card.</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ScanLine className="h-5 w-5 sm:h-6 sm:w-6 text-voting-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">2. Scan Card</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Scan the NFC card and verify the government signature for authenticity.</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-voting-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-voting-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">3. Verify Identity</h4>
                  <p className="text-xs sm:text-sm text-gray-600">System verifies the card's authenticity and displays the voter's information.</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeSection === 'services' && (
          <div className="max-w-6xl mx-auto">
            {/* Futuristic themed header section */}
            <div className="bg-[#060c17] text-white p-4 sm:p-8 rounded-t-xl shadow-lg relative overflow-hidden">
              {/* Background grid effect */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTMzNTUiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzAgMEMxMy40MzEgMCAwIDEzLjQzMSAwIDMwYzAgMTYuNTY5IDEzLjQzMSAzMCAzMCAzMCAxNi41NjkgMCAzMC0xMy40MzEgMzAtMzBDNjAgMTMuNDMxIDQ2LjU2OSAwIDMwIDB6bTAgMS42MjJDNDUuNjc5IDEuNjIyIDU4LjM3OCAxNC4zMjEgNTguMzc4IDMwIDU4LjM3OCA0NS42NzkgNDUuNjc5IDU4LjM3OCAzMCA1OC4zNzggMTQuMzIxIDU4LjM3OCAxLjYyMiA0NS42NzkgMS42MjIgMzAgMS42MjIgMTQuMzIxIDE0LjMyMSAxLjYyMiAzMCAxLjYyMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 bg-center"></div>
              
              {/* Digital particles effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-1 h-1 bg-cyan-500 rounded-full top-10 left-20 animate-pulse"></div>
                <div className="absolute w-1 h-1 bg-cyan-500 rounded-full top-20 left-40 animate-pulse delay-150"></div>
                <div className="absolute w-1 h-1 bg-cyan-500 rounded-full top-40 left-60 animate-pulse delay-300"></div>
                <div className="absolute w-1 h-1 bg-cyan-500 rounded-full top-60 left-20 animate-pulse delay-500"></div>
                <div className="absolute w-1 h-1 bg-cyan-500 rounded-full top-30 left-80 animate-pulse delay-700"></div>
              </div>
              
              {/* Blue accent line */}
              <div className="absolute -top-4 left-0 w-full h-1 bg-cyan-500 opacity-60 blur-sm"></div>

              <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-10">
                <h2 className="text-2xl sm:text-4xl font-bold mb-2 flex items-center justify-center flex-wrap">
                  Government <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text ml-2">Services</span>
                </h2>
                <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="text-sm sm:text-lg text-gray-300">
                  Project Ncrypt's identity verification system extends beyond voting to secure access to essential government services.
                </p>
                <div className="mt-4 flex items-center justify-center text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-transparent"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 className="h-4 w-4 text-cyan-400" />
                        <span>Sound On</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-4 w-4 text-gray-400" />
                        <span>Sound Off</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* User card selection */}
              <div className="max-w-5xl mx-auto bg-[#0a1926] p-4 sm:p-6 rounded-lg border border-gray-800 relative">
                <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                
                <h3 className="text-lg sm:text-xl font-medium text-center mb-4 sm:mb-6 text-cyan-100">Select User Card</h3>
                
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {Object.entries(userProfiles).map(([id, profile]) => (
                    <button
                      key={id}
                      onClick={() => handleUserChange(id)}
                      className={cn(
                        "px-3 sm:px-6 py-2 sm:py-3 rounded-md flex items-center transition-all duration-300 text-sm sm:text-base",
                        selectedUser === id 
                          ? "bg-gradient-to-r from-cyan-900/80 to-blue-900/80 text-white border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]" 
                          : "bg-gray-800/50 hover:bg-gray-800 text-gray-300 border border-gray-700",
                        id === 'fake_user' && "border-red-500/50 text-red-300"
                      )}
                    >
                      <User className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="truncate">{profile.name}</span>
                      {id === 'fake_user' && <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 ml-1 text-red-400" />}
                    </button>
                  ))}
                </div>

                {/* Signature verification section */}
                <div className="mb-6 p-4 bg-[#0d1e2d] rounded-lg border border-gray-700">
                  <h4 className="text-cyan-400 font-medium mb-3 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Government Signature Verification
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={govSignature}
                      onChange={(e) => setGovSignature(e.target.value)}
                      placeholder="Enter government signature"
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    <Button
                      onClick={handleSignatureVerification}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 text-sm"
                    >
                      Verify Signature
                    </Button>
                  </div>
                  {verificationAttempted && (
                    <div className={`mt-3 p-2 rounded text-sm ${
                      isVerified 
                        ? 'bg-green-900/50 text-green-300 border border-green-700' 
                        : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {isVerified ? '✅ Signature verified - Access granted' : '❌ Invalid signature - Access denied'}
                    </div>
                  )}
                </div>
                
                {/* Card and Service details display in grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                  {/* NFC Card - 2 columns */}
                  <div className="lg:col-span-2 flex flex-col items-center justify-center">
                    {selectedUser && (
                      <>
                        <div className="relative mb-4">
                          <NFCCard 
                            isCardWritten={true}
                            voterData={userProfiles[selectedUser as keyof typeof userProfiles].card}
                            className="shadow-[0_0_25px_rgba(34,211,238,0.3)] scale-90 sm:scale-100"
                            isFake={selectedUser === 'fake_user'}
                          />
                          <div className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg text-xs font-bold">
                            NFC
                          </div>
                        </div>
                        <div className="text-xs text-cyan-500 flex items-center">
                          <div className="animate-ping w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                          NFC Card Active
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Service details panel - 3 columns */}
                  <div className="lg:col-span-3 min-h-[200px] sm:min-h-[300px]">
                    {showServiceDetails && selectedUser && isVerified && (
                      <div className="bg-[#0a1926] border border-gray-800 rounded-lg p-4 sm:p-5 h-full animate-fade-in">
                        <div className="flex items-center text-cyan-400 mb-4">
                          {showServiceDetails === 'pension' && (
                            <>
                              <CreditCard className="h-5 w-5 mr-2" />
                              <h4 className="text-lg font-semibold">Pension Account Details</h4>
                            </>
                          )}
                          {showServiceDetails === 'ration' && (
                            <>
                              <Package className="h-5 w-5 mr-2" />
                              <h4 className="text-lg font-semibold">Ration Card Details</h4>
                            </>
                          )}
                          {showServiceDetails === 'medical' && (
                            <>
                              <Hospital className="h-5 w-5 mr-2" />
                              <h4 className="text-lg font-semibold">Medical Coverage Details</h4>
                            </>
                          )}
                        </div>
                        
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between sm:block">
                              <span className="text-gray-400">Name:</span>
                              <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].name}</span>
                            </div>
                            <div className="flex justify-between sm:block">
                              <span className="text-gray-400">Age:</span>
                              <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].age}</span>
                            </div>
                            <div className="flex justify-between sm:block sm:col-span-2">
                              <span className="text-gray-400">Voter ID:</span>
                              <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].voter_id}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Service-specific details */}
                        <div className="space-y-3 text-sm">
                          {showServiceDetails === 'pension' && userProfiles[selectedUser as keyof typeof userProfiles].pension && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pension Account ID:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].pension!.account_id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Monthly Pension:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser as keyof typeof userProfiles].pension!.monthly_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Payout:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].pension!.last_payout}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Years of Service:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].pension!.years_of_service}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Retirement Date:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].pension!.retirement_date}</span>
                              </div>
                            </>
                          )}
                          
                          {showServiceDetails === 'ration' && userProfiles[selectedUser as keyof typeof userProfiles].ration && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Ration Card Number:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].ration.card_number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Category:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser as keyof typeof userProfiles].ration.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Family Members:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].ration.family_members}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Monthly Allocation:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].ration.monthly_allocation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Collection:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].ration.last_collection}</span>
                              </div>
                            </>
                          )}
                          
                          {showServiceDetails === 'medical' && userProfiles[selectedUser as keyof typeof userProfiles].medical && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Medical ID:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].medical.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Coverage Type:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser as keyof typeof userProfiles].medical.coverage}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Checkup:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].medical.last_checkup}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Upcoming Appointment:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].medical.upcoming_appointment}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Assigned Doctor:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].medical.doctor}</span>
                              </div>
                              {userProfiles[selectedUser as keyof typeof userProfiles].medical.prescriptions && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Prescriptions:</span>
                                  <span className="font-medium text-white">{userProfiles[selectedUser as keyof typeof userProfiles].medical.prescriptions}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-400">Verified by Ncrypt System</span>
                        </div>
                      </div>
                    )}
                    
                    {!showServiceDetails && (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400 bg-[#0a1926]/50 p-4 sm:p-6 rounded-lg border border-gray-800 border-dashed">
                          <FileInput className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-gray-500" />
                          <p className="text-sm">Select a government service to view details</p>
                          {!isVerified && verificationAttempted && (
                            <p className="text-xs text-red-400 mt-2">Access denied - Invalid signature</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Services grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={() => handleServiceClick('ration')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-4 sm:p-6 text-center transition-all duration-300",
                    showServiceDetails === 'ration' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                    !isVerified && verificationAttempted && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Ration Center</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Public Distribution System</p>
                  
                  <div className="mt-3 sm:mt-4 w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-gray-500">35% collected this month</p>
                </button>
                
                <button
                  onClick={() => handleServiceClick('medical')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-4 sm:p-6 text-center transition-all duration-300",
                    showServiceDetails === 'medical' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                    !isVerified && verificationAttempted && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Hospital className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Health Hospital</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Government Medical Services</p>
                  
                  {selectedUser && userProfiles[selectedUser as keyof typeof userProfiles].medical && (
                    <div className="mt-3 bg-cyan-950/30 py-1 px-2 rounded text-xs inline-flex items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-1"></span>
                      Next: {userProfiles[selectedUser as keyof typeof userProfiles].medical.upcoming_appointment}
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => handleServiceClick('pension')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-4 sm:p-6 text-center transition-all duration-300 sm:col-span-2 lg:col-span-1",
                    showServiceDetails === 'pension' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                    (!userProfiles[selectedUser as keyof typeof userProfiles]?.pension || (!isVerified && verificationAttempted)) && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!userProfiles[selectedUser as keyof typeof userProfiles]?.pension}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium mb-1">Pension Centre</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Government Pension Scheme</p>
                  
                  {selectedUser && userProfiles[selectedUser as keyof typeof userProfiles].pension ? (
                    <div className="mt-3 text-xs text-cyan-400 font-medium">
                      {userProfiles[selectedUser as keyof typeof userProfiles].pension!.monthly_amount}/month
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-gray-500">
                      Not eligible
                    </div>
                  )}
                </button>
              </div>
              
              {/* Call to action button */}
              <div className="flex justify-center mt-6 sm:mt-8">
                <Button
                  onClick={() => setActiveSection('voting')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2 px-4 sm:py-2 sm:px-6 rounded-full flex items-center text-sm sm:text-base"
                >
                  <ScanLine className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Voting Verification
                </Button>
              </div>
              
              {/* NFC activated notification */}
              <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 max-w-xs bg-[#0a1926] border border-cyan-900/50 rounded-lg p-3 sm:p-4 shadow-lg hidden lg:block animate-fade-in">
                <div className="flex items-center">
                  <div className="mr-3 h-6 w-6 sm:h-8 sm:w-8 bg-cyan-900/50 rounded-full flex items-center justify-center">
                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium mb-1 text-cyan-100">NFC Card Activated</div>
                    <div className="text-xs text-gray-400">Verify signature to access services.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 sm:py-6 mt-8 sm:mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">Project Ncrypt - NFC Voter Verification System</p>
          <p className="text-xs sm:text-sm mt-2 text-slate-400">
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

// User icon component
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
