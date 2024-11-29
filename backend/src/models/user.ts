import mongoose from 'mongoose';

// Step 1: Define the interface for the User model
const userSchema = new mongoose.Schema ( {
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  }

})

const User = mongoose.model("User", userSchema);
export default User;


// Step 2: Define the schema for the User model





