// import mongoose from "mongoose";
// async function seed() {
//   await mongoose.connect(
//     `mongodb+srv://brandonshearin:${process.env.MONGO_KEY}@cluster0.ybkow.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     }
//   );
//   await OrgModel.deleteMany({});
//   OrgModel.create({
//     address: "20332 Empire Avenue",
//     city: "Bend",
//     state: "OR",
//     name: "Evoke at Cascades",
//     website: "https://evoketherapy.com/",
//     zipcode: "97703",
//     phone: "(541) 382-1620",
//     type: "Wilderness",
//   });
// }

// seed().catch((err) => console.log(err));
