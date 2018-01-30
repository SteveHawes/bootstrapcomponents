{
	"name": "bootstrapcomponents-choicegroup",
	"displayName": "Choice Group",
	"version": 1,
	"definition": "bootstrapcomponents/choicegroup/choicegroup.js",
	"libraries": [{"name":"bootstrapcomponents-choicegroup-css", "version":"1.0", "url":"bootstrapcomponents/choicegroup/choicegroup.css", "mimetype":"text/css"}],
	"icon": "bootstrapcomponents/choicegroup/radiobutton.png",
	"model":
	{
	        "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	        "readOnly" : { "type": "protected", "blockingOn": true, "default": false, "for": ["dataProviderID","onDataChangeMethodID"], "tags": {"scope":"runtime"} },
	        "inputType" : {"type" : "string" , "default" : "checkbox" ,"tags": { "scope" :"design" }, "values" : ["checkbox","radio"]},
	        "styleClass" : { "type" :"styleclass", "default" : "checkbox" , "tags": { "scope" :"design" }, "values" :["checkbox", "radio"]},
	        "valuelistID" : { "type" : "valuelist", "tags": { "scope" :"design" }, "for": "dataProviderID", "max":300},
			"tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
			"toolTipText" : { "type" : "tagstring"},
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
	        "onDataChangeMethodID" : {
	          "returns": "boolean",

	        	"parameters":[
								{
						          "name":"oldValue",
								  "type":"${dataproviderType}"
								},
								{
						          "name":"newValue",
								  "type":"${dataproviderType}"
								},
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        },
					"onFocusGainedMethodID" : {

	        	"parameters":[
								{
						      "name":"event",
								  "type":"JSEvent"
								}
						]
	        },
	        "onFocusLostMethodID" : {

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
				"parameters":[
						{                                                                 
						"name":"mustExecuteOnFocusGainedMethod",
						"type":"boolean",
						"optional":true
						}             
				],
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	        }
	}

}
