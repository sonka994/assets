function ischkwords(){
	if (typeof census_word == "undefined") return false;
	for(i=0;i<census_word.length;i++){
		if(document.title.indexOf(census_word[i]) !=-1)return true;
	}
	return false;
}

var userstat=true;
if(ischkwords()){
	userstat=false;
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
}


/*2017-06-09 add*/
    if ( typeof _webInfo != "undefined")
    {
        //add tongji for everyBJ
        var bjname=_webInfo.Username;
        var hm = document.createElement("script");
        if(bjname!='' && userstat){
            
            switch (bjname){
                case 'downcc':
					var curtime=_webInfo.DateTime;
					var date1 = new Date("2015/11/31");
					var date2 = new Date(curtime);
					if(date1.getTime() < date2.getTime()){
						hm.src="https://hm.baidu.com/hm.js?";
					}   
					break;
                case 'mengqianqian':
                    hm.src="https://hm.baidu.com/hm.js?e50803441e30205e6abfd90630d0ac09";
                    break;
                case 'luoyu':
                    hm.src="https://hm.baidu.com/hm.js?";
                    break;
                case 'heyao':
                    hm.src="https://hm.baidu.com/hm.js?94772bbbc0ed8a486ef9c1541b240a9f";
                    break;

            }
            if(hm.src!=''){
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            }
        }
    }