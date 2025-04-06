
import { useState } from "react";
import VoterVerification from "@/components/VoterVerification";
import { Button } from "@/components/ui/button";
import { Info, Github, FileInput, ScanLine, ShieldCheck, Building2, ChevronDown, Home, CreditCard, Hospital, Banknote, Package, VolumeX, Volume2 } from "lucide-react";
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

const Index = () => {
  const [activeSection, setActiveSection] = useState<'voting' | 'services'>('voting');
  const [selectedUser, setSelectedUser] = useState<string | null>("priya");
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const userProfiles = {
    arjun: {
      name: "Arjun Kumar",
      voter_id: "NCR-789456",
      age: "35",
      card: {
        name: "Arjun Kumar",
        voter_id: "NCR-789456"
      },
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
            {/* Futuristic themed header section */}
            <div className="bg-[#060c17] text-white p-8 rounded-t-xl shadow-lg relative overflow-hidden">
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

              <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
                <h2 className="text-4xl font-bold mb-2 flex items-center justify-center">
                  Government <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text ml-2">Services</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-300">
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
              <div className="max-w-4xl mx-auto bg-[#0a1926] p-6 rounded-lg border border-gray-800 relative">
                <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                
                <h3 className="text-xl font-medium text-center mb-6 text-cyan-100">Select User Card</h3>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {Object.entries(userProfiles).map(([id, profile]) => (
                    <button
                      key={id}
                      onClick={() => {
                        setSelectedUser(id);
                        setShowServiceDetails(null);
                      }}
                      className={cn(
                        "px-6 py-3 rounded-md flex items-center transition-all duration-300",
                        selectedUser === id 
                          ? "bg-gradient-to-r from-cyan-900/80 to-blue-900/80 text-white border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.25)]" 
                          : "bg-gray-800/50 hover:bg-gray-800 text-gray-300 border border-gray-700"
                      )}
                    >
                      <User className="h-5 w-5 mr-2" />
                      {profile.name}
                    </button>
                  ))}
                </div>
                
                {/* Card and Service details display in grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* NFC Card - 2 columns */}
                  <div className="md:col-span-2 flex flex-col items-center justify-center">
                    {selectedUser && (
                      <>
                        <div className="relative mb-4">
                          <NFCCard 
                            isCardWritten={true}
                            voterData={userProfiles[selectedUser].card}
                            className="shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                          />
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg text-xs font-bold">
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
                  <div className="md:col-span-3 min-h-[300px]">
                    {showServiceDetails && selectedUser && (
                      <div className="bg-[#0a1926] border border-gray-800 rounded-lg p-5 h-full">
                        {/* Header based on service type */}
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
                        
                        {/* Basic user info */}
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Name:</span>
                            <span className="font-medium text-white">{userProfiles[selectedUser].name}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-400">Age:</span>
                            <span className="font-medium text-white">{userProfiles[selectedUser].age}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-gray-400">Voter ID:</span>
                            <span className="font-medium text-white">{userProfiles[selectedUser].voter_id}</span>
                          </div>
                        </div>
                        
                        {/* Service-specific details */}
                        <div className="space-y-3 text-sm">
                          {showServiceDetails === 'pension' && userProfiles[selectedUser].pension && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pension Account ID:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].pension.account_id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Monthly Pension:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser].pension.monthly_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Payout:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].pension.last_payout}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Years of Service:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].pension.years_of_service}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Retirement Date:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].pension.retirement_date}</span>
                              </div>
                            </>
                          )}
                          
                          {showServiceDetails === 'ration' && userProfiles[selectedUser].ration && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Ration Card Number:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].ration.card_number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Category:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser].ration.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Family Members:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].ration.family_members}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Monthly Allocation:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].ration.monthly_allocation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Collection:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].ration.last_collection}</span>
                              </div>
                            </>
                          )}
                          
                          {showServiceDetails === 'medical' && userProfiles[selectedUser].medical && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Medical ID:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].medical.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Coverage Type:</span>
                                <span className="font-medium text-cyan-400">{userProfiles[selectedUser].medical.coverage}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Checkup:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].medical.last_checkup}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Upcoming Appointment:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].medical.upcoming_appointment}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Assigned Doctor:</span>
                                <span className="font-medium text-white">{userProfiles[selectedUser].medical.doctor}</span>
                              </div>
                              {userProfiles[selectedUser].medical.prescriptions && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Prescriptions:</span>
                                  <span className="font-medium text-white">{userProfiles[selectedUser].medical.prescriptions}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Status indicator */}
                        <div className="mt-6 pt-4 border-t border-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-400">Verified by Ncrypt System</span>
                        </div>
                      </div>
                    )}
                    
                    {!showServiceDetails && (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400 bg-[#0a1926]/50 p-6 rounded-lg border border-gray-800 border-dashed">
                          <FileInput className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                          <p>Select a government service to view details</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Services grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={() => setShowServiceDetails('ration')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300",
                    showServiceDetails === 'ration' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  )}
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Ration Center</h4>
                  <p className="text-sm text-gray-400">Public Distribution System</p>
                  
                  {/* Progress bar for ration usage */}
                  <div className="mt-4 w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-gray-500">35% collected this month</p>
                </button>
                
                <button
                  onClick={() => setShowServiceDetails('medical')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300",
                    showServiceDetails === 'medical' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  )}
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Hospital className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Health Hospital</h4>
                  <p className="text-sm text-gray-400">Government Medical Services</p>
                  
                  {/* Next appointment indicator */}
                  {selectedUser && userProfiles[selectedUser].medical && (
                    <div className="mt-3 bg-cyan-950/30 py-1 px-2 rounded text-xs inline-flex items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-1"></span>
                      Next: {userProfiles[selectedUser].medical.upcoming_appointment}
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => setShowServiceDetails('pension')}
                  className={cn(
                    "bg-[#0a1926] hover:bg-[#0d1e2d] border border-gray-800 rounded-lg p-6 text-center transition-all duration-300",
                    showServiceDetails === 'pension' && "ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                    !userProfiles[selectedUser]?.pension && "opacity-50 cursor-not-allowed hover:bg-[#0a1926]"
                  )}
                  disabled={!userProfiles[selectedUser]?.pension}
                >
                  <div className="h-12 w-12 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-medium mb-1">Pension Centre</h4>
                  <p className="text-sm text-gray-400">Government Pension Scheme</p>
                  
                  {selectedUser && userProfiles[selectedUser].pension ? (
                    <div className="mt-3 text-xs text-cyan-400 font-medium">
                      {userProfiles[selectedUser].pension.monthly_amount}/month
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-gray-500">
                      Not eligible
                    </div>
                  )}
                </button>
              </div>
              
              {/* Call to action button */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setActiveSection('voting')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-2 px-6 rounded-full flex items-center"
                >
                  <ScanLine className="mr-2 h-5 w-5" />
                  Explore Voting Verification
                </Button>
              </div>
              
              {/* NFC activated notification */}
              <div className="absolute right-8 bottom-8 max-w-xs bg-[#0a1926] border border-cyan-900/50 rounded-lg p-4 shadow-lg hidden md:block animate-fade-in">
                <div className="flex items-center">
                  <div className="mr-3 h-8 w-8 bg-cyan-900/50 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1 text-cyan-100">NFC Card Activated</div>
                    <div className="text-xs text-gray-400">Tap on a government service to access your details.</div>
                  </div>
                </div>
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
