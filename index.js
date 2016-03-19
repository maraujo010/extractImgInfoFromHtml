var ui = require("sdk/ui");
var file = require("sdk/io/file");
var profilePath = require("sdk/system").pathFor("ProfD");
require('chrome').Cu.import('resource://gre/modules/FileUtils.jsm');
var data = require("sdk/self").data;


function getUrlUri(url) {
	var urlArr = url.split("/");
	/*console.log(JSON.stringify(urlArr));*/
	
	var urlInfo = {};
	
	urlInfo["website"] = urlArr[2];
	
	if (urlArr[3]=="") 
		urlInfo["uri"] = "/";
	else
		urlInfo["uri"] = "/"+urlArr[3]+"/";
	
	return urlInfo;
}



var action_button = ui.ActionButton({
  id: "my-button",
  label: "Generate image list file",
  icon: "./icon.png",
  onClick: function(state) {	  
	  
	  var filePath = file.join(profilePath, "website-img-info.ods");
	  var writer = file.open(filePath, "w");

	  var tab = require("sdk/tabs").activeTab;
	  tab.attach({
		contentScriptFile:data.url("content-script.js"),
		onMessage: function(data)
		{
			
		  var urlInfo=getUrlUri(tab.url);	
		  var fileContent = "WEBSITE: "+urlInfo["website"]+" \n";
		  fileContent+= "PAGE URI: "+urlInfo["uri"]+"\n";
		  fileContent+= "PAGE TITLE: "+tab.title+"\n\n";
		  fileContent+= "IMAGE URL"+"\t BACKGROUND \t"+"ALT TEXT"+"\t NEW FILENAME"+"\t NEW ALT TEXT"+"\t TO DO"+"\n";			  		  
		  
		  /*console.log("Tab data received: " + JSON.stringify(data));*/
		  
		  for (var i = 0; i < data['htmlImgs'].length; i++) {
			  fileContent+= data['htmlImgs'][i]["src"]+"\t No \t"+data['htmlImgs'][i]["alt"]+"\n";
		  }
		  		  
			  
		  for (var i = 0; i < data['cssImgs'].length; i++) {
			  fileContent+= data['cssImgs'][i]+"\t Yes \n";
		  }
		  
		  
		  writer.writeAsync(fileContent, function(error)
		  {
		    if (error)
		      console.log("Error: " + error);
		    /*else
		      console.log("Success!");
		      writer.close();*/
		    	
		  });	
			
			
		}
	  });
		  	 	  
	  new FileUtils.File(filePath).launch();
	 
	  	  
  }
});