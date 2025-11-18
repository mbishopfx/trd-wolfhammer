// Simple password-based authentication for admin
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}

export function isAdminAuthenticated(cookies: { [key: string]: string }): boolean {
  const adminToken = cookies['admin_token'];
  if (!adminToken) return false;
  
  // Simple token verification (in production, use JWT or similar)
  const expectedToken = Buffer.from(process.env.ADMIN_PASSWORD || 'admin123').toString('base64');
  return adminToken === expectedToken;
}

export function generateAdminToken(password: string): string {
  return Buffer.from(password).toString('base64');
}

