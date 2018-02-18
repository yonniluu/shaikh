const admin = require('firebase-admin');
/**
* This is a function to update Google Firestore to a new code snippet
* @param {string} code
* @returns {any}
*/
module.exports = (code, context, callback) => {	
	// var dbURL = 'https://treehacks2018-82ece.firebaseio.com'
	var serviceAccount = require('../treehacks2018-2d14cff28ab6.json')
	admin.initializeApp({
	    credential: admin.credential.cert(serviceAccount)
	});
	var db = admin.firestore();
	var codeRef = db.collection('codeOutput').doc('ourCode');
	var setCode = codeRef.set({
		code: code
	}).then((result) => {
		return callback(null, result);
	}).catch((err) => {
		return callback(err);
	});
};
