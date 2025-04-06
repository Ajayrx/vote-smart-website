
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NFCCardProps {
  isScanned?: boolean;
  isFake?: boolean;
  className?: string;
}

const NFCCard: React.FC<NFCCardProps> = ({ 
  isScanned = false, 
  isFake = false, 
  className 
}) => {
  return (
    <Card className={cn(
      "relative w-64 h-40 rounded-xl overflow-hidden transition-all duration-300",
      isScanned && !isFake && "animate-pulse-glow",
      isFake && "border-2 border-voting-danger",
      className
    )}>
      <CardContent className="p-0 h-full">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-voting-primary to-voting-secondary",
          isFake && "from-voting-danger/80 to-voting-danger"
        )}/>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="absolute top-3 left-3 flex items-center space-x-1">
            <div className="w-6 h-4 rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <div className="w-6 h-4 rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </div>
          
          <div className="flex flex-col items-center justify-center h-full">
            {isFake ? (
              <span className="text-2xl font-bold">FAKE CARD</span>
            ) : (
              <>
                <span className="text-xl mb-1">Digital NFC</span>
                <span className="text-lg font-semibold">VOTER ID CARD</span>
              </>
            )}
          </div>
          
          <div className="absolute bottom-3 right-3 w-8 h-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.5 8.5C8.5 7.12 9.62 6 11 6C12.38 6 13.5 7.12 13.5 8.5C13.5 9.88 12.38 11 11 11C9.62 11 8.5 9.88 8.5 8.5ZM17.11 16.5H6.89C6.33 16.5 5.92 15.94 6.13 15.44C6.93 13.62 8.83 12.5 11 12.5C13.17 12.5 15.07 13.62 15.87 15.44C16.08 15.94 15.67 16.5 17.11 16.5Z" 
                fill="rgba(255,255,255,0.7)" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NFCCard;
