import { useState, useEffect } from "react";
import './countrySearch.css';

function CountrySearch() {
    const [countryNames, setCountryNames] = useState([]);
    const [countryToSeach, setCountyToSearch] = useState([]);
    const [currentCountryData, setCurrentCountryData] = useState([]);
    const [error, setError] = useState('');


    async function fetchNames() {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await response.json();
        setCountryNames(data);
    }

    useEffect(() => {
        fetchNames();
    }, [])

    function handleNameChange(e) {
        const { value } = e.target;
        setCountyToSearch(value);
    }

    async function fetchCountryData() {
        const fetchURL = `https://restcountries.com/v3.1/name/${countryToSeach}?fullText=true`
        try {
            const response = await fetch(fetchURL);
            const data = await response.json()

            if (!response.ok) {
                setError(data.message)

                setTimeout(() => {
                    setError('');
                }, 5000);
                return;
            }

            const prev = [...currentCountryData];
            prev.push(data[0]);
            setCurrentCountryData(prev);
        } catch (error) {
            console.log(error);
        }
    };

    function removeCountry(index) {
        const countryData = [...currentCountryData];
        countryData.splice(index, 1);
        setCurrentCountryData(countryData);
    }

    return (
        <div id="country-search">
            {countryNames.length > 0 &&
                <div>
                    <input
                        list="countryNames"
                        name="countryToSearch"
                        value={countryToSeach}
                        onChange={handleNameChange}
                    />
                    <datalist id="countryNames" >
                        {countryNames.map((countryName, index) => {
                            return (
                                <option value={countryName.name.common} key={index}></option>
                            )
                        })}
                    </datalist>
                </div>
            }
            <button className="success" onClick={fetchCountryData}>Add Country</button>

            {error &&
                <div role="alert" className="error-message">{error}</div>
            }

            {currentCountryData.length > 0 &&
                <section id="countryData">
                    {currentCountryData.map((data, index) => {
                        const languages = Object.values(data.languages);
                        const currencies = Object.values(data.currencies).map((currency) => currency.name);

                        return (
                            <div key={index} className="country-card">
                                <button className="danger" onClick={() => removeCountry(index)}>X</button>
                                <h1>{data.name.common}</h1>
                                <h2>Capital: {data.capital[0]}</h2>
                                <img src={data.flags.svg} alt={data.flags.alt} />
                                <ul>
                                    <li>Population: {data.population.toLocaleString('en-US')}</li>
                                    <li>Languages: {languages.join(', ')}</li>
                                    <li>Currency: {currencies.join(', ')}</li>
                                </ul>
                            </div>
                        )
                    })}
                </section>
            }
        </div>
    )
};

export default CountrySearch;