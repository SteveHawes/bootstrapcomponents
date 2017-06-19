{
	"name": "bootstrapcomponents-button",
	"displayName": "Button",
	"version": 1,
	"icon": "servoydefault/button/button.png",
	"definition": "bootstrapcomponents/button/button.js",
	"libraries": [{"name":"bootstrapcomponents-button-css", "version":"1.0", "url":"bootstrapcomponents/button/button.css", "mimetype":"text/css"}],
	"model":
	{
		"enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onActionMethodID","onDoubleClickMethodID","onRightClickMethodID"] },
	    "imageStyleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" },"default": "btn btn-default", "values" :["btn","btn-default","btn-lg","btn-sm","btn-xs"]},
	    "text" : {"type":"tagstring" , "initialValue":"Button", "tags": { "directEdit" : "true" }},
	    "visible" : "visible"
	},
	"handlers":
	{
	       "onActionMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
	        "onDoubleClickMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
	        "onRightClickMethodID" : {

	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        }
	},
	"api":
	{
			"requestFocus": {
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	        }
	}

}
