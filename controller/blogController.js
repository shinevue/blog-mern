const Blog = require("../model/Blog");
exports.sort = (req, res) => {
  console.log("method", req.body.method);
  Blog.find().sort();
};
exports.read = (req, res) => {
  Blog.find()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
exports.readone = (req, res) => {
  console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.json(err);
    });
};
exports.add = async (req, res) => {
  const newblog = new Blog({
    title: req.body.title,
    content: req.body.content,
    like: 0,
    watch: 0,
    user_id: req.params.id,
    imageURL: req.body.imgURL,
  });
  newblog
    .save()
    .then(() => {
      res.redirect("http://localhost:3000/myblog");
    })
    .catch((err) => res.json(err));
};
exports.update = async (req, res) => {
  console.log(req.body.title);
  Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    imageURL: req.body.imgURL,
  })
    .then(() => {
      res.redirect("http://localhost:3000/myblog");
    })
    .catch((err) => res.json(err));
};
exports.deleteblog = async (req, res) => {
  Blog.findById(req.params.id)
    .deleteOne()
    .then(() => {
      res.redirect("http://localhost:3000/myblog");
    })
    .catch((err) => res.json(err));
};

exports.like = async (req, res) => {
  Blog.findById(req.params.id).then((result) => {
    result.like++;
    result.save().then((item) => res.json(item));
  });
};
exports.watch = async (req, res) => {
  Blog.findById(req.params.id).then((result) => {
    result.watch++;
    result.save().then((item) => res.json(item));
  });
};
