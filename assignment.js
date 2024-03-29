let mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongodb", { useNewUrlParser: true })
  .then(() => console.log("connection successfull"))
  .catch(ex => console.log(`error occured ${ex.message}`));

let courseSchema2 = new mongoose.Schema({
  tags: { type: Array },
  date: { type: Date },
  name: { type: String },
  author: [String],
  isPublished: { type: Boolean },
  price: { type: Number }
});
let Course = mongoose.model("Assignment", courseSchema2, "Assignment");

async function AllCourses() {
  let data = await Course.find()
    .or([{ tags: "backend" }, { tags: "frontend" }])
    .select(["tags", "name", "author"])
    .sort("-price");

  console.log(data);
}

AllCourses();
