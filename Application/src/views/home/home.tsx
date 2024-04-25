import "./home.css";
import "../../style/global.css";
import { Nav } from "../../components/nav/nav";

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <h1>
          Aym<span>labo</span>
        </h1>
        <section>
          <article>
            <h2>
              Join over 30 million players improving their skills in competitive
              gaming genres like FPS & MOBA. Aymlabo is the best way to get
              better at the games you love to compete in with the gamemode we
              provide
            </h2>
            <img src="" />
          </article>
          <article>
            <h2>Built by gamers for gamers</h2>
            <p>
              As gamers first, we understand there are a lot of games out there
              and they all are a little bit different. Which is why Aimlabs
              offers a comprehensive set of tools to improve your aim,
              regardless of which FPS you play. This includes official Aimlabs
              tasks and playlists that we create for ourselves, but also ones
              created by our thriving community. Dive into specifically designed
              aim training exercises to master the art of flicking, tracking,
              speed, perception, and cognition and track your progress in
              Aimlabs while you rank up in the game you love.
            </p>
          </article>
          <article>
            <img src="/faker.png"  />
            <img src="/labz.png"  />
            <h2>Learn from the best of the best</h2>
            <p>
              Whether you choose from over 500+ lessons from over 60+ pros, or
              on-demand 1:1 coaching with the top 1%, you will take your gaming
              expertise to new levels across various game genres.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
