import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DogDetails() {
    const { id } = useParams();
    const [breed, setBreed] = useState(null);
    const [image, setImage] = useState("");

    useEffect(() => {
        async function loadBreed() {
            const res = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
            const json = await res.json();
            setBreed(json.data);

            let imageUrl = "";

            try {
                const breedNameFormatted = json.data.attributes.name.toLowerCase().replace(/\s+/g, "-");

                const imgRes = await fetch( `https://dog.ceo/api/breed/${breedNameFormatted}/images/random`);
                const imgJson = await imgRes.json();

                if (imgJson.status === "success") {
                    imageUrl = imgJson.message;
                } else {
                    throw new Error();
                }

            } catch {
                const fallbackRes = await fetch("https://dog.ceo/api/breeds/image/random");
                const fallbackJson = await fallbackRes.json();
                imageUrl = fallbackJson.message;
            }

            setImage(imageUrl);
        }
        loadBreed();
    }, [id]);

    if (!breed) {
        return <p className="text-center mt-5">A carregar raças...</p>;
    }

    return (
        <div className="page-content container mb-5 dog-details-page">

            <Link to="/dogs" className="btn btn-outline-secondary mb-4"> {"<-"} Voltar às raças </Link>
            <div className="row align-items-start g-4">

                <div className="col-md-5 mb-4">
                    <img src={image} alt={breed.attributes.name} className="img-fluid rounded shadow"/>
                </div>

                <div className="col-md-7">
                    <h1 className="mb-3 breed-title"> {breed.attributes.name} </h1>

                    <p className="lead"> {breed.attributes.description || "Sem descrição."} </p>

                    <ul className="list-group mt-4 shadow-sm">
                        <li className="list-group-item"> Hipoalergénico: {breed.attributes.hypoallergenic ? "Sim" : "Não"} </li>
                        <li className="list-group-item"> Expectativa de vida: {breed.attributes.life.min} - {breed.attributes.life.max} anos </li>
                        <li className="list-group-item"> Peso: {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default DogDetails;
