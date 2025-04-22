import { useState, useEffect } from "react";
import './list.css'

function List() {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');
    const [newItem, setNewItem] = useState({
        location: '',
        date: '',
    });

    useEffect(() => {
        const schedule = localStorage.getItem('schedule');
        if (schedule) { setScheduleItems(JSON.parse(schedule)) };
    }, [])

    const toggleAdding = () => {
        setAdding(!adding);
        if (!adding) {
            setNewItem(
                {
                    location: '',
                    date: '',
                }
            )
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleAddItem = () => {
        if (newItem.location === '' || newItem.date === '') {
            setError('Please include location, date and time')

            setTimeout(() => {
                setError('');
            }, 5000);

            return;
        }

        const allItems = [...scheduleItems];

        allItems.push(newItem);

        if (allItems.length > 1) {
            let i = allItems.length - 1;
            while (i > 0 && allItems[i].date < allItems[i - 1].date && allItems.length > 1) {
                [allItems[i - 1], allItems[i]] = [allItems[i], allItems[i - 1]]
                i--;
            }
        }

        toggleAdding();
        setScheduleItems(allItems);
        localStorage.setItem('schedule', JSON.stringify(allItems));
    }

    const handleDeleteItem = (index) => {
        const allItems = [...scheduleItems];

        for (let i = index; i < allItems.length - 1; i++) {
            allItems[i] = allItems[i + 1]
        }
        allItems.pop();

        setScheduleItems(allItems);
        localStorage.setItem('schedule', JSON.stringify(allItems));
    }

    return (
        <div className="list">
            <h1>Meeting Times</h1>
            <div className="grid-container">
                <div>
                    Location
                </div>
                <div>
                    Date
                </div>
            </div>
            {scheduleItems.length > 0 &&
                scheduleItems.map((item, index) => {
                    return (
                        <div key={index} className="grid-container">
                            <div>
                                {item.location}
                            </div>
                            <div>
                                {new Date(item.date).toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                            <button onClick={() => handleDeleteItem(index)} className="danger">Delete</button>
                        </div>
                    )
                })}

            {adding &&
                <div>
                    <label htmlFor="location"></label>
                    <input type="text" name='location' onChange={handleChange} />
                    <label htmlFor="date"></label>
                    <input type='datetime-local' name='date' onChange={handleChange} />
                    <button className="success" onClick={handleAddItem}>Add Item</button>
                </div>
            }

            <button className="success" onClick={toggleAdding}>{adding ? 'Cancel' : 'Add to Schedule'}</button>

            {error &&
                <div role="alert" className="error-message">{error}</div>
            }
        </div>
    )
}

export default List;