'use server';

import { Auth, google } from 'googleapis';

import { createClient } from '@/lib/supabase/server';

async function getOAuthClient(): Promise<boolean | Auth.OAuth2Client> {
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

  return oauth2Client;
}

export async function saveToCalendar(
  title: string,
  description: string,
  location: string,
  meetingStart: string,
  meetingEnd: string,
) {
  const oauth2Client = await getOAuthClient();
  if (typeof oauth2Client === 'boolean') {
    return true;
  }

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

export async function getEvents(startDate: Date, endDate: Date) {
  const oauth2Client = await getOAuthClient();
  if (typeof oauth2Client === 'boolean') {
    return true;
  }

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
  });
  if (events.data.items !== undefined && events.data.items.length > 0) {
    return events.data.items;
  }
}
