var ncmb = new NCMB("893d74c8a72da10536b5fc0c240032669c2968eef44310bb0704a89fef33cec3",
            "8b7231b4506622abe6e884573fc12b09182c67e6fb67cc021bb62f798b385ffe");


//データをmobile backendに保存するメソッド
function saveData(){
    //クラス名を指定して新規クラスを作成
    var Data = ncmb.DataStore("Data");

    //Dataクラスのインスタンスを作成
    var data = new Data();

    //作成したインスタンスのaisatsuというフィールドに文字データを設定
    data.set("aisatsu", "hello, world!");
    data.set("name", "bennie");

    //設定したデータをmobile backendに保存
    data.save()
        .then(function(object) {
              //成功する時の処理
              $("#message").html("<p>データ保存に成功!</p>");
          })
        .catch(function(error) {
              //エラーが発生する時の処理
              $("#message").html("error:" + error.message);          
          });
}

function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var email = $("#email").val();
    
    var user = new ncmb.User();

    //インスタンスにユーザー名とパスワードを設定
    user.set("userName", username)
        .set("password", password)
        .set("mailAddress", email);
    //会員登録を行うsignUpByAccountメソッドを実行
    user.signUpByAccount()
        .then(function (object){
            //成功する時の処理
            ncmb.User.login(username, password)
                     .then(function(data){
                        // ログイン後処理
                        getCurrentUser();              
                     })
                     .catch(function(err){
                        // エラー処理
                        console.log("error:" + err.message);
                     });
        })
        .catch(function (error){
            //エラーが発生する時の処理
            $("#current_user").text("登録に失敗しました" + error.message);
        });
}

function getCurrentUser() {
    var user = ncmb.User.getCurrentUser();
    $("#current_user").text("ログイン中のユーザー名："　+ user.get("userName"));
}