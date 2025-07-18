'use server';

import { google } from 'googleapis';

import { createClient } from '@/lib/supabase/server';

export async function saveToCalendar(
  title: string,
  description: string,
  location: string,
  meetingStart: string,
  meetingEnd: string,
) {
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();
  if (!userData.data.user) {
    throw new Error('No user data provided');
  }
  const userMetadata = userData.data.user.user_metadata;

  // We return true if we need a refresh token from the user in order to access the Google API
  // on this behalf, and false if the event can be safed
  if (userMetadata['oauthRefreshToken'] === undefined) {
    return true;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
  oauth2Client.credentials.refresh_token = userMetadata['oauthRefreshToken'];
  await oauth2Client.refreshAccessToken();

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const event = {
    summary: title,
    location: location,
    description: description,
    start: {
      dateTime: meetingStart,
      timeZone: 'Europe/Berlin',
    },
    end: {
      dateTime: meetingEnd,
      timeZone: 'Europe/Berlin',
    },
  };
  calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: 'primary',
      // @ts-expect-error: is like the docs
      resource: event,
    },
    function (err: never) {
      if (err) {
        throw new Error(`Error when creating calendar event: ${err}`);
      }
    },
  );

  return false;
}
