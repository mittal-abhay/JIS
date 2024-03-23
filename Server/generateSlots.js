const mongoose = require('mongoose');
const Slot = require('./Models/Slot');
const dotenv = require('dotenv');
dotenv.config();

// Function to generate slots for weekdays from 9 AM to 6 PM, each of 1 hour duration, for each date of a year
const generateSlots = async () => {
    try {
        // Connect to MongoDB database
        mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", () => console.log("Connected to Database!"));

        // Loop through each date of the year
        for (let date = new Date('2024-04-01'); date <= new Date('2024-07-01'); date.setDate(date.getDate() + 1)) {
            // Check if the date is a weekday (Monday to Friday)
            const dayOfWeek = date.getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                // Format the date as "YYYY-MM-DD"
                const formattedDate = date.toISOString().split('T')[0];

                // Generate slots from 9 AM to 6 PM
                for (let hour = 9; hour <= 18; hour++) {
                    const startTime = hour >= 12 ? `${hour % 12 || 12}:00 PM` : `${hour % 12 || 12}:00 AM`;
                    const endTime = (hour + 1) >= 12 ? `${(hour + 1) % 12 || 12}:00 PM` : `${(hour + 1) % 12 || 12}:00 AM`;

                    // Create slot object
                    const slot = new Slot({
                        date: formattedDate,
                        time: {
                            startTime,
                            endTime
                        }
                    });

                    // Save the slot to the database
                    await slot.save();
                }
            }
        }
        console.log('Slots generated successfully');
    } catch (error) {
        console.error('Error generating slots:', error);
    } finally {
        // Disconnect from MongoDB database
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Call the function to generate slots
generateSlots();
