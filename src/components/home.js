import diary4 from './images/diary4.jpg';
import diary3 from './images/diary3.jpg';
import diary2 from './images/diary2.jpg';
import {Carousel} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './home.css';
function Home() {
    return (
      <div className='container qw'>
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block mx-auto active "
      src={diary4}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block active mx-auto"
      src={diary3}
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-70 active mx-auto"
      src={diary2}
      alt="Third slide"
    />

    
  </Carousel.Item>
</Carousel>    
   <Card className='bg-dark text-light text-center'>
      <Card.Body><p className='asdf'>Our online diary software is simply space on the web, where you can freely record personal experiences and events. So instead of opting for a traditional diary or a notebook where you can pen down your thoughts and express your feelings and creativity, you can use a digital journal software and have it with you anytime, any day and anywhere. All that’s needed is digital device.</p></Card.Body>
    </Card> 
    <p>djgm sfkn lorem
      jnm. jnm 











      nmkkm
    </p>
      </div>
      
    );
    
  }
  
  export default Home;