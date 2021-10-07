import './App.css';
import picture from './assets/google.svg'
function App() {
  return (
    <section>
        <h1>Sign up for free</h1>
        <button className="google">Sign up with Google <img src={picture} alt="google" /></button>
        <h6>Or sign up with email</h6>
        <div>
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="Eg. Mary Olhson" />
        </div>
        <div>
            <label htmlFor="email">Email address</label>
            <input id="email" type="text" placeholder="your@email.com" />
        </div>
        <button>Get started</button>
        <span>Already have an account? <a href="#">Log in</a></span>
    </section>
  );
}

export default App;
