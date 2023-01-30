import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/action'; 

const baseURL = 'https://63d7316cafbba6b7c938e929.mockapi.io/api/post';
const interactURL = 'https://63d7316cafbba6b7c938e929.mockapi.io/api/interact';


function* getPost(){
    try{
        const {data} = yield axios.get(baseURL);
        yield getInteract();
        yield put({type: types.FETCH_POST_SUCCESS, payload: data});
       
    }
    catch(err){
        console.log('err while gettings post!!!')
    }
}

function* getInteract(){
    try{
        const{data} = yield axios.get(interactURL);
        yield put({type:types.FETCH_INTERACT_SUCCESS, 
            payload: data});
    }
    catch(err){
        console.log('err while gettings interact!!!')
    }
}

function* addPost(action){
    try{
        const{data} =yield axios.post(baseURL,action.payload);
        yield addInteract();
        yield put({
            type: types.ADD_POST_SUCCESS,
            payload: data
        })
       
    }
    catch(err){
        console.log('err while add post!!!')
    }
}

function* addInteract(){
    try{
        const{data} =yield axios.post(interactURL,{
            coffee: 0,heart: 0,rocket:0,thumbsUp:0,wow:0
        });
        yield put({
            type: types.ADD_INTERACT_SUCCESS,
            payload: data
        })
    }
    catch(err){
        console.log('err while add interact!!!')
    }
}


function* deletePost(action){
    try{
        const{data} =yield axios.delete(`${baseURL}/${action.payload}`);
        yield put({
            type: types.DELETE_POST_SUCCESS,
            payload: data.id
        })
        yield deleteInteract(action.payload);
    }
    catch(err){
        console.log('err while delete post!!!')
    }
}

function* deleteInteract(id){
    try{
        const{data} =yield axios.delete(`${interactURL}/${id}`);
        yield put({
            type: types.DELETE_INTERACT_SUCCESS,
            payload: data.id
        })

    }
    catch(err){
        console.log('err while delete interact!!!')
    }
}
function* editPost(action){
    try{
        const{data} =yield axios.put(`${baseURL}/${action.payload.id}`,action.payload);
        yield put({
            type: types.EDIT_POST_SUCCESS,
            payload: data
        })
    }
    catch(err){
        console.log('err while edit post!!!')
    }
}
function* editInteract(action){
    try{
        const{data} =yield axios.put(`${interactURL}/${action.payload.id}`,action.payload);
        yield put({
            type: types.EDIT_INTERACT_SUCCESS,
            payload: data
        })
    }
    catch(err){
        console.log('err while edit interact!!!')
    }
}


export default function* rootSaga(){
    yield takeLatest(types.FETCH_POST, getPost);
    yield takeLatest(types.DELETE_POST, deletePost);
    yield takeLatest(types.ADD_POST, addPost);
    yield takeLatest(types.EDIT_POST, editPost);
    yield takeLatest(types.EDIT_INTERACT, editInteract);
}