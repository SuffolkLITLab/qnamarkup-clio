function loadQnA(url_point,button) {
  // Note: this only works with A tags, not X tags. 
  // The QnA you are loading must be on the same domain as the QnA calling it.

  $.ajax({ url: url_point, success: function(data) { 

    var mydata = $(data).find('div[id=ondeck]');
    var placeholder = Date.now();
    mydate = mydata.html(mydata.html().replace(/ (id|name)="Q-/gi, ' $1="Q-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="A-(target-|href-|)/gi, ' $1="A-$2'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="J-/gi, ' $1="J-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="X-/gi, ' $1="X-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="Xi-/gi, ' $1="Xi-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/var QVnames =/gi, 'QVnames_placeholder ='));
    
    mydate = mydata.html(mydata.html() + "<div id='A-"+placeholder+".1' name='A-"+placeholder+".1' style='display:none;'>"+$($.parseHTML(button)).html()+"</div>");
    mydate = mydata.html(mydata.html() + "<div id='X-"+placeholder+".1' name='X-"+placeholder+".1' style='display:none;'>"+$($.parseHTML(button)).html()+"</div>");

    var QVNames_tmp = QVnames;
    $('#ondeck').html($('#ondeck').html()+mydate.html());
    QVnames = QVNames_tmp     
    for (var i in QVnames_placeholder) {
      //check to see if [][1] is a custom name, if so leave it alone
      if (QVnames_placeholder[i][1].match(/[a-z]/i)) {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],QVnames_placeholder[i][1]])
      } else {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],placeholder+'.'+QVnames_placeholder[i][1]])
      }
    }

    answerQ(placeholder+.1);

  } });
}
