import './App.css';
import pictureUm from './assets/icon-sedans.svg'
import pictureDois from './assets/icon-suvs.svg'
import pictureTres from './assets/icon-luxury.svg'




function App() {
  return (
    <section className="card">
        <div className="sedan">
            <img src={pictureUm} alt="icon-sedans" />
            <h1>SEDANS</h1>
            <p>
                Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.
            </p>
            <a href="#">Learn More</a>
        </div>
        <div className="suv">
            <img src={pictureDois} alt="icon-suvs" />
            <h1>SUVS</h1>
            <p>
                Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.
            </p>
            <a href="#">Learn More</a>
        </div>
        <div className="luxury">
            <img src={pictureTres} alt="icon-luxury" />
            <h1>LUXURY</h1>
            <p>
                Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style. 
            </p>
            <a href="#">Learn More</a>
        </div>

    </section>
  );
}

export default App;
