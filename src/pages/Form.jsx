import { useState, useEffect } from "react";
import './form.css';

function Form() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        distanceWillingToTravel: 0
    });

    const [errors, setErrors] = useState({});

    const updateForm = (e) => {
        let { name, value } = e.target;
        if (name === 'distanceWillingToTravel') { value = parseInt(value) };

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // useEffect(() => {
    //     console.log(formState);
    // }, [formState])

    const validateForm = () => {
        const newErrors = {};

        const requiredTextFields = ['firstName', 'lastName', 'city', 'state']

        requiredTextFields.forEach((field) => {
            if (!formState[field]) {
                const withSpaceAndCapitalized = field.replace(/([A-Z])/g, ' $1');
                newErrors[field] = withSpaceAndCapitalized.charAt(0).toUpperCase() + withSpaceAndCapitalized.slice(1) + ' is required';
            }
        })

        if (formState.distanceWillingToTravel === 0) { newErrors.distanceWillingToTravel = 'Distance must be positive' }

        setErrors(newErrors);
    }

    const submitForm = (e) => {
        e.preventDefault();
        setErrors({});
        validateForm();
    }

    return (
        <div>
            <form className="form" onSubmit={submitForm}>
                <label htmlFor="firstName">First Name {errors.firstName && <span>* required</span>}</label>
                <input type="text" name="firstName" value={formState.firstName} onChange={updateForm} />
                <label htmlFor="lastName">Last Name {errors.lastName && <span>* required</span>}</label>
                <input type="text" name="lastName" value={formState.lastName} onChange={updateForm} />
                <label htmlFor="city">City {errors.city && <span>* required</span>}</label>
                <input type="text" name="city" value={formState.city} onChange={updateForm} />
                <label htmlFor="state">State {errors.state && <span>* required</span>}</label>
                <input type="text" name="state" value={formState.state} onChange={updateForm} />
                <label htmlFor="distanceWillingToTravel">Distance willing to travel (Miles) {errors.distanceWillingToTravel && <span>* must be more than 0</span>}</label>
                <input type='number' name="distanceWillingToTravel" value={formState.distanceWillingToTravel} onChange={updateForm} min="0" step="5" />
                <button type="submit" className="success">Submit</button>
            </form>
        </div>
    )
}

export default Form;