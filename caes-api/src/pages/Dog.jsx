import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../css/dogs.css'

import { useEffect, useState } from "react";

function Dog() {
    const [breeds, setBreeds] = useState([]);

    useEffect( function() {
        async function loadBreeds() {
            const res = await fetch('https://dogapi.dog/api/v2/breeds?page[size]=300');
            const json = await res.json();
            const breedsData = json.data;

            for (let i = 0; i < breedsData.length; i++) {
                const breedName = breedsData[i].attributes.name.toLowerCase().replace(" ", "-");

                let imageUrl = "";

                try {
                    const imgRes = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
                    const imgJson = await imgRes.json();

                    if (imgJson.status === "success") {
                        imageUrl = imgJson.message;
                    } else {
                        const imagemRandom = await fetch("https://dog.ceo/api/breeds/image/random");
                        const jsonRandom = await imagemRandom.json();
                        imageUrl = jsonRandom.message;
                    }
                } catch {
                    const imagemRandom = await fetch("https://dog.ceo/api/breeds/image/random");
                    const jsonRandom = await imagemRandom.json();
                    imageUrl = jsonRandom.message;
                }
                breedsData[i].image = imageUrl;
            }

            setBreeds(breedsData);
        }
        loadBreeds();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {breeds.map((breed) => (
                    <div key={breed.id} className="col-12 col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={breed.image} className="card-img-top" alt={breed.attributes.name} />

                            <div className="card-body">
                                <h5 className="card-title">{breed.attributes.name}</h5>
                                <p className="card-text">
                                    {breed.attributes.description || "Sem descrição"}
                                </p>
                                <p className="text-muted">
                                    Hipoalergénico: {breed.attributes.hypoallergenic ? "Sim" : "Não"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dog;
