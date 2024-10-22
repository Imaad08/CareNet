import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { authorPhone, postTitle, personname, username, userPhone, userId } = await req.json();

    if (!authorPhone) {
      throw new Error('Author phone number is missing.');
    }

    const messageBody = `Hello, ${personname} (${username}) has shown interest in your post titled "${postTitle}". You can reach them at ${userPhone} for further communication. For more details about them, please visit their profile on the CareNet app.`;

    const response = await axios.post('https://textbelt.com/text', {
      phone: authorPhone, 
      message: messageBody, 
      key: process.env.TEXTBELT_API_KEY,
    });

    if (response.data.success) {
      return NextResponse.json({ success: true, message: 'SMS sent successfully' });
    } else {
      throw new Error(response.data.error || 'Failed to send SMS');
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
