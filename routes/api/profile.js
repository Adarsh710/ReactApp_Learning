const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const router = express.Router();

//Load Validation
const validateProfileInput = require("../../validation/profile");

//Load Profile model
const Profile = require("../../models/Profile");

//Load Users model
const User = require("../../models/User");

//fix Deprecation Warning
mongoose.set("useFindAndModify", false);

//@Route    GET /profile
//@desc     Get current users' profile
//@Access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

//@Route    POST /profile
//@desc     Creat current users' profile
//@Access   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.date) profileFields.date = req.body.date;

    //Skills
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");

    //Social
    profileFields.social = {};
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
