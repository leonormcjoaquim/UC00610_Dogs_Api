import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/dogs.css';
import '../components/EsqueletoCao'

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EsqueletoCao from '../components/EsqueletoCao';

const dogsPerPage = 6;

function Dog() {
    const [breeds, setBreeds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [hypoFilter, setHypoFilter] = useState("todos");
    const [sortOrder, setSortOrder] = useState("az");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);


    useEffect(() => {
        async function loadBreeds() {
            setLoading(true);
            const res = await fetch('https://dogapi.dog/api/v2/breeds?page[size]=1000');
            const json = await res.json();
            const breedsData = json.data;

            for (let i = 0; i < breedsData.length; i++) {
                const breedName = breedsData[i].attributes.name.toLowerCase().replace(/\s+/g, "-");

                let imageUrl = "";

                try {
                    const imgRes = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
                    const imgJson = await imgRes.json();

                    if (imgJson.status === "success") {
                        imageUrl = imgJson.message;
                    } else {
                        const imagemRandom = await fetch(
                            "https://dog.ceo/api/breeds/image/random"
                        );
                        const jsonRandom = await imagemRandom.json();
                        imageUrl = jsonRandom.message;
                    }
                } catch {
                    const imagemRandom = await fetch(
                        "https://dog.ceo/api/breeds/image/random"
                    );
                    const jsonRandom = await imagemRandom.json();
                    imageUrl = jsonRandom.message;
                }
                breedsData[i].image = imageUrl;
            }
            setBreeds(breedsData);
            setLoading(false);
        }

        loadBreeds();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, hypoFilter, sortOrder]);

    const filteredBreeds = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return breeds.filter((breed) => {
            const name = breed.attributes.name.toLowerCase();
            const matchesName = !term || name.includes(term);

            const matchesHypo = hypoFilter === "todos" ? true : hypoFilter === "sim" ? breed.attributes.hypoallergenic : !breed.attributes.hypoallergenic;
            return matchesName && matchesHypo;
        });

    }, [breeds, searchTerm, hypoFilter]);

    const sortedBreeds = useMemo(() => {
        const copy = [...filteredBreeds];
        if (sortOrder === "az") {
            copy.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        } else if (sortOrder === "za") {
            copy.sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
        }
        return copy;
    }, [filteredBreeds, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(sortedBreeds.length / dogsPerPage));

    const startIndex = (currentPage - 1) * dogsPerPage;

    const endIndex = startIndex + dogsPerPage;

    const currentBreeds = sortedBreeds.slice(startIndex, endIndex);

    return (
        <div className="page-content container mb-5 pb-5">
            <div className="filter-bar card p-3 p-lg-4 mb-4">
                <div className="row g-3 align-items-end">
                    <div className="col-12 col-md-6">
                        <label className="form-label">Procurar por nome</label>
                        <input type="text" className="form-control" placeholder="Ex: Husky, Poodle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-3 col-lg-2">
                        <label className="form-label">Hipoalergénicos</label>
                        <select className="form-select" value={hypoFilter} onChange={(e) => setHypoFilter(e.target.value)}>
                            <option value="todos">Todos</option>
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-3 col-lg-2">
                        <label className="form-label">Ordenar</label>
                        <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} >
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                {loading? 
                Array.from({ length: dogsPerPage }).map((_, i) => (
                        <div key={i} className="col-12 col-md-4 mb-4">
                            <EsqueletoCao />
                        </div>
                    ))
                    : currentBreeds.map((breed) => (
                        <div key={breed.id} className="col-12 col-md-4 mb-4">
                            <div className="card h-100">
                                <Link to={`/dogs/${breed.id}`} className="text-decoration-none" >
                                    <div className="dog-image-wrapper">
                                        <img src={breed.image} className="card-img-top dog-image" alt={breed.attributes.name}/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title"> {breed.attributes.name}</h5>
                                        <p className="card-text"> {breed.attributes.description || "Sem descrição"} </p>
                                        <p className="card-text mb-0"> Hipoalergénico:{" "} {breed.attributes.hypoallergenic ? "Sim" : "Não"} </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>


            <div className="d-flex justify-content-center mt-4">
                <div>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(p => p - 1)}>Anterior</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">Pagina {currentPage} de {totalPages}</span>
                        </li>

                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(p => p + 1)}>Seguinte</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dog;
