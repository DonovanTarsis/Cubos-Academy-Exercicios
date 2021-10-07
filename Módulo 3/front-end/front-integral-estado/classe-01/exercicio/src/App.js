import {useState} from 'react'
import './App.css';
import cookie from './assets/cookie.svg'
import close from './assets/close.svg'

function DivAlert({func, className, src, alt, texto, children }) {
  return (
    <div className={`div-alert ${className}`}>
      <img onClick={func} className="btn-close" src={close} alt="close" />
      <img src={src} alt={alt} />
      <p className={`${className}__p`}>{texto}</p>
      {children}
    </div>
  )
}


function Button({ func, color, children }) {
  return <button onClick={func} className="button" style={{backgroundColor: color}}>{children}</button>
}

function App() {
  const [estado, setEstado] = useState('flex')

  function fechar () {
    setEstado('hidden')
  }

  const cards = [
    {
      className: "cookie",
      src: cookie,
      alt: "cookie",
      texto: "Nós utilizamos cookies para melhorar nossa UX, analytics e marketing.",
      buttonColor: "#ED6755",
      buttonText: "Tudo bem!"
    }
  ]
  return (
    <div className="App">
      {cards.map(({ className, src, alt, texto, buttonColor, buttonText }) => {
        return(
        <DivAlert func={fechar} className={`${className} ${estado}`} src={src} alt={alt} texto={texto}>
          <Button func={fechar} color={buttonColor}>{buttonText}</Button>
        </DivAlert>
        )
      })}
    </div>
  );
}

export default App;
