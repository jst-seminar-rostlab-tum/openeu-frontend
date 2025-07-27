import ProfileContent from '@/components/profile/ProfileContent';
import { getProfile } from '@/domain/actions/profile';
import { getUser } from '@/lib/dal';

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    throw new Error('User does not exist');
  }

  const userProfile = await getProfile(user.id);

  if (!userProfile) {
    throw new Error('UserProfile does not exist');
  }

  return <ProfileContent user={user} userProfile={userProfile} />;
}
