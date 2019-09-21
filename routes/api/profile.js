const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const router = express.Router();

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

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
      .populate("user", ["name", "avatar"])
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

//@Route    GET /profile/user_handle/:handle
//@desc     Get profile handle
//@Access   Public
router.get("/user_handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found with this handle";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "No profile found with this handle" })
    );
});

//@Route    GET /profile/user_ID/:userID
//@desc     Get profile ID
//@Access   Public
router.get("/user_ID/:userID", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.userID })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile found with this ID";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "No profile found with this ID" })
    );
});

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

//@Route    POST /profile/experience
//@desc     Add experience to profile
//@Access   Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        //Add newExp object to experience
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

//@Route    POST /profile/education
//@desc     Add education to profile
//@Access   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          school: req.body.school,
          degree: req.body.degree,
          stream: req.body.stream,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        //Add newExp object to education
        profile.education.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
