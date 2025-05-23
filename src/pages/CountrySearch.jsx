import { useState, useEffect } from "react";
import './countrySearch.css';

function CountrySearch() {
    const [countryNames, setCountryNames] = useState([]);
    const [countryToSearch, setCountyToSearch] = useState([]);
    const [currentCountryData, setCurrentCountryData] = useState([]);
    const [error, setError] = useState('');


    async function fetchNames() {
        let data = sessionStorage.getItem('countryNames')
        if (data === null) {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            data = await response.json();
            sessionStorage.setItem('countryNames', JSON.stringify(data));
        } else {
            data = JSON.parse(data);
        }
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
        const alreadyAdded = currentCountryData.some(c => c.name.common === countryToSearch);

        if (alreadyAdded) {
            setError('Country already added')

            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        const fetchURL = `https://restcountries.com/v3.1/name/${countryToSearch}?fullText=true`
        try {
            const response = await fetch(fetchURL);

            if (!response.ok) {
                setError(data.message)

                setTimeout(() => {
                    setError('');
                }, 5000);
                return;
            }

            const data = await response.json()
            setCurrentCountryData(prev => [...prev, data[0]]);
            setCountyToSearch('');
        } catch (error) {
            console.log(error);
            setError('An error has occurred; Verify country name')

            setTimeout(() => {
                setError('');
            }, 5000);
            return;
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
                        value={countryToSearch}
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