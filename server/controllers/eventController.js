const mongoose = require('mongoose');
const Event = require('../models/eventModel'); // Model adı 'Event' olarak kullanılır

exports.createEvent = async (req, res) => {
  const { title, description, date, participants = [], createdBy } = req.body;

  // Hata ayıklama
  console.log('Received data:', { title, description, date, participants, createdBy });

  try {
    // `participants` ve `createdBy`'yi kontrol et ve uygun varsayılan değerleri ayarla
    const event = new Event({
      title,
      description,
      date,
      participants: Array.isArray(participants) && participants.length > 0
        ? participants.map(id => new mongoose.Types.ObjectId(id))
        : [], // Boş bir dizi kullanılırsa hata alınmaz
      createdBy: createdBy ? new mongoose.Types.ObjectId(createdBy) : null // `createdBy`'yi kontrol et
    });

    // `createdBy` verisi mevcut değilse, hata mesajı döndür
    if (!event.createdBy) {
      return res.status(400).json({ error: 'Creator information is required' });
    }

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Error in createEvent:', error); // Detaylı hata günlüğü
    res.status(400).json({ error: error.message });
  }
};


exports.getUserEvents = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User ID format" });
    }

    const events = await Event.find({ createdBy: new mongoose.Types.ObjectId(userId) });

    if (events.length > 0) {
      return res.json(events);
    } else {
      return res.status(404).json({ msg: "No events found for this user" });
    }
  } catch (ex) {
    console.error('Error in getUserEvents:', ex); // Detaylı hata günlüğü
    next(ex);
  }
};

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date, participants } = req.body;

  // Hata ayıklama
  console.log('Received data:', { title, description, date, participants });

  try {
    // `participants`'ın `undefined` olup olmadığını kontrol et ve uygun varsayılan değeri ayarla
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { 
        title, 
        description, 
        date, 
        participants: participants ? participants.map(id => new mongoose.Types.ObjectId(id)) : [] 
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error in updateEvent:', error); // Detaylı hata günlüğü
    res.status(400).json({ error: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error in deleteEvent:', error); // Detaylı hata günlüğü
    res.status(400).json({ error: error.message });
  }
};
