import './App.css';
import cookie from './assets/cookie.svg'
import alerta from './assets/alert.svg'
import close from './assets/close.svg'

function DivAlert({ className, src, alt, texto, children }) {
  return (
    <div className={`div-alert ${className}`}>
      <img className="btn-close" src={close} alt="close" />
      <img src={src} alt={alt} />
      <p className={`${className}__p`}>{texto}</p>
      {children}
    </div>
  )
}

function Button({ color, children }) {
  return <button className="button" style={{backgroundColor: color}}>{children}</button>
}

function App() {
  const cards = [
    {
      className: "cookie",
      src: cookie,
      alt: "cookie",
      texto: "Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.",
      buttonColor: "#ED6755",
      buttonText: "Tudo bem!"
    },
    {
      className: "alerta",
      src: alerta,
      alt: "Luz alerta",
      texto: "Você será deslogado imediatamente!",
      buttonColor: "#1C1B5E",
      buttonText: "Extender login"
    }
  ]
  return (
    <div className="App">
      {cards.map(({ className, src, alt, texto, buttonColor, buttonText }) => {
        return(
        <DivAlert className={className} src={src} alt={alt} texto={texto}>
          <Button color={buttonColor}>{buttonText}</Button>
        </DivAlert>
        )
      })}
    </div>
  );
}

export default App;
