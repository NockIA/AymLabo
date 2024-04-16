import { Link } from 'react-router-dom';
import '../pages/styles/main.css';
import { Nav } from '../components/nav/nav';

function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
      <Nav/>
    </div>
  );
}

export default HomePage;
