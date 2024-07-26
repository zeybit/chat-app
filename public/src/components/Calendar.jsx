import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function Calendar({ userId }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [editingEvent, setEditingEvent] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        date: ''
    });

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/eventRoutes/${userId}`)
                .then(response => {
                    console.log('Fetched events:', response.data);
                    setEvents(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                    setError('Error fetching events');
                    setLoading(false);
                });
        }
    }, [userId]);

    const handleAddEvent = () => {
        if (userId) {
            axios.post(`http://localhost:5000/api/eventRoutes/${userId}`, {
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                participants: [userId],
                createdBy: userId,
            })
            .then(response => {
                console.log('Created event:', response.data);
                setEvents([...events, response.data]);
                setNewEvent({ title: '', description: '', date: '' });
            })
            .catch(error => {
                console.error('Error adding event:', error);
                setError('Error adding event');
            });
        }
    };

    const handleDeleteEvent = (eventId) => {
        axios.delete(`http://localhost:5000/api/eventRoutes/${eventId}`)
            .then(() => {
                console.log('Deleted event:', eventId);
                setEvents(events.filter(event => event._id !== eventId));
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                setError('Error deleting event');
            });
    };

    const handleUpdateEvent = (eventId) => {
        axios.put(`http://localhost:5000/api/eventRoutes/${eventId}`, {
            title: editForm.title,
            description: editForm.description,
            date: editForm.date,
        })
        .then(response => {
            console.log('Updated event:', response.data);
            setEvents(events.map(event => 
                event._id === eventId ? response.data : event
            ));
            setEditingEvent(null);
            setEditForm({ title: '', description: '', date: '' });
        })
        .catch(error => {
            console.error('Error updating event:', error);
            setError('Error updating event');
        });
    };

    const handleChangeNewEvent = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleChangeEditForm = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <CalendarContainer>
            <h2>My Events</h2>
            <EventList>
                {events.length > 0 ? (
                    events.map(event => (
                        <EventItem key={event._id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>{new Date(event.date).toLocaleString()}</p>
                            <Button onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
                            <Button onClick={() => {
                                setEditingEvent(event._id);
                                setEditForm({
                                    title: event.title,
                                    description: event.description,
                                    date: event.date
                                });
                            }}>
                                Edit
                            </Button>
                        </EventItem>
                    ))
                ) : (
                    <EventItem>No events found.</EventItem>
                )}
            </EventList>
            <h3>Add New Event</h3>
            <Form>
                <Input 
                    type="text" 
                    name="title" 
                    value={newEvent.title} 
                    onChange={handleChangeNewEvent} 
                    placeholder="Title" 
                />
                <Input 
                    type="text" 
                    name="description" 
                    value={newEvent.description} 
                    onChange={handleChangeNewEvent} 
                    placeholder="Description" 
                />
                <Input 
                    type="datetime-local" 
                    name="date" 
                    value={newEvent.date} 
                    onChange={handleChangeNewEvent} 
                />
                <Button onClick={handleAddEvent}>Add Event</Button>
            </Form>
            {editingEvent && (
                <div>
                    <h3>Edit Event</h3>
                    <Form>
                        <Input 
                            type="text" 
                            name="title" 
                            value={editForm.title} 
                            onChange={handleChangeEditForm} 
                            placeholder="Title" 
                        />
                        <Input 
                            type="text" 
                            name="description" 
                            value={editForm.description} 
                            onChange={handleChangeEditForm} 
                            placeholder="Description" 
                        />
                        <Input 
                            type="datetime-local" 
                            name="date" 
                            value={editForm.date} 
                            onChange={handleChangeEditForm} 
                        />
                        <Button onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
                        <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
                    </Form>
                </div>
            )}
        </CalendarContainer>
    );
}

const CalendarContainer = styled.div`
    color: white; /* Tüm yazılar beyaz olacak */
    padding: 20px;
    background-color: #333; /* Arka plan rengi */
`;

const EventList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const EventItem = styled.li`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #444;
    border-radius: 5px;
    h3, p {
        margin: 0;
    }
`;

const Form = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #555;
    border-radius: 5px;
    background-color: #666;
    color: white;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export default Calendar;
