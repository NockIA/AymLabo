import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default HomePage;
