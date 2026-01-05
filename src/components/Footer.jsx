import '../css/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container py-5">
                <div className="row align-items-start justify-content-center text-center text-lg-start">

                    <div className="col-12 col-lg-5 d-flex flex-column align-items-center">
                        <div className="footer-kicker">CãoPanheiros</div>
                        <h5 className="footer-title">A importância de conhecer o seu próximo animal</h5>
                        <p className="footer-text">
                            Encontre a raça de cão que melhor se adapta ao seu estilo de vida ou à sua família.
                        </p>
                        <div className="footer-social">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-github"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>

                    <div className="col-12 col-lg-5 d-flex flex-column align-items-center">
                        <h6 className="footer-heading">Contactos</h6>
                        <ul className="footer-list">
                            <li><i className="fas fa-envelope"></i> caopanheiros@exemplo.com</li>
                            <li><i className="fas fa-phone"></i> +351 912 345 678</li>
                            <li><i className="fas fa-map-marker-alt"></i> Lisboa, Portugal</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom text-center">
                 2025 ©CãoPanheiros. Todos direitos reservados
            </div>
        </footer>

    );
}
