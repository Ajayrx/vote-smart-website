
// This is a simplified version of encryption for demonstration purposes
// In a real application, use proper cryptographic libraries

// A simple encryption key (in a real app, this would be more secure)
const ENCRYPTION_KEY = "ncrypt_secure_key_2025";

export function encrypt_data(data: any): string {
  try {
    // Convert the data object to a JSON string
    const jsonString = JSON.stringify(data);
    
    // Simple XOR encryption with the key (for demonstration)
    let result = "";
    for (let i = 0; i < jsonString.length; i++) {
      const charCode = jsonString.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    // Convert to base64 for storage
    return btoa(result);
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

export function decrypt_data(encryptedData: string): any {
  try {
    // Decode from base64
    const base64Decoded = atob(encryptedData);
    
    // Reverse the XOR encryption
    let result = "";
    for (let i = 0; i < base64Decoded.length; i++) {
      const charCode = base64Decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    // Parse back to an object
    return JSON.parse(result);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
}
