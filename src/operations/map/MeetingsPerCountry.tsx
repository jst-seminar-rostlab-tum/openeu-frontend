import { meetingsPerCountry as meetingsPerCountry } from '@/domain/entities/MeetingData';
import { Meeting } from '@/domain/entities/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export async function getMeetingCountPerCountry(
  start: string,
  end: string,
  search?: string,
): Promise<Map<string, number>> {
  const meetings: Meeting[] = await meetingRepository.getMeetings(
    start,
    end,
    search,
  );
  console.log(meetings);

  meetingsPerCountry.forEach((_, countryName) => {
    meetingsPerCountry.set(countryName, 0);
  });

  meetings.forEach((meeting) => {
    let country = meeting.location;

    if (country === 'European Union') {
      country = 'Belgium';
    }

    if (meetingsPerCountry.has(country)) {
      const prev = meetingsPerCountry.get(country)!;
      meetingsPerCountry.set(country, prev + 1);
    } else {
      console.warn(
        `Encountered unexpected country "${meeting.location}" — skipping.`,
      );
    }
  });

  return meetingsPerCountry;
}
