// import mongoose from "mongoose";

// const drawSchema = new mongoose.Schema({
//   numbers: [Number],
//   winners: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       matchCount: Number
//     }
//   ],
//   // createdAt: {
//   //   type: Date,
//   //   default: Date.now
//   // },
//   isPublished: {
//     type: Boolean,
//     default: false
//   },
//   prizes: {
//   match5: Number,
//   match4: Number,
//   match3: Number
// },
// totalPool: Number,
// charityTotal: Number,  
// finalPool: Number ,
//  country: {
//     type: String,
//     default: "India"
//   },
// });

// export default mongoose.model("Draw", drawSchema);

import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  numbers: {
    type: [Number],
    required: true
  },

  winners: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      matchCount: Number
    }
  ],

  prizes: {
    match5: Number,
    match4: Number,
    match3: Number
  },

  totalPool: {
    type: Number,
    required: true
  },

  charityTotal: {
    type: Number,
    default: 0
  },

  finalPool: {
    type: Number,
    required: true
  },

  country: {
    type: String,
    default: "India"
  },

  isPublished: {
    type: Boolean,
    default: false
  }

}, { timestamps: true }); // 🔥 better than manual createdAt

export default mongoose.model("Draw", drawSchema);