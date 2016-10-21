angular.module('bootstrapcomponentsTablesspanel',['servoy']).directive('bootstrapcomponentsTablesspanel', function($sabloApplication) {  
    return {
      restrict: 'E',
      scope: {
       	model: "=svyModel",
       	svyServoyapi: "=",
       	handlers: "=svyHandlers",
       	api: "=svyApi"
      },
      controller: function($scope, $element, $attrs) {
    	  
    	  var realContainedForm = $scope.model.containedForm;
    	  $scope.getActiveTabUrl = function() {
    		  if (realContainedForm)
    		  {
    			  return $scope.svyServoyapi.getFormUrl(realContainedForm)
    		  }  
    		  return "";
    	  }
    	  
    	  if ($scope.model.containedForm)
		  {
    		  $scope.svyServoyapi.formWillShow($scope.model.containedForm,$scope.model.relationName);
		  }
		  
    	  $scope.$watch("model.containedForm", function(newValue,oldValue) {
    	  		if (newValue !== oldValue)
    	  		{
					if (oldValue) {
						$scope.svyServoyapi.hideForm(oldValue,null,null,newValue,$scope.model.relationName,null).then(function(ok) {
							realContainedForm = $scope.model.containedForm;
						})
					}
					else if (newValue) {
						$scope.svyServoyapi.formWillShow(newValue,$scope.model.relationName);
						realContainedForm = $scope.model.containedForm;
					}
				}	
		  });
		
    	  $scope.$watch("model.visible", function(newValue,oldValue) {
  	  		if ($scope.model.containedForm && newValue !== oldValue)
  	  		{
  	  			if (newValue)
  	  			{
  	  				$scope.svyServoyapi.formWillShow($scope.model.containedForm,$scope.model.relationName);
  	  			}
  	  			else
  	  			{
  	  				$scope.svyServoyapi.hideForm($scope.model.containedForm);
  	  			}	
			}	
		  });
    	  
    	  $scope.getContainerStyle = function() {
    		  var height = 0;
    		  if ($scope.model.height)
    		  {
    			  height = $scope.model.height
    		  }
    		  else if ($scope.model.containedForm && $sabloApplication.hasFormStateWithData($scope.model.containedForm))
    		  {
    			  // for absolute form default height is design height, for responsive form default height is 0
    			  var formState = $sabloApplication.getFormStateEvenIfNotYetResolved($scope.model.containedForm);
    			  if (formState && formState.properties && formState.properties.absoluteLayout)
    			  {
    				  height = formState.properties.designSize.height; 
    			  }	  
    		  }	  
    		  return {position:"relative", minHeight:height+"px"};
    	  }
    	  
    	  $scope.showEditorHint = function()
    	  {
    		  return !$scope.model.containedForm && $element[0].getAttribute("svy-id") !== null;
    	  }
    	  
      },
      templateUrl: 'bootstrapcomponents/tablesspanel/tablesspanel.html'
    };
  })
  
  
  
