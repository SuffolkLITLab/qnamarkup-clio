function loadQnA(url_point,button,find,replace) {
  // The QnA you are loading must be on the same domain as the QnA calling it.
  // `url_point` is a URL for the html of QnA
  // `button` is the text you want the QnA to echo back after the button is "hit"
  // `find` is the variable name for a Q tag in the target QnA that you want to replace
  // `replace` is the variable name for a Q tag in the originating QnA that will replace `find`

  // IE doesn't support default parameters
  if (!find) find = false;
  if (!replace) replace = false;

  $.ajax({ url: url_point, success: function(data) {

    var mydata = $(data).find('div[id=ondeck]');
    var placeholder = Date.now();
    mydata = mydata.html(mydata.html().replace(/GOTO:(d)/g,"GOTO:"+placeholder+".$1"));
    mydata = mydata.html(mydata.html().replace(/ (id|name)="Q-/gi, ' $1="Q-'+placeholder+'.'));
    mydata = mydata.html(mydata.html().replace(/ (id|name)="A-(target-|href-|)/gi, ' $1="A-$2'+placeholder+'.'));
    mydata = mydata.html(mydata.html().replace(/ (id|name)="X-/gi, ' $1="X-'+placeholder+'.'));
    mydata = mydata.html(mydata.html().replace(/ (id|name)="Xi-/gi, ' $1="Xi-'+placeholder+'.'));
    mydata = mydata.html(mydata.html().replace(/var QVnames =/gi, 'QVnames_placeholder ='));

    mydata = mydata.html(mydata.html() + "<div id='A-"+placeholder+".1' name='A-"+placeholder+".1' style='display:none;'>"+button+"</div>");
    mydata = mydata.html(mydata.html() + "<div id='X-"+placeholder+".1' name='X-"+placeholder+".1' style='display:none;'>"+button+"</div>");

    var QVNames_tmp = QVnames;
    $('#ondeck').html($('#ondeck').html()+mydata.html());
    QVnames = QVNames_tmp
    for (var i in QVnames_placeholder) {
      //check to see if [][1] is a custom name, if so leave it alone
      if (QVnames_placeholder[i][1].match(/[a-z]/i)) {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],QVnames_placeholder[i][1]])
      } else {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],placeholder+'.'+QVnames_placeholder[i][1]])
      }
    }

    for(var i = 0; i < QVnames_placeholder.length; i++) {
       if(QVnames_placeholder[i][1] == find) {
          var find_id = placeholder+'.'+QVnames_placeholder[i][0];
	     }
    }

    var regexp = new RegExp("GOTO:"+find_id,"g");
    $('#ondeck').html($('#ondeck').html().replace(regexp,"GOTO:"+indexis(replace)));

    answerQ(placeholder+.1);

  } });
}
