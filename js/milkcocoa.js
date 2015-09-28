var milkcocoa = new MilkCocoa("uniidd9umi3.mlkcca.com");

var apiEndpoint = 'https://' + 'education-rpg.auth0.com' + '/api/v2/';
var auth0 = new Auth0({
	domain: 'education-rpg.auth0.com',
 	clientID: 'JelTeIAsjRphF41HAxSxOJ785mwpaSVF',
		callbackURL: 'http://localhost:8000/'	 //サーバのアドレス
});
var lock = new Auth0Lock(
 	'JelTeIAsjRphF41HAxSxOJ785mwpaSVF',	
	'education-rpg.auth0.com'
);

var User = null;
var metadata = {};

//問題のデータストア
//ダンジョンによってchildを変える
//-> 科目名＋ダンジョン番号
var mondaiDataStore = milkcocoa.dataStore('mondai').child('math1');
/*		mondaiDataStore.push({"ID": "Japanese111", "question": "正解はA？", "pattern":"4" ,"anser": "A"}, function (err, datum){
	if (err){
		console.log(err);
		return;
	}
	console.log(datum);
	console.log("問題入った");
});*/

//問題をセットする
//引数(問題ID，　｛問題，４択か２択か，解答｝, エラーチェックコールバック)
mondaiDataStore.set('Math111', {"question": "10x + 20 = 50", "pattern":"4" ,"anser": "C"}, function (err, datum){
	if (err){
		console.log(err);
		return;
	}
	console.log(datum);
});

//問題引っ張ってくる
//引数　（問題ID）
mondaiDataStore.get('Math111', function (err, datum) {
	console.log(datum.value.question);
	console.log(datum.value.anser);
	console.log(datum.value.pattern);
});

$("#signup").submit(function (e){
	e.preventDefault();
	function v2PatchUser (userId, id_token, data, successCallback, errorCallback) {
	    $.ajax({
	        method: 'patch',
	        url: apiEndpoint + 'users/' + userId,
	        dataType: 'json',
	        headers: {
	            'Authorization': 'Bearer ' + id_token
	        },
	        data: data,
	        success: successCallback,
	        error: errorCallback
	    });
	}

	function signupCallback (err, profile, id_token) {
	    if (err) {
	        alert('Something went wrong signing up: ' + err);
	        console.log(err);
	        return;
	    } else {
	    	var data = {
	          	user_metadata: {
	            	grade: $('#signup-grade').val(),
	            	name: $('#signup-name').val(),
	            	email: $('#signup-email').val(),
	            	password: $('signup-pass').val()
	          	}
	        };
	        function updateSuccess () {
	          	alert('Successfully signed up!');
	        }
	        function updateError (jqXHR) {
	          	alert('Something went wrong signing up: ' + jqXHR.responseText);
	        }
	        v2PatchUser(profile.user_id, id_token, data, updateSuccess, updateError);
	        
	    }
	}

	auth0.signup({
	    // Don't display a popup to set an SSO cookie
	    sso: false,
	    auto_login: true,
	    connection: 'Username-Password-Authentication',
	    email: $('#signup-email').val(),
	    password: $('#signup-pass').val()
	 }, signupCallback);

});

/*ログインとサインアップ*/
copy('#signup-email', '#login-email');
copy('#signup-pass', '#login-pass');    
		
//全体マップの進捗率
//科目島をクリアするとフラグ
var MapProgress = 0;

//各ダンジョンの進捗率
//ダンジョンをクリアするとフラグ
var DungeonProgress = 0;

//milkcocoa接続時にuserdataをセット
getUser(function (err, user){
	if (err){
		console.log(err);
		return;
	}
	var userDataStore = milkcocoa.dataStore('userdata');
	var user_Data = {
		'userID': user.user_id,
		'name': user.user_metadata.name,
		'grade': user.user_metadata.grade,
		'email': user.email,
		'DungeonProgress': DungeonProgress,
		'Mapprogress': MapProgress
	};
	userDataStore.on("set", function(setted){
		console.log("OK");
	});
	userDataStore.set(user.user_id, user_Data, function(){
		console.log("Ok");
	});
});

//auth0認証をした後にmilkcocoaに接続
function getUser(callback){
	milkcocoa.user(function (err, user){
    	if (err){
    		console.log(err);
    		callback(err);
    		return;
    	}
    	if (user){
    		var userDataStore = milkcocoa.dataStore('userdata');
    		userDataStore.stream().size(1).next(function (err, user){
    			userdata = user;
    		})
    		userDataStore.get("if3fzhj8DyWr40n", function (err, datum){
    			if (err){
    				console.log(err);
    				return;
    			}
    			console.log(datum);
    		})
//	        		callback(null, user);
        	console.log(user);
    	}
/*	        	else {
    		$('#login').submit(function (e, profile, token) {
				e.preventDefault();
				auth0.login({
			        sso: false,
			        connection: 'Username-Password-Authentication',
			        responseType: 'code',
			        scope: 'openid email user_metadata',
			        email: $('#login-email').val(),
			        password: $('#login-pass').val(),
			        callbackURL: 'http://localhost:8000/',	/*コールバックURL*/
/*					    	successCallback: MilkcocoaUser(e, profile, token)
			    });
			});

    	}
*/	        	else {
    		lock.show({ssp : false}, function (err, profile, token){
    			if (err){
    				console.log(err);
    				callback(err);
    				return;
    			}
    			console.log(err, profile, token);
    			milkcocoa.authWithToken(token, function(err, user){
    				if (err){
        				console.log(err);
        				callback(err);	        					
    					return;
    				}
    				callback(null, profile);
    			});
    		});
    	}	        	
	});
}
function copy(a, b){
	$(a).on("keyup blur", function (){
		$(b).val(this.value);
	});	
}

//ログアウト
$("#logout").click(function (){
	auth0.logout();
	milkcocoa.logout();
	window.location.href("index.html");
})
/*	    $(function(user, context, callback){	    	
	user.user_metadata = user.usermetadata || {};
	userDataStore.push(user.user_metadata);
})
*/

//セーブ関数
//マップとダンジョンの進捗を更新のみ?
function Save(err, user){
	if (err){
		console.log(err);
		return;
	}
	userDataStore.set(user.sub, {"DungeonProgress": DungeonProgress,"MapProgress": mapProgress}, function (err){
	});
}