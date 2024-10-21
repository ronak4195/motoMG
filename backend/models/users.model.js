import mongoose from 'mongoose';

const Users = mongoose.model('Users', {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
    },
    vehicle: {
      type: String,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cartData: [{
      id: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      mrp: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }],
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    }
  });
  
  export default Users;