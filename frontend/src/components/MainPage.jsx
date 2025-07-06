import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

function MainPage({ user }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: 'center',
        color: 'green',
        fontSize: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '20px',
      }}
    >
      <h1>Привет, {user?.name || user?.login || 'Гость'}!</h1>
      <p>Путешествуй с нами!</p>
      <MapComponent />
    </div>
  );
}

export default MainPage;