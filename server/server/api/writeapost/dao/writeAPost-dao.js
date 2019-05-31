/*

      dao-file.methods which accessed methods from controllers
      form sequelize sql.
 */


import Promise from "bluebird";
import models from "../../../../models"
import Sequelize from "sequelize"

const Op = Sequelize.Op;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt/lib');

export default class writeAPostDao {

  //method for saving auser
  static postUser(req) {
    return new Promise((resolve, reject) => {
      models.user.create({
        firstname: req.firstname,
        lastname: req.lastname,
        email: req.email,
        password: req.password
      })
        .then(newuser => {
          console.log(newuser);
          resolve(newuser);
        }, (error) => {
          reject(error);
        });
    });
  }

  //method for user verification
  static authUser(req) {
    return new Promise((resolve, reject) => {
      models.user.findAndCountAll({
        attributes: ['id', 'firstname', 'lastname', 'email'],
        where: {
          email: req.email,
          password: req.password
        }
      })
        .then(vpst => {
          resolve(vpst);
        }, (error) => {
          reject(error);
        });
    });
  }

  //method for saving post
  static insertPost(req) {
    return new Promise((resolve, reject) => {

      let tagattach = '';

      for (let i = 0; i < req.tag.length; i++) {

        tagattach += req.tag[i].value + ',';

      }

      tagattach = tagattach.slice(0, tagattach.length - 1);

      models.postmodel.create({
        title: req.title,
        content: req.content,
        postedby: req.postedby,
        tag: tagattach,
        views: 0,
        postedon: new Date()
      })
        .then(newPost => {
          console.log(newPost);
          resolve(newPost);
        }, (error) => {
          reject(error);
        });
    });
  }

  //method for getting post titles with server-dummy side paginatation.
  static getAllTitles(req) {
    return new Promise((resolve, reject) => {

      let limit = req.itemsPerPage;
      let offset;
      let page = req.pageNo;
      offset = limit * (page - 1);

      models.postmodel.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']],
        include: [{
          model: models.user,
          attributes: ['firstname', 'lastname'],
        }]
      })
        .then(pst => {
          console.log("pst is", pst);
          resolve(pst);
        }, (error) => {
          reject(error);
        });
    });
  }

  //method for serverside searching from postmodel

  static searchView(req) {
    return new Promise((resolve, reject) => {

      if (req[1] === 'title') {

        models.postmodel.findAll({
          include: [
            {
              model: models.user,
              attributes: ['firstname', 'lastname'],
            }
          ],
          where: {
            [req[1]]: {
              [Op.iLike]: '%' + req[0] + '%'
            }
          }
        })
          .then(search => {
            resolve(search)
          }, (error) => {
            console.log(error);
            reject(error)
          })
      } else if (req[1] === 'postedby') {
        models.postmodel.findAll({
          include: [
            {
              model: models.user,
              attributes: ['firstname', 'lastname'],
              where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('firstname'), Sequelize.col('lastname')), {
                [Op.iLike]: '%' + req[0] + '%'
              })
            }
          ],
        })
          .then(searchBy => {
            resolve(searchBy)
          }, (error) => {
            console.log(error);
            reject(error)
          })

      } else if (req[1] === 'postedon') {
        models.postmodel.findAll({
          include: [
            {
              model: models.user,
              attributes: ['firstname', 'lastname'],
            }
          ],
          where: {
            [req[1]]: {
              [Op.lt]: new Date(),
            }
          }
        })
          .then(searchOn => {
            console.log("search data",searchOn);
            resolve(searchOn)
          }, (error) => {
            console.log(error);
            reject(error)
          })
      }
    })
  }

  //method for getting post and related content based on postid
  static getByIdAll(_id) {
    return new Promise((resolve, reject) => {
      let chang = _id.toString();
      let id_uid = chang.split(',');
      console.log("hmm", id_uid[0], id_uid[1]);
      models.postmodel.findAll({
        attributes: ['postedby', 'postedon', 'views', 'tag', 'title', 'content'],
        where: {id: id_uid[0]},
        include: [{model: models.user, attributes: ['firstname', 'lastname', 'email']}],
      })
        .then(vpst => {
          resolve(vpst);
        }, (error) => {

          reject(error);
        });
    });
  }

  //methods for saving comment
  static submitComment(req) {
    return new Promise((resolve, reject) => {
      models.comment.create({
        commentedby: req.commentedby,
        commentcontent: req.commentcontent,
        postid: req.postid,
        commentedon: new Date()
      })
        .then(newPost => {
          resolve(newPost);
        }, (error) => {
          reject(error);
        });
    });
  }

  static getallcomments(_id) {
    return new Promise((resolve, reject) => {

      models.comment.findAll({
        attributes: ['commentcontent', 'commentedon'],
        where: {postid: _id},
        include: [{
          model: models.user,
          attributes: ['firstname', 'lastname'],
        }]
      })
        .then(vpst => {
          console.log(" data for all comments", vpst);
          resolve(vpst);
        }, (error) => {
          reject(error);
        });
    });
  }

  //method for saving likes
  static postAllLikes(_req) {
    return new Promise((resolve, reject) => {
      models.like.create({postid: _req.id})
        .then(vpst => {
          resolve(vpst);
        }, (error) => {
          reject(error);
        });
    });
  }

  //methods for getting likes for a particular post
  static getAlllikes(_id) {
    return new Promise((resolve, reject) => {
      models.like.findAndCountAll({
        where: {
          postid: _id
        }
      })
        .then(vpst => {
          resolve(vpst);
        }, (error) => {
          reject(error);
        });
    });
  }

  static getAllViews(_id) {
    return new Promise((resolve, reject) => {
      models.postmodel.findOne({
        attributes: ['views'],
        where: {
          id: _id
        }
      })
        .then(vews => {
          resolve(vews);
        }, (error) => {
          reject(error);
        });
    });
  }

  static updateViews(req) {
    return new Promise((resolve, reject) => {
      models.postmodel.update(
        {
          views: req[1]
        },
        {
          where:
            {
              id: req[0]
            }
        })
        .then(updtviews => {
          resolve(updtviews);
        }, (error) => {
          reject(error);
        });
    });
  }
}
