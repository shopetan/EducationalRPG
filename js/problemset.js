//milkcocoaへの問題のストア
$(function(){
	var milkcocoa = new MilkCocoa("uniidd9umi3.mlkcca.com");

	//文字化け対策
	$.ajaxSetup({
    	beforeSend: function(xhr, settings){
        	if (settings.url.endsWith(".csv"))
            	xhr.overrideMimeType("text/csv;charset=Shift_JIS");
    	}
	});
	//csvファイルを読み込み
	//各collumnごとに処理
	$.get('csv/QUESTION_SMP.csv', function (data){
		var csvdata = data.split("\r\n");
		for (var i = 0; i < csvdata.length - 1; i++){
			var senddata = csvdata[i].split(",");

			//データストア先の指定
			//child: 科目番号_小番号
			var mondaiDataStore = milkcocoa.dataStore('problem').child(senddata[0]+'_'+senddata[1]);

			//データストア
			//.set(問題id, 送るデータ, コールバック関数)
			//問題IDが統一されていれば変更も簡単
			mondaiDataStore.set(String(i), {"difficulty":senddata[2], "istwochioseQuestion":senddata[3] ,"question": senddata[4], "chiose0": senddata[5], "choise1": senddata[6], "choise2" : senddata[7], "choise3" : senddata[8], "anser": senddata[9], "ImagePATH": senddata[10]}, function (err, datum){
				if (err){
					console.log(err);
					return;
				}
				console.log(datum);
			});
			mondaiDataStore.on("set", function(setted){
				mondaiDataStore.get(setted.id, function (err, datum){
					var problemdata = datum.value;
					var problem_size = 0;
					for (i in problemdata){
						problem_size++;
					}
					console.log(problem_size);
				});
			})
		}
	});
});