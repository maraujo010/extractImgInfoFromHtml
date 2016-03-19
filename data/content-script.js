function getStyle(x, styleProp) {
    if (x.currentStyle) var y = x.currentStyle[styleProp];
    else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    return y;
}



function img_find() { 
	var imgs = document.getElementsByTagName("img"); 
	var imgSrcs = [];  
	for (var i = 0; i < imgs.length; i++) { 
	if (imgs[i].src!="") {
		imgInfo = {}; 
		imgInfo["src"]=imgs[i].src;  
		imgInfo["alt"]=imgs[i].alt; 
		imgSrcs.push(imgInfo);}
	}
	var allImgs = {};
	allImgs["htmlImgs"]= imgSrcs;
	
	var elements = document.getElementsByTagName('*');
    var results = [];        
    for (var i=0; i<elements.length; i++) {
                    
    	bgIm = getComputedStyle(elements[i]).getPropertyValue("background-image")
    	
        if (bgIm && bgIm !== 'none' && bgIm.indexOf("url")!=-1) {
        	bgIm = bgIm.substring(5, bgIm.length-2);        	
        	if (results.indexOf(bgIm)==-1) {
        		results.push(bgIm);
        	}
            
        }
    }
    allImgs["cssImgs"]= results;
	/*console.log(JSON.stringify(results));*/
	return allImgs; 
} 
	 
self.postMessage(img_find());