import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore'; // add this to use Firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducers';
import settingReducer from './reducers/settingReducers';

const firebaseConfig = {
  apiKey: 'AIzaSyBCqIJgkcQ9dPmVKt6X5YiKbyy84MGIqbY',
  authDomain: 'react-client-panel-23631.firebaseapp.com',
  databaseURL: 'https://react-client-panel-23631.firebaseio.com',
  projectId: 'react-client-panel-23631',
  storageBucket: 'react-client-panel-23631.appspot.com',
  messagingSenderId: '18441197437',
  appId: '1:18441197437:web:e4e6a45f6a7e3742851e14',
  measurementId: 'G-C86MG02XB1',
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);
// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingReducer,
});

// Create initial State
const initilaState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initilaState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
