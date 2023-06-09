import { useAppSelector } from './redux';

function useAdmin() {
  const role = useAppSelector((state) => state.auth.profileData.profile?.role);
  const ans = role === 'ADMIN';
  return {
    isAdmin: ans,
  };
}

export default useAdmin;
