import Header from './frontend/components/header';
import LoginBar from './frontend/components/loginbar';
import Movies from './frontend/components/movies';
import './page.css';

type movie = {
      id: number;
      genre: string;
      title: string;
      synopsis: string;
      imageUrl: string;
      platform: string;

  };



const MOVIES_INIT:movie[] = [
  {
    id: 1,
    genre: 'action',
    title: 'Indiana Jones and the Temple of Doom',
    synopsis: 'In 1935, American archeologist Indiana Jones survives a murder attempt from Shanghai crime boss Lao Che, who hired him to retrieve the remains of Nurhaci. Indy flees from the city accompanied by his young orphan sidekick Short Round and nightclub singer Willie Scott, unaware that the plane they are traveling on is owned by Che....',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/10/Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg',
    platform:'Netflix',

    
  },



];





export default function Home() {

  return (
    <div className="container">
       
       <LoginBar></LoginBar>
       <Header></Header>
       <Movies movies = {MOVIES_INIT} />

       
       
      
    </div>
  );
}
