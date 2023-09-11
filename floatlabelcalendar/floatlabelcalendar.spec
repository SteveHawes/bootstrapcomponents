{
	"name": "bootstrapcomponents-floatlabelcalendar",
	"displayName": "FloatLabel Calendar",
	"categoryName": "Input Control",
	"version": 1,
	"icon": "bootstrapcomponents/floatlabelcalendar/calendar.png",
	"serverscript": "bootstrapcomponents/calendar/calendar_server.js",
	"doc": "bootstrapcomponents/calendar/calendar_doc.js",
	"ng2Config": {
        "dependencies": {
           "csslibrary": ["~@eonasdan/tempus-dominus/dist/css/tempus-dominus.css;priority=5"]
        }
    },
	"keywords": ["agenda", "diary", "day", "month", "year"],
	"model":
	{
		"calendarWeeks" : {"type" :"boolean", "pushToServer": "shallow", "default": true, "tags": { "scope" :"design" }},
	    "dataProviderID" : { "type":"dataprovider", "pushToServer": "allow","tags": { "scope" :"design" }, "ondatachange": { "onchange":"onDataChangeMethodID", "callback":"onDataChangeCallback"}},
	    "disabledDates" : {"type":"date[]", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "disabledDays" : {"type":"int[]", "pushToServer": "shallow","tags": { "scope" :"private" }},	    
	    "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["dataProviderID","onActionMethodID","onDataChangeMethodID"] },
	    "findmode" : { "type":"findmode", "tags":{"scope":"private"}}, 
	    "format" : {"for":["dataProviderID"] , "type" :"format"},
	    "keepInvalid": {"type" :"boolean", "pushToServer": "shallow", "default": false, "tags": { "scope" :"private" }},
	    "maxDate" : {"type":"date", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "minDate" : {"type":"date", "pushToServer": "shallow","tags": { "scope" :"private" }},
	    "readOnly" : { "type": "protected", "blockingOn": true, "default": false,"for": ["dataProviderID","onDataChangeMethodID"], "tags":{"scope":"private"}},
	    "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design", "doc": "Set the styleclasses that should be applied at to this component" }, "default" : "form-control"},
	    "floatLabelText" : "tagstring",
	    "errorMessage" : "tagstring",
		"errorShow" : {"type" : "boolean", "pushToServer": "allow", "tags":{"scope":"private"}},
	    "size" : {"type" :"dimension",  "default" : {"width":140, "height":50}},
	    "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }},
	    "theme" : {"type":"string" , "tags": { "scope" :"design"}, "default" : "light",  "values" :["auto" , "dark", "light"]},
	    "toolTipText" : { "type" : "tagstring"}, 
	   "visible" : {"type" : "visible", "tags": {"doc": "Whether the button is visible or not"}},
        "selectOnEnter" : {"type" :"boolean", "tags": { "scope" :"design", "doc": "Whether to select the text when date field is focused." }},
        "pickerOnly": {"type" :"boolean", "default": false, "tags": { "scope" :"design", "doc": "Whether to only allow date entry from the date picker or not (cannot type the date)." }}
	    
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
							 ],
				"code": "return true",
				"doc": "Handle changed data, return false if the value should not be accepted.\nJSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)"
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
	        },
	        "disableDates": {
				"parameters":[
						{                                                                 
						"name":"dateArray",
						"type":"date[]"
						},
						{
							"name":"keepInvalid",
                            "type":"boolean",
                            "optional":true
						}           
				]
            }, 
            "disableDays": {
				"parameters":[
						{                                                                 
						"name":"dayArray",
						"type":"int[]"
						},
						{
							"name":"keepInvalid",
                            "type":"boolean",
                            "optional":true
						}           
				]
            },
            "setMinMaxDate": {
				"parameters":[
						{                                                                 
                            "name":"minDate",
                            "type":"date"
                        },
                        {                                                                 
                            "name":"maxDate",
                            "type":"date"
						},
						{
							"name":"keepInvalid",
                            "type":"boolean",
                            "optional":true
						}       
				]
	        },
	   		"toggleErrorMessage": {
	   			"parameters":[
						 	{
								"name":"show",
					 			"type":"boolean"
							}
						]
	   		}
	}

}
