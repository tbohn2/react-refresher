import { useState, useEffect } from "react";

function CountrySearch() {
    const [countryNames, setCountryNames] = useState([]);
    const [countryToSeach, setCountyToSearch] = useState([]);

    async function fetchNames() {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await response.json();
        setCountryNames(data);
    }

    useEffect(() => {
        fetchNames();
    }, [])

    const handleNameChange = (e) => {
        const { value } = e.target;
        setCountyToSearch(value);
    }

    return (
        <div>
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
        </div>
    )
};

export default CountrySearch;