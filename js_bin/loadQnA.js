function loadQnA(url_point) {
  $.ajax({ url: url_point, success: function(data) { 

    var mydata = $(data).find('div[id=ondeck]');
    var placeholder = Date.now();
    mydate = mydata.html(mydata.html().replace(/ (id|name)="Q-/gi, ' $1="Q-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="A-(target-|href-|)/gi, ' $1="A-$2'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="J-/gi, ' $1="J-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="X-/gi, ' $1="X-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/ (id|name)="Xi-/gi, ' $1="Xi-'+placeholder+'.'));
    mydate = mydata.html(mydata.html().replace(/var QVnames =/gi, 'QVnames_placeholder ='));
    //qv = mydata.html().match(/var QVnames = (.*)/gi);
    $('#ondeck').html($('#ondeck').html()+mydate.html());
    console.log(QVnames);

    for (var i in QVnames_placeholder) {
      //check to see if [][1] is a custom name, if so leave it alone
      if (QVnames_placeholder[i][1].match(/[a-z]/i)) {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],QVnames_placeholder[i][1]])
      } else {
        QVnames.push([placeholder+'.'+QVnames_placeholder[i][0],placeholder+'.'+QVnames_placeholder[i][1]])
      }
    }

    goto(placeholder+.1);
    // figure out what to do with goback replicate Qnum == 1 
    // put up a "thinking" bubble while loading
    // maybe disable answerQ in php when loadQnA found
  } });
}
