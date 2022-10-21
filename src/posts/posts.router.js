const router = require('express').Router();
const postsServices = require('./posts.services');
const passport = require('passport');
require('../middlewares/auth.middleware')(passport)

router.route("/")
  .get(postsServices.getAllPosts)
  .post(
    passport.authenticate("jwt", { session: false }),
    postsServices.createPost
    )





module.exports = router;