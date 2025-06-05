import { meetingsPerCountry as meetingsPerCountry } from '@/domain/entities/MeetingData';
import { Meeting } from '@/domain/entities/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export async function getMeetingCountPerCountry(
  start: Date,
  end: Date,
): Promise<typeof meetingsPerCountry> {
  const meetings: Meeting[] = await meetingRepository.getMeetings(start, end);

  Object.keys(meetingsPerCountry).forEach((country) => {
    meetingsPerCountry[country as keyof typeof meetingsPerCountry] = 0;
  });

  meetings.forEach((m) => {
    const country = m.location as keyof typeof meetingsPerCountry;
    if (country in meetingsPerCountry) {
      meetingsPerCountry[country]! += 1;
    } else {
      console.warn(
        `Encountered unexpected country "${m.location}" — skipping.`,
      );
    }
  });

  return meetingsPerCountry;
}
