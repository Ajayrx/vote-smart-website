

import { useState } from "react";
import VoterVerification from "@/components/VoterVerification";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Info, Github, FileInput, ScanLine, ShieldCheck, Building2, ChevronDown, Home, CreditCard, Hospital, Package, AlertTriangle, UserRound } from "lucide-react";
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
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import NFCCard from "@/components/NFCCard";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface PensionData {
  account_id: string;
  monthly_amount: string;
  last_payout: string;
  years_of_service: string;
  retirement_date: string;
}

interface MedicalData {
  id: string;
  coverage: string;
  last_checkup: string;
  upcoming_appointment: string;
  doctor: string;
  prescriptions?: string;
}

interface RationData {
  card_number: string;
  family_members: string;
  category: string;
  monthly_allocation: string;
  last_collection: string;
}

interface UserProfile {
  name: string;
  voter_id: string;
  age: string;
  card: {
    name: string;
    voter_id: string;
  };
  gov_signature: string;
  ration: RationData;
  medical: MedicalData;
  pension?: PensionData;
  is_fake?: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'voting' | 'services'>('voting');
  const [selectedUser, setSelectedUser] = useState<string | null>("priya");
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null);
  const [showMoreCards, setShowMoreCards] = useState<boolean>(false);
  
  const userProfiles: Record<string, UserProfile> = {
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
    anjali: {
      name: "Anjali Gupta",
      voter_id: "NCR-556677",
      age: "29",
      card: {
        name: "Anjali Gupta",
        voter_id: "NCR-556677"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-4455",
        family_members: "1",
        category: "APL",
        monthly_allocation: "15kg Rice, 8kg Wheat, 2L Oil",
        last_collection: "April 5, 2025"
      },
      medical: {
        id: "HLT-50334",
        coverage: "Basic Plus",
        last_checkup: "March 10, 2025",
        upcoming_appointment: "June 10, 2025",
        doctor: "Dr. Sharma"
      }
    },
    vikram: {
      name: "Vikram Yadav",
      voter_id: "NCR-998877",
      age: "45",
      card: {
        name: "Vikram Yadav",
        voter_id: "NCR-998877"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-6633",
        family_members: "5",
        category: "BPL",
        monthly_allocation: "40kg Rice, 20kg Wheat, 8L Oil, 3kg Sugar",
        last_collection: "March 28, 2025"
      },
      medical: {
        id: "HLT-60445",
        coverage: "Family Coverage",
        last_checkup: "February 20, 2025",
        upcoming_appointment: "May 20, 2025",
        doctor: "Dr. Patel"
      }
    },
    meera: {
      name: "Meera Jain",
      voter_id: "NCR-334455",
      age: "38",
      card: {
        name: "Meera Jain",
        voter_id: "NCR-334455"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-7744",
        family_members: "3",
        category: "APL",
        monthly_allocation: "22kg Rice, 12kg Wheat, 4L Oil",
        last_collection: "April 2, 2025"
      },
      medical: {
        id: "HLT-70556",
        coverage: "Comprehensive",
        last_checkup: "March 15, 2025",
        upcoming_appointment: "June 15, 2025",
        doctor: "Dr. Reddy"
      }
    },
    fake_user1: {
      name: "John Hacker",
      voter_id: "FAKE-001",
      age: "35",
      card: {
        name: "John Hacker",
        voter_id: "FAKE-001"
      },
      gov_signature: "fake_signature_invalid",
      is_fake: true,
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
    },
    fake_user2: {
      name: "Jane Fraudster",
      voter_id: "FAKE-002",
      age: "28",
      card: {
        name: "Jane Fraudster",
        voter_id: "FAKE-002"
      },
      gov_signature: "fake_signature_invalid",
      is_fake: true,
      ration: {
        card_number: "FAKE-002",
        family_members: "1",
        category: "INVALID",
        monthly_allocation: "UNAUTHORIZED ACCESS",
        last_collection: "NEVER"
      },
      medical: {
        id: "FAKE-002",
        coverage: "NONE",
        last_checkup: "INVALID",
        upcoming_appointment: "BLOCKED",
        doctor: "UNAUTHORIZED"
      }
    },
    suresh: {
      name: "Suresh Reddy",
      voter_id: "NCR-445566",
      age: "52",
      card: {
        name: "Suresh Reddy",
        voter_id: "NCR-445566"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-8855",
        family_members: "4",
        category: "BPL",
        monthly_allocation: "30kg Rice, 15kg Wheat, 6L Oil, 2kg Sugar",
        last_collection: "March 30, 2025"
      },
      pension: {
        account_id: "PCT-7654",
        monthly_amount: "₹2,800",
        last_payout: "1st April 2025",
        years_of_service: "28",
        retirement_date: "2024"
      },
      medical: {
        id: "HLT-80667",
        coverage: "Senior Coverage",
        last_checkup: "February 28, 2025",
        upcoming_appointment: "May 28, 2025",
        doctor: "Dr. Kumar"
      }
    },
    kavita: {
      name: "Kavita Nair",
      voter_id: "NCR-667788",
      age: "33",
      card: {
        name: "Kavita Nair",
        voter_id: "NCR-667788"
      },
      gov_signature: "gov_secure_2025",
      ration: {
        card_number: "RATNCR-9966",
        family_members: "2",
        category: "APL",
        monthly_allocation: "18kg Rice, 10kg Wheat, 3L Oil",
        last_collection: "April 3, 2025"
      },
      medical: {
        id: "HLT-90778",
        coverage: "Basic",
        last_checkup: "March 5, 2025",
        upcoming_appointment: "June 5, 2025",
        doctor: "Dr. Mehta"
      }
    }
  };

  const handleServiceClick = (service: string) => {
    if (!selectedUser) {
      toast({
        title: "No Card Selected",
        description: "Please select a voter card first.",
        variant: "destructive"
      });
      return;
    }

    const user = userProfiles[selectedUser];
    if (user.is_fake) {
      toast({
        title: "🚨 FAKE CARD DETECTED",
        description: "Access denied - Invalid card detected.",
        variant: "destructive"
      });
      setShowServiceDetails('blocked');
      return;
    }
    
    setShowServiceDetails(service);
  };

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
    setShowServiceDetails(null);
  };

  const currentUser = selectedUser ? userProfiles[selectedUser] : null;

  const initialCards = Object.keys(userProfiles).slice(0, 8);
  const additionalCards = Object.keys(userProfiles).slice(8);
  const cardsToShow = showMoreCards ? Object.keys(userProfiles) : initialCards;
  
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
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {activeSection === 'voting' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Panel - Main Content */}
            <div className="flex-1">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-voting-primary mb-4 sm:mb-6 text-center">
                  NFC Voter Verification System
                </h2>
                <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto text-sm sm:text-base">
                  This system demonstrates the secure creation and verification of NFC-based voter ID cards using encryption and digital signatures.
                </p>
                
                <VoterVerification />
              </div>
            </div>
            
            {/* Right Panel - How It Works */}
            <div className="lg:w-96">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-voting-primary mb-4 text-center">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-voting-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <FileInput className="h-4 w-4 text-voting-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">1. Create Voter Card</h4>
                      <p className="text-xs text-gray-600">Enter voter details and encrypt them to create a secure digital NFC card.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-voting-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <ScanLine className="h-4 w-4 text-voting-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">2. Scan Card</h4>
                      <p className="text-xs text-gray-600">Scan the NFC card and verify the government signature for authenticity.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-voting-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-4 w-4 text-voting-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">3. Verify Identity</h4>
                      <p className="text-xs text-gray-600">System verifies the card's authenticity and displays the voter's information.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'services' && (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-voting-primary mb-2 flex items-center justify-center">
                <Building2 className="mr-3 h-6 w-6" />
                Government Services Portal
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                Access government services using your verified voter ID card. Select a card and choose a service to get started.
              </p>
            </div>

            {/* Main Content - Horizontal Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Left Section - Card Selection (1/3 width on xl screens) */}
              <div className="xl:col-span-1">
                <Card className="h-fit sticky top-24">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <UserRound className="h-5 w-5 mr-2" />
                      Select Voter Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-2 max-h-96 overflow-y-auto bg-slate-50 p-3 rounded-lg border">
                      {cardsToShow.map((id) => {
                        const profile = userProfiles[id];
                        return (
                          <button
                            key={id}
                            onClick={() => handleUserChange(id)}
                            className={cn(
                              "p-2 sm:p-3 rounded-md flex flex-col items-center transition-all duration-300 text-xs border-2",
                              selectedUser === id 
                                ? "bg-voting-primary text-white border-voting-primary shadow-lg transform scale-105" 
                                : "bg-white hover:bg-slate-100 text-gray-700 border-gray-200 hover:border-voting-primary/30",
                              profile.is_fake && "border-red-500/50 text-red-600"
                            )}
                          >
                            <User className="h-4 w-4 mb-1 flex-shrink-0" />
                            <span className="truncate text-center leading-tight font-medium">{profile.name}</span>
                            <span className="text-xs opacity-70">{profile.voter_id}</span>
                            {profile.is_fake && <AlertTriangle className="h-3 w-3 mt-1 text-red-500" />}
                          </button>
                        );
                      })}
                    </div>

                    {additionalCards.length > 0 && (
                      <div className="mt-3">
                        <Button
                          onClick={() => setShowMoreCards(!showMoreCards)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          {showMoreCards ? 'Show Less Cards' : `Show ${additionalCards.length} More Cards`}
                          <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", showMoreCards && "rotate-180")} />
                        </Button>
                      </div>
                    )}

                    {/* NFC Card Display */}
                    {selectedUser && (
                      <div className="flex flex-col items-center justify-center py-4 mt-4 border-t">
                        <NFCCard 
                          isCardWritten={true}
                          voterData={userProfiles[selectedUser].card}
                          className="shadow-lg transform transition-all duration-300 hover:scale-105"
                          isFake={userProfiles[selectedUser].is_fake}
                        />
                        <div className="text-xs text-voting-primary flex items-center mt-3">
                          <div className="animate-ping w-2 h-2 bg-voting-primary rounded-full mr-2"></div>
                          NFC Card Selected
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Section - Services and Details (2/3 width on xl screens) */}
              <div className="xl:col-span-2 space-y-6">
                
                {/* Service Selection */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <Building2 className="h-5 w-5 mr-2" />
                      Available Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        onClick={() => handleServiceClick('ration')}
                        variant={showServiceDetails === 'ration' ? "default" : "outline"}
                        className={cn(
                          "h-auto p-6 flex flex-col items-center transition-all duration-200 hover:scale-105",
                          showServiceDetails === 'ration' && "bg-voting-primary hover:bg-voting-secondary shadow-lg"
                        )}
                      >
                        <Package className="h-8 w-8 mb-3" />
                        <span className="text-base font-medium">Ration Center</span>
                        <span className="text-sm opacity-70">PDS Services</span>
                      </Button>
                      
                      <Button
                        onClick={() => handleServiceClick('medical')}
                        variant={showServiceDetails === 'medical' ? "default" : "outline"}
                        className={cn(
                          "h-auto p-6 flex flex-col items-center transition-all duration-200 hover:scale-105",
                          showServiceDetails === 'medical' && "bg-voting-primary hover:bg-voting-secondary shadow-lg"
                        )}
                      >
                        <Hospital className="h-8 w-8 mb-3" />
                        <span className="text-base font-medium">Health Center</span>
                        <span className="text-sm opacity-70">Medical Services</span>
                      </Button>
                      
                      <Button
                        onClick={() => handleServiceClick('pension')}
                        variant={showServiceDetails === 'pension' ? "default" : "outline"}
                        className={cn(
                          "h-auto p-6 flex flex-col items-center transition-all duration-200 hover:scale-105",
                          showServiceDetails === 'pension' && "bg-voting-primary hover:bg-voting-secondary shadow-lg",
                          (!currentUser || !currentUser.pension) && "opacity-50"
                        )}
                      >
                        <CreditCard className="h-8 w-8 mb-3" />
                        <span className="text-base font-medium">Pension Center</span>
                        <span className="text-sm opacity-70">
                          {currentUser?.pension ? "Available" : "Not Eligible"}
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Details Panel */}
                <Card className="min-h-[400px]">
                  <CardContent className="p-6">
                    {showServiceDetails === 'blocked' && (
                      <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in min-h-[300px]">
                        <AlertTriangle className="h-20 w-20 text-red-500 mb-4" />
                        <h4 className="text-2xl font-bold text-red-600 mb-2">FAKE CARD DETECTED</h4>
                        <p className="text-red-500 text-lg">Access to government services blocked due to invalid card.</p>
                      </div>
                    )}

                    {showServiceDetails && showServiceDetails !== 'blocked' && selectedUser && currentUser && !currentUser.is_fake && (
                      <div className="animate-fade-in">
                        <div className="flex items-center text-voting-primary mb-6 pb-3 border-b">
                          {showServiceDetails === 'pension' && (
                            <>
                              <CreditCard className="h-6 w-6 mr-3" />
                              <h4 className="text-xl font-semibold">Pension Account Details</h4>
                            </>
                          )}
                          {showServiceDetails === 'ration' && (
                            <>
                              <Package className="h-6 w-6 mr-3" />
                              <h4 className="text-xl font-semibold">Ration Card Details</h4>
                            </>
                          )}
                          {showServiceDetails === 'medical' && (
                            <>
                              <Hospital className="h-6 w-6 mr-3" />
                              <h4 className="text-xl font-semibold">Medical Coverage Details</h4>
                            </>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          <div className="space-y-1">
                            <span className="text-sm text-gray-500">Name</span>
                            <p className="font-medium text-base">{currentUser.name}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm text-gray-500">Age</span>
                            <p className="font-medium text-base">{currentUser.age}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm text-gray-500">Voter ID</span>
                            <p className="font-medium text-base">{currentUser.voter_id}</p>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        {/* Service-specific details */}
                        <div className="space-y-4">
                          {showServiceDetails === 'pension' && currentUser.pension && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Account ID</span>
                                <p className="font-medium text-base">{currentUser.pension.account_id}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Monthly Amount</span>
                                <p className="font-medium text-base text-green-600">{currentUser.pension.monthly_amount}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Last Payout</span>
                                <p className="font-medium text-base">{currentUser.pension.last_payout}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Years of Service</span>
                                <p className="font-medium text-base">{currentUser.pension.years_of_service}</p>
                              </div>
                            </div>
                          )}
                          
                          {showServiceDetails === 'ration' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Card Number</span>
                                <p className="font-medium text-base">{currentUser.ration.card_number}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Category</span>
                                <p className="font-medium text-base text-blue-600">{currentUser.ration.category}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Family Members</span>
                                <p className="font-medium text-base">{currentUser.ration.family_members}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Last Collection</span>
                                <p className="font-medium text-base">{currentUser.ration.last_collection}</p>
                              </div>
                              <div className="space-y-1 sm:col-span-2">
                                <span className="text-sm text-gray-500">Monthly Allocation</span>
                                <p className="font-medium text-base">{currentUser.ration.monthly_allocation}</p>
                              </div>
                            </div>
                          )}
                          
                          {showServiceDetails === 'medical' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Medical ID</span>
                                <p className="font-medium text-base">{currentUser.medical.id}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Coverage Type</span>
                                <p className="font-medium text-base text-blue-600">{currentUser.medical.coverage}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Last Checkup</span>
                                <p className="font-medium text-base">{currentUser.medical.last_checkup}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Next Appointment</span>
                                <p className="font-medium text-base">{currentUser.medical.upcoming_appointment}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-sm text-gray-500">Doctor</span>
                                <p className="font-medium text-base">{currentUser.medical.doctor}</p>
                              </div>
                              {currentUser.medical.prescriptions && (
                                <div className="space-y-1">
                                  <span className="text-sm text-gray-500">Prescriptions</span>
                                  <p className="font-medium text-base">{currentUser.medical.prescriptions}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-8 flex items-center justify-center">
                          <div className="flex items-center text-green-600 bg-green-50 px-4 py-3 rounded-full">
                            <ShieldCheck className="w-5 h-5 mr-2" />
                            <span className="font-medium">Verified by Ncrypt System</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!showServiceDetails && (
                      <div className="flex items-center justify-center h-full min-h-[300px]">
                        <div className="text-center text-gray-400">
                          <Building2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg mb-2">Select a government service to view details</p>
                          <p className="text-sm">Choose a card first, then select a service above</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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

