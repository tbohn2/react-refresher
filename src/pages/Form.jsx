import { useState, useEffect } from "react";

function Form() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        distanceWillingToTravel: 0
    });

    const updateForm = (e) => {
        let { name, value } = e.target;
        value = name === 'distanceWillingToTravel' ? parseInt(value) : value;

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(formState);
    }, [formState])

    return (
        <div>
            <form>
                <input type="text" name="firstName" value={formState.firstName} onChange={updateForm} required />
                <input type="text" name="lastName" value={formState.lastName} onChange={updateForm} required />
                <input type="text" name="city" value={formState.city} onChange={updateForm} required />
                <input type="text" name="state" value={formState.state} onChange={updateForm} required />
                <input type='number' name="distanceWillingToTravel" value={formState.distanceWillingToTravel} onChange={updateForm} min="0" step="5" required />
            </form>
        </div>
    )
}

export default Form;