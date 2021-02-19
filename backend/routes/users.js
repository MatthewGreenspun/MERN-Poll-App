const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted"))
        .catch((err) => res.json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const polls = [];
    const newUser = new User({username, polls});

    newUser.save()
        .then(() => res.json("User Added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/newpoll/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            const newPoll = {
                id: user.polls.length > 0? user.polls[user.polls.length-1].id+1: 0,
                pollTitle: req.body.pollTitle,
                pollOptions: req.body.pollOptions,
            }

            user.polls.push(newPoll);
            user.save()
                .then(() => res.json("Poll Added"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updatepoll/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            const optionToChange = req.body.option;
            user.polls.forEach((pollObj) => {
                if(pollObj.id === Number(req.body.id)) pollObj["pollOptions"][optionToChange]++;
            });
            const newPolls = user.polls;
            user.polls = [];
            for(let poll of newPolls)
                user.polls.push(poll);
            user.save()
                .then(() => res.json("Poll Updated"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;