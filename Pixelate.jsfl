function layerPrompt() {
    return prompt("Pixelate Coefficient?");
}
function roundTo(number, table) {
    return Math.round(number/table) * table;
}

var divider = layerPrompt();
var dom = an.getDocumentDOM();
var timeline = dom.getTimeline();
var selectedFrames = timeline.getSelectedFrames();
var currentTimeline = document.currentTimeline;
var lib = an.getDocumentDOM().library;
if (selectedFrames.length >= 3) {
        var selectedFramesLength = selectedFrames[2] - selectedFrames[1];
}
var currentFrame = selectedFrames[1];
for (var i = 0; i < selectedFramesLength; i++) {
	var currentFrame = currentFrame;
	var selectedLayerIndex = timeline.currentLayer;
	var selectedLayer = timeline.layers[selectedLayerIndex];
	timeline.setSelectedFrames(currentFrame,currentFrame,selectedLayer);
	
	if (lib.getItemProperty('symbolType', dom.selection[0]) == 'graphic' && currentFrame !== timeline.layers[timeline.getSelectedLayers()[0]].frames[currentFrame].startFrame) {
		timeline.convertToKeyframes()
	} else {
	selectedLayer.frames[currentFrame].convertToFrameByFrameAnimation();
	}
	
	currentFrame += 1
}
var currentFrame = selectedFrames[1];
for (var i = 0; i < selectedFramesLength; i++) {
	var currentFrame = currentFrame;
	var selectedLayerIndex = timeline.currentLayer;
	var selectedLayer = timeline.layers[selectedLayerIndex];
	timeline.setSelectedFrames(currentFrame,currentFrame,selectedLayer);
	if (currentFrame == timeline.layers[timeline.getSelectedLayers()[0]].frames[currentFrame].startFrame) {
		dom.setTransformationPoint({x:0,y:0});
		symbolName = Math.random();
		symbolNameHD = Math.random();
		symbolName2 = Math.random();

		dom.convertToSymbol('movie clip', symbolName, 'center');
		var xRef = dom.selection[0].x;
		var yRef = dom.selection[0].y;
		var wRef = dom.selection[0].width;
		var hRef = dom.selection[0].height;
		if (hRef > wRef) {
			var HDivider = hRef / 1000;
		} else {
			var HDivider = wRef / 1000;
		}
		dom.scaleSelection(1/HDivider, 1/HDivider);
		dom.convertSelectionToBitmap();
		dom.scaleSelection(1*HDivider, 1*HDivider);
		var nameHD = dom.selection[0].libraryItem.name;
		lib.selectItem(nameHD);
		lib.setItemProperty('allowSmoothing', false);
		lib.setItemProperty('compressionType', 'lossless');
		dom.convertToSymbol('movie clip', symbolNameHD, 'center');
		dom.selection[0].x = xRef;
		dom.selection[0].y = yRef;

		dom.scaleSelection(1/divider, 1/divider);
		dom.convertSelectionToBitmap();
		dom.scaleSelection(1*divider, 1*divider);
		var name = dom.selection[0].libraryItem.name;
		lib.selectItem(name);
		lib.setItemProperty('allowSmoothing', false);
		lib.setItemProperty('compressionType', 'lossless');
		dom.convertToSymbol('movie clip', symbolName2, 'center');
		dom.selection[0].x = xRef;
		dom.selection[0].y = yRef;
		dom.breakApart();
		dom.selection[0].width = roundTo(dom.selection[0].width, divider);
		dom.selection[0].height = roundTo(dom.selection[0].height, divider);
		dom.selection[0].x = roundTo(dom.selection[0].x, divider);
		dom.selection[0].y = roundTo(dom.selection[0].y, divider);
		dom.selection[0].libraryItem.name = Number(String(Math.random()).replace(".","").replace("0",""));

		lib.deleteItem(symbolName);
		lib.deleteItem(symbolNameHD);
		lib.deleteItem(symbolName2);
		lib.deleteItem(nameHD);
	}
	currentFrame ++;
}
