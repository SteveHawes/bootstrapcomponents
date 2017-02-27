angular.module('bootstrapcomponentsCalendar',['servoy']).directive('bootstrapcomponentsCalendar', function($sabloApplication, $log, $apifunctions, $svyProperties, $sabloConstants) {  
	return {
		restrict: 'E',
		scope: {
			model: "=svyModel",
			handlers: "=svyHandlers",
			api: "=svyApi",
			svyServoyapi: "="
		},
		link: function($scope, $element, $attrs) {
			var child = $element.children();
			var ngModel = child.controller("ngModel");

			var options = {
				showTodayButton: true,
				calendarWeeks: true
			}

			var locale = $sabloApplication.getLocale();
			if (locale.language) {
				options.locale = locale.language;
			}
			child.datetimepicker(options);

			$scope.$watch('model.format', function(){
				setDateFormat($scope.model.format);
			})

			function inputChanged(e) {
				if (e.date) ngModel.$setViewValue(e.date.toDate());
				else ngModel.$setViewValue(null);
				ngModel.$setValidity("", true);
				$scope.svyServoyapi.apply('dataProviderID');
			}

			// when model change, update our view, set the date in the datepicker
			ngModel.$render = function() {
				try {
					$element.off("dp.change",inputChanged);
					var x = child.data('DateTimePicker');
					if (x && !$scope.model.findmode) x.date(angular.isDefined(ngModel.$viewValue) ? ngModel.$viewValue : null); // set default date for widget open; turn undefined to null as well (undefined gives exception)
					else {
						// in find mode 
						child.children("input").val(ngModel.$viewValue);
					}
				} finally {
					$element.on("dp.change",inputChanged);
				}
			};

			var dateFormat = 'YYYY-MM-DD';

			// helper function
			function setDateFormat(format){
				if(format && format.display){
					dateFormat = moment().toMomentFormatString(format.display);
				}
				var x = child.data('DateTimePicker');
				if (angular.isDefined(x)) { // can be undefined in find mode
					x.format(dateFormat);
					try {
						$element.off("dp.change",inputChanged);
						x.date(angular.isDefined(ngModel.$viewValue) ? ngModel.$viewValue : null);
					}
					finally {
						$element.on("dp.change",inputChanged);
					}
				}
			}

			$element.on("dp.change",inputChanged);

			$element.on("dp.error",function(){
				if (child.children("input").val() !== '')
				{
					ngModel.$setValidity("", false);
					$scope.$digest();
				}	
			});
			
			$scope.api.requestFocus = function(mustExecuteOnFocusGainedMethod) {
				$element.find('input')[0].focus();
			}
			
			
			$scope.api.getWidth = $apifunctions.getWidth($element[0]);
			$scope.api.getHeight = $apifunctions.getHeight($element[0]);
			$scope.api.getLocationX = $apifunctions.getX($element[0]);
			$scope.api.getLocationY = $apifunctions.getY($element[0]);

			var element = $element.children().first();
			var inputElement = element.children().first();
			
			var isAnchored = $element.parent().hasClass('svy-wrapper');
			
			Object.defineProperty($scope.model, $sabloConstants.modelChangeNotifier, {
				configurable : true,
				value : function(property, value) {
					switch (property) {
					case "size":
						if (isAnchored) {
							console.log(property + " - " + value.height);
							$svyProperties.setCssProperty(inputElement, "height", value.height);
						}
						break;
					}
				}
			});
			var destroyListenerUnreg = $scope.$on("$destroy", function() {
				destroyListenerUnreg();
				delete $scope.model[$sabloConstants.modelChangeNotifier];
			});
			// data can already be here, if so call the modelChange function so
			// that it is initialized correctly.
			var modelChangFunction = $scope.model[$sabloConstants.modelChangeNotifier];
			for (var key in $scope.model) {
				modelChangFunction(key, $scope.model[key]);
			}
			
		},
		templateUrl: 'bootstrapcomponents/calendar/calendar.html'
	};
})
