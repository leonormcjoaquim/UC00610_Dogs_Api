import { useEffect, useState } from "react";
import "../css/funfacts.css";

export default function FunFacts() {
    const [fact, setFact] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadFact() {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("https://dogapi.dog/api/v2/facts?limit=1");
            if (!res.ok) 
                throw new Error("Erro ao obter facto");
            const json = await res.json();

            const text = json?.data?.[0]?.attributes?.body || "Sem facto disponível.";
            setFact(text);
        } catch (err) {
            setError("Não foi possível carregar um facto agora. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadFact();
    }, []);

    return (
        <div className="funfacts-wrapper"> 
        <div className="container">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-lg-10 col-xl-8">
                    <div className="card funfacts-card text-center border-0 shadow-lg">
                        <div className="text-uppercase fw-bold mb-2 funfacts-subtitle">
                            Fun Facts
                        </div>
                        <h2 className="fw-bold funfacts-title">Curiosidades sobre cães</h2>

                        {error && (
                            <div className="alert alert-warning mx-auto" style={{ maxWidth: '500px' }}>
                                {error}
                            </div>
                        )}

                        <div className="funfacts-text mb-5 px-3">
                            {loading ? ( 
                                <div className="spinner-border text-warning" role="status"></div> 
                            ) : ( fact )}
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn funfacts-btn py-3 px-5 fs-5" onClick={loadFact} disabled={loading}>
                                {loading ? "A carregar..." : "Mostrar outro facto"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
