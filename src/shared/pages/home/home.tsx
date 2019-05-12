import { Link } from 'react-router-dom';

export const Home = () => (
  <section>
    <h2>Welcome to TrackIt</h2>

    <p>
      Issues dashboard could be found <Link to="/dashboard">here</Link>
    </p>
  </section>
);
