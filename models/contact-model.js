import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  }, 
  name: {
    type: String, 
    required:true
  },
  email: {
    type: String,
    required:true,
  },
  phone: {
    type: String,
    required:true
  }

},
{
  timestamps:true,
})

const Contacts =  mongoose.model('Contact', contactSchema)

export default Contacts 