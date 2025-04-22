import { useState, useEffect } from "react";

function List() {
    const [scheduleItems, setScheduleItems] = useState([]);
    const [adding, setAdding] = useState(false);
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
        const allItems = [...scheduleItems];

        allItems.push(newItem);

        if (allItems.length > 1) {
            let i = allItems.length - 1;
            while (i > 0 && allItems[i].date < allItems[i - 1].date && allItems.length > 1) {
                console.log(allItems);
                [allItems[i - 1], allItems[i]] = [allItems[i], allItems[i - 1]]
                i--;
            }
        }

        setScheduleItems(allItems);
        localStorage.setItem('schedule', JSON.stringify(allItems));
    }

    return (
        <div className="list">
            <h1>Meeting Times</h1>
            {scheduleItems.length > 0 &&
                scheduleItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {item.location}
                            </div>
                            <div>
                                {item.date}
                            </div>
                        </div>
                    )
                })}

            {adding &&
                <div>
                    <label htmlFor="location"></label>
                    <input type="text" name='location' onChange={handleChange} />
                    <label htmlFor="date"></label>
                    <input type='datetime-local' name='date' onChange={handleChange} />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>
            }

            <button onClick={toggleAdding}>{adding ? 'Cancel' : 'Add to Schedule'}</button>
        </div>
    )
}

export default List;