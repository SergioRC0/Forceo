/* import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/utils/auth';

export default function useCurrentUser(initialUser = null) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);

  useEffect(() => {
    if (!initialUser) {
      getCurrentUser()
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [initialUser]);

  return { user, loading };
}
 */