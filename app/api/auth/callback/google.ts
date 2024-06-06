// pages/api/auth/google.js

import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    // Extract authorization code from query parameters
    const authorizationCode = req.query.code;
    console.log('\n\n\n\n\n\n\nAuthorization code in BE\n:', authorizationCode);
    

    // Exchange authorization code for access token
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: authorizationCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    // Extract access token from response
    const accessToken = response.data.access_token;
    console.log('\n\n\n\n\n\n\nAccess token in BE\n:', accessToken);
    

    // Use the access token to make requests to the Google API
    // Example: Fetch user data, emails, etc.

    // Handle the response accordingly
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error handling Google callback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
