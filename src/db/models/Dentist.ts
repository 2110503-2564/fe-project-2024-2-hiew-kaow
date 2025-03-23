const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim:true,
        maxlength:[50, 'Name can not be more than 50 characters']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Please add years of experience'],
        min: [0, 'Years of experience cannot be negative']
    },
    areasOfExpertise: {
        type: [String],
        required: [true, 'Please add areas of expertise'],
        validate: {
            validator: function(v:any) {
                return v.length > 0 && v.every((tag:any) => tag.trim().length > 0);
            },
            message: 'Areas of expertise cannot be empty or contain empty tags'
        },
        enum: [
            'General Dentistry',
            'Orthodontics',
            'Endodontics',
            'Periodontics',
            'Implantology',
            'Oral Surgery',
            'Pediatric Dentistry',
            'Geriatric dentistry',
            'Cosmetic Dentistry',
            'Dental radiology and imaging',
            'Oral and maxillofacial surgery'
        ]
    },
});
const Dentist = mongoose.models.Dentist || mongoose.model("Dentise", DentistSchema);
export default Dentist