import { Link } from 'react-router-dom';
import dog from '../assets/dog.png'

export default function Hero() {
    return (
        <section className="hero-wrapper">
            <div className="hero-card">
                <div className="hero-text">
                    <div className="hero-eyebrow">
                        Descubra o Cão Mais Indicado Para Si
                    </div>
                    <h1> API <br />
                        <span>com 1000+ cães</span><br />
                        com descrição
                    </h1>
                    <p className="hero-subtitle">
                        Desenvolvido para conhecer o cão indicado para si e para a sua familia
                    </p>

                     <div className="hero-buttons">
                        <Link to="/caes" className="btn-primary">Ver Cães</Link>
                    </div>

                    <ul className="hero-metrics">
                        <li>
                            <strong>1000+ Raças</strong>
                            <span>Cães com descrição para os ficar a conhecer melhor</span>
                        </li>
                        <li>
                            <strong>4.9/5</strong>
                            <span>Reviews no google</span>
                        </li>
                    </ul>
                </div>
                <div className="hero-image">
                    <img src={dog} alt="Dog Trainer" />
                </div>
            </div>
        </section>
    );
}
