import WriteAPostController from "../controllers/WriteAPost-controller";

export default class writeapostRoute{

  static init(router){

    /*
        routes path [GET , POST, PUT, PATCH, DELETE]
        path travelled to controller method.

     */

    //route path for saving the registered user
    router.route('/registerUser')
      .post(WriteAPostController.postUser)

    //route path for authentication of a user
    router.route('/authentication')
      .post(WriteAPostController.authUser)
    // route path for  saving the post to database
    router.route('/posting')
      .post(WriteAPostController.insertPost)

    //route path for getting all post titles from database
    router.route('/gettitles')
      .get(WriteAPostController.getAllTitles)

    //route path for getting particular post based on its id from database
    router.route('/presentPost/:id')
      .get(WriteAPostController.getByIdAll)

    //route path for saving comment to databse
    router.route('/submitcomment')
      .post(WriteAPostController.submitComment)

    //route path getting all comments based on post id from database
    router.route('/getallcomments/:id')
      .get(WriteAPostController.getallcomments)

    //route path for saving likes to database for a paricular post
    router.route('/postlikes')
      .post(WriteAPostController.postAllLikes)

    //route path getting likes for a particular post
    router.route('/getalllikes/:id')
      .get(WriteAPostController.getAlllikes)

    //route path to get views from post model.
    router.route('/getViews/:id')
      .get(WriteAPostController.getAllViews)

    //route path to update views in post model
    router.route('/UpdateViews')
      .patch(WriteAPostController.updateViews)

    //route path to search the from post model.
    router.route('/search')
      .get(WriteAPostController.searchView)
  }

}
