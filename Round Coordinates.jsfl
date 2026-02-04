var dom = fl.getDocumentDOM(); 
var timeline = dom.getTimeline(); 
var selectedFrames = timeline.getSelectedFrames(); // Get selected frames
var selectedFramesLength = selectedFrames[2] - selectedFrames[1]; // Calculate the number of frames
var sel = dom.selection

if (selectedFramesLength > 1) { 
    fl.getDocumentDOM().getTimeline().convertToKeyframes();  
    fl.getDocumentDOM().getTimeline().setFrameProperty('tweenType', 'none');  
}; 

var currentFrame = selectedFrames[1];
for (var i = 0; i < selectedFramesLength; i++) { 
    var selectedLayerIndex = timeline.currentLayer;  
    var selectedLayer = timeline.layers[selectedLayerIndex];  
    timeline.setSelectedFrames(currentFrame, currentFrame, selectedLayer);  

    if (sel.length > 0) {  
        for (var j = 0; j < sel.length; j++) {  
			dom.selection[0].x = Math.round(dom.selection[0].x);
			dom.selection[0].y = Math.round(dom.selection[0].y);
			dom.selection[0].width = Math.round(dom.selection[0].width);
			dom.selection[0].height = Math.round(dom.selection[0].height);
        } 
    } 

    currentFrame++;
};
