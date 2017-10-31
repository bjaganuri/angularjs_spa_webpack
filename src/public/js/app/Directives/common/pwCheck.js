export const pwCheck = function(){
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			var firstPassword = attrs.pwCheck;
			$(elem).add(firstPassword).on('keyup', function () {
				scope.$apply(function () {
					ctrl.$setValidity('pwmatch', elem.val() === $('[name='+firstPassword+']').val());
				});
			});
		}
	}
}


export const checkUserChoiceAvailability = function(restDataService){
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			elem.add(attrs.checkUserChoiceAvailability).on('change', function () {
				scope.$apply(function () {
					var data = {};
					var valid = true;
					var key = "";
					data[attrs.name] = elem.val();
					for(key in ctrl.$validators){
						var res = ctrl.$validators[key].call(null , elem.val() , ctrl.$viewValue);
						if(res === false){
							valid = false;
							break;
						}
					}
					if(!ctrl.$isEmpty(elem.val()) && valid === true){
						restDataService.getData('/checkUserChoiceAvailability' , data , function(response){
							 ctrl.$setValidity('available', !response.data.status);
						});
					}
				});
			});
		}
	}
}