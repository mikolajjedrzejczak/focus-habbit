export const refreshTokenOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 90 * 24 * 60 * 60 * 1000,
};