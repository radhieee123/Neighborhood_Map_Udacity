
function loadData() {

    var $body = $('body');
    var cityStr=$("#hidden").val();
    var $wikiElem = $('#wikipedia-links');
    // clear out old data before new request
    $wikiElem.text("");
console.log("This is "+cityStr);
  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
  var wikiReuestTimeout = setTimeout(function(){
    $wikiElem.text("failed to load wiki resources");},8000);

  $.ajax({url:wikiUrl,
    dataType: "jsonp",

    success: function(response)
    {
        var articleList= response[1];

        for(var i=0;i<articleList.length;i++)
        {
            articleStr = articleList[i];
            var url='http://en.wikipedia.org/wiki/'+articleStr;
            $wikiElem.append('<a href="'+url+'">'+articleStr+'</a>');

        };
        clearTimeout(wikiRequestTimeout);
    }
    });
    return false;
};

$("#form-container").submit(loadData);
