var jobModel = require('../models/job_model');
var promise = require('bluebird');
var fs = require('fs');
var tag = "JOB CTRL: ";
var formidable = require("formidable");

module.exports.home = function (req, res) {

    res.render('index', {title: 'TNQ'});

};

module.exports.createQue = function (req, res) {
    var userid = "";

    function saveJob(jobdoc) {
        new jobModel(jobdoc).save(function (err, result) {
            if (!err) {
                console.log(tag + jobdoc.user_id + " saved successfully");

                res.json(tag + "document created User ID "+jobdoc.user_id);

            }
        });
    }

    var forma = new formidable.IncomingForm();
    forma.parse(req, function (err, fields, files) {
        if (err) {
            console.error(tag + err.message);
            res.json("Error message something occurred " + err);
        } else {
            var jobdoc = {
                date: new Date(),
                name: fields.name,
                status: fields.status,
                result: fields.result
            };
            jobModel.find({}).sort('-_id').limit(10).execAsync().then(function (result) {
                if (result.length == 0) {
                    userid = "USERID-000001";
                    jobdoc.user_id = userid;
                    console.log(tag + userid);
                    saveJob(jobdoc);
                } else {
                    var id = result[0].user_id.split("-");
                    var id_count = parseInt(id[1]);
                    var new_id = id_count + 1;
                    var NewsID = id[0].concat("-");
                    userid = NewsID.concat(new_id);
                    jobdoc.user_id = userid;
                    console.log(tag + userid);
                    saveJob(jobdoc);
                }
            });
        }
    });

};

module.exports.getStatus = function (req, res) {
    var id = req.query.user_id;
    var findUser = {user_id: id};
    jobModel.find(findUser,function (err,result) {
        console.log(tag + result);
        if(!err){
            if (result) {
                res.render('result',{sresult:result[0]});
            }
        }else{
            res.json("Error while getting status " + err);
        }
    });
};

module.exports.updateStatus = function (req, res) {
    var id = req.query.user_id;
    var status = req.query.status;
    var findUser = {user_id: id};
    var updateStatus = {status: status};
    jobModel.updateAsync(findUser, updateStatus).then(function (result) {
        if (result) {
            console.log(tag+id + " Updated Successfully. Status : " + status);
            res.json(id + " Updated Successfully. Status : " + status);
        }
    }).catch(function (err) {
        console.log(tag + "Error while updating user status " + id + " Error: " + err);
        res.json("Error while updating user status " + id + " Error: " + err);
    });
};
