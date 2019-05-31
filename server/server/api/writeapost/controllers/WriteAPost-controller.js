
/*
      controller.methods which accessed from route path will transfer
      the medium to dao file for sql parsing
 */

import writeAPostDao from "../dao/writeAPost-dao";

export default class WriteAPostController {

  //controller for saving user into a database.
  static postUser(req,res){
    let _req = req.body;
    writeAPostDao.postUser(_req).then((usr)=>{
      res.status(200).json(usr).send(usr);
    })
      .catch((error => res.json(error)))
  }

  //controller for aunthentication of a user
  static authUser(req,res){

    let _req  =  req.body;
    const jwt = require('jsonwebtoken');

    writeAPostDao.authUser(_req).then(user =>{
      let count  = user.count;
      if(count === 0){
        console.log("invalid auth");
       // res.statusCode(401);
      }else {
        console.log("valid auth");
        let name  = user.rows[0].dataValues.firstname+user.rows[0].dataValues.lastname;
        let body = {
          id: user.rows[0].dataValues.id,
          name: name,
          email: user.rows[0].dataValues.email
        };
        const token = jwt.sign({body}, 'shared-secret', {expiresIn: '2h'})
        console.log("token is",token);
        res.status(200).json(token).send(token);
      }
    })
      .catch((error => res.json(error)))

  }
  //contoller for saving post to database.
  static insertPost(req,res){

    let _req = req.body;
    console.log("");
    writeAPostDao.insertPost(_req).then((details)=>{
      res.status(200).json(details).send(details);
    })
      .catch((error => res.json(error)))
  }

  //controller for getting all post titles.
  static getAllTitles(req,res){

      let _req  = req.query;
    writeAPostDao
      .getAllTitles(_req)
      .then(pst =>{res.status(200).json(pst)})
      .catch(error => {res.status(400).json(error)});
  }

  //controller for getting post related content by id
  static getByIdAll(req,res)
  {
    let _id = req.params.id;
    writeAPostDao.getByIdAll(_id).then((vpst) => {
      res.status(200).json(vpst).send(vpst);
    })
      .catch((error => res.json(error)))
  }

  //controller for saving comments
  static submitComment(req,res){

    let _req = req.body;
    writeAPostDao.submitComment(_req).then((details)=>{
      res.status(200).json(details).send(details);
    })
      .catch((error => res.json(error)))
  }

  //controller for getting all coments based on postid
  static getallcomments(req,res){

    let _id = req.params.id;
    writeAPostDao.getallcomments(_id).then((vpst) => {
      console.log(vpst);
      res.status(200).json(vpst).send(vpst);
    })
      .catch((error => res.json(error)))
  }

  //controller for saving likes for a particular postid
  static postAllLikes(req,res){

    let _req  = req.body;
    writeAPostDao.postAllLikes(_req).then((details)=>{
      res.status(200).json(details).send(details);
    })
      .catch((error => res.json(error)))
  }

  //controller for getting likes for a particular post
  static getAlllikes(req,res){

    let _id = req.params.id;
    console.log(_id);
    writeAPostDao.getAlllikes(_id).then((vpst) => {
      res.status(200).json(vpst).send(vpst);
    })
      .catch((error => res.json(error)))
  }

  static getAllViews(req,res){
    let _id = req.params.id;
    writeAPostDao.getAllViews(_id).then((vews) => {
      res.status(200).json(vews).send(vews);
    })
      .catch((error => res.json(error)))
  }

  static updateViews(req,res){
    let _req  = req.body;
    writeAPostDao.updateViews(_req).then((upws) => {
      res.status(200).json(upws).send(upws);
    })
      .catch((error => res.json(error)))
  }

  static searchView(req,res){

    let _req = req.query;
    console.log("search value in controllers are ",_req[0]);
    writeAPostDao.searchView(_req).then((details)=>{
      console.log(details);
      res.status(200).json(details).send(details);
    })
      .catch((error => res.json(error)))
  }
}
