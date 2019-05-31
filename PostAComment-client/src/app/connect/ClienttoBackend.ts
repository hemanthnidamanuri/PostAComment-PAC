/*
      back end  URL route path should match with Endpoint Url
      Service access the Querys rest api http method will tak url
      Path from end point.
 */


import {environment} from "../../environments/environment";

export const register = 'register';
export const posting = 'posting';
export const GET = 'GET';
export const GETById = 'GETById';
export const sumittingcomment = 'sumittingcomment';
export const GETComments = 'GETComments';
export const POSTLikes = 'POSTLikes';
export const GETAllLikes = 'GETAllLikes';
export const GETViews = 'GETViews';
export const UpdateViews = 'UpdateViews';
export const searchAll = 'searchAll';
export const auth = 'auth';


export const Endpoints = (type: string, params: any) => {

  const end = {
    [register]: 'registerUser',
    [posting]: 'posting',
    [GET]: 'gettitles',
    [GETById]: 'presentPost',
    [sumittingcomment]: 'submitcomment',
    [GETComments]: 'getallcomments',
    [POSTLikes]: 'postlikes',
    [GETAllLikes]: 'getalllikes',
    [GETViews]: 'getViews',
    [UpdateViews]: 'UpdateViews',
    [searchAll]: 'search',
    [auth]: 'authentication'
  };

  //condition for deciding the get or post url should containt params url or not.

  if (typeof params != "undefined" && end[type] != end.posting && end[type] != end.sumittingcomment
    && end[type] != end.POSTLikes && end[type] != end.UpdateViews && end[type] != end.GET && end[type] != end.searchAll &&
    end[type] != end.register && end[type] != end.auth) {

    return environment.ROOTAPI + end[type] + '/' + params;

  } else {

    return environment.ROOTAPI + end[type];
  }

};
