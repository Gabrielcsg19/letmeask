import { useAuth } from "../hooks/useAuth";
import '../styles/user-info.scss';
import anonymousImg from '../assets/images/anonymous.svg';

export function UserInfo() {
  const { user } = useAuth();

  return (
      <div className="user-info">
      {user ? (
        <>
          <img src={user.avatar} alt={user.name} />
          <span>{user?.name}</span>
        </>
      ) : (
        <>
          <img src={anonymousImg} alt="Anônimo" />
          <span>Anônimo</span>
        </>
      )}
    </div>
  )
}