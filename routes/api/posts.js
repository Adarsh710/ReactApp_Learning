const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Post Model
const Post = require("../../models/Post");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load Validation
const validatePostInput = require("../../validation/post");

// router.get("/", (req, res) => res.json({ route: "hostname/posts/" }));

//@Route        GET /posts/:id
//@desc         Get posts
//@Access       Public
router.get("/:id", (req, res) => {
  Post.find({ user: req.params.id })
    .then(posts => {
      if (typeof posts !== "undefined" && posts.length > 0) {
        res.json(posts);
      } else {
        res.status(404).json({ post: "No post found" });
      }
    })
    .catch(err => res.status(404).json(err));
});

//@Route        POST /posts
//@desc         Creat post
//@Access       Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@Route        DELETE /posts/:id
//@desc         Creat post
//@Access       Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check for post and post's owner & the user is same
    Post.findOneAndRemove({
      $and: [{ _id: req.params.id }, { user: req.user.id }]
    })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ nopost: "No post found" }));
  }
);

//@Route        POST /posts/like/:id
//@desc         Like posts
//@Access       Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You already liked post" });
          }

          //Add user id to like array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ nopost: `No post found with this ${res.params.id} ID` })
        );
    });
  }
);

//@Route        POST /posts/unlike/:id
//@desc         Unlike posts
//@Access       Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You havn't like this post yet" });
          }

          //Get remove index of user id
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Remove user id to like array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res
            .status(404)
            .json({ nopost: `No post found with this ${req.params.id} ID` })
        );
    });
  }
);

//@Route        POST /posts/comment/:id
//@desc         Comment on posts
//@Access       Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        if (typeof posts !== "undefined" && posts.length > 0) {
          const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: req.user.name,
            avatar: req.user.avatar
          };

          //Add user id to comment array
          post.comments.unshift(newComment);

          post.save().then(post => res.json(post));
        }
      })
      .catch(err =>
        res
          .status(404)
          .json({ nopost: `No post found with this ${req.params.id} ID` })
      );
  }
);

//@Route        POST /posts/comment/:post_id/:comment_id
//@desc         Delete comment from posts
//@Access       Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        if (
          post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
            .length === 0
        ) {
          return res
            .status(404)
            .json({ nocomment: "Comment does not exist" });
        }

        //Get remove index of user id
        const removeIndex = post.comments
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //Remove user id to like array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res
          .status(404)
          .json({ nopost: `No post found with this ${req.params.post_id} ID` })
      );
  }
);

module.exports = router;