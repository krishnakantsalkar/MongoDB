let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongodb", { useNewUrlParser: true })
  .then(() => console.log("connection successfull"))
  .catch(ex => console.log(`error occured ${ex.message}`));

let courseSchema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  courses: [String],
  isPublished: { type: Boolean },
  date: { type: Date, default: Date.now }
});

let Course = mongoose.model("courses", courseSchema);

async function AddCourses() {
  let newCourse = new Course({
    name: "Manish",
    author: "facebook",
    courses: ["Nodejs"],
    isPublished: true
  });

  let data = await newCourse.save();
  console.log(data);
}

AddCourses();

async function AllCourses() {
  let data = await Course.find()
    .and([{ name: "vipul" }, { author: "google" }])
    .select(["name", "author"])
    .sort("-name")
    .limit(1);
  console.log(data);
}

AllCourses();
