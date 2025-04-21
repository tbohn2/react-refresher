import { useState, useEffect } from "react";

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
            <form onSubmit={submitForm}>
                {errors.firstName && <div>{errors.firstName}</div>}
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={formState.firstName} onChange={updateForm} />
                {errors.lastName && <div>{errors.lastName}</div>}
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={formState.lastName} onChange={updateForm} />
                {errors.city && <div>{errors.city}</div>}
                <label htmlFor="city">City</label>
                <input type="text" name="city" value={formState.city} onChange={updateForm} />
                {errors.state && <div>{errors.state}</div>}
                <label htmlFor="state">State</label>
                <input type="text" name="state" value={formState.state} onChange={updateForm} />
                {errors.distanceWillingToTravel && <div>{errors.distanceWillingToTravel}</div>}
                <label htmlFor="distanceWillingToTravel">Distance willing to travel (Miles)</label>
                <input type='number' name="distanceWillingToTravel" value={formState.distanceWillingToTravel} onChange={updateForm} min="0" step="5" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form;