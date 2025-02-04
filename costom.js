var errorElem = [];
$(function() {
	 $('.selectpicker').selectpicker({
		liveSearch: true,
	});
	var login_type = getParam("login_type");
	if(login_type!=''){
		openLoginPage(Base64.decode(login_type));
	}
	$("#demo3").bootstrapNews({
		newsPerPage: 3,
		autoplay: false,

		onToDo: function () {
			//console.log(this);
		}
	});

	if($('.date').val()==""){
		$('.date').datepicker({dateFormat: 'dd-mm-yy'}).datepicker('setDate', new Date());
	}else{
		$('.date').datepicker({dateFormat: 'dd-mm-yy'});
	}
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		showMsgModel(jqxhr.statusText+' ( '+jqxhr.status+' )',jqxhr.responseText,'large');
	});
	$( document ).ajaxStart(function() {
	 $('body').css({'cursor' : 'wait'});
	}).ajaxComplete(function() {
	   $('body').css({'cursor' : 'default'});
	});
	$( "form#result-search-panal" ).submit(function( e ) {
		e.preventDefault();
		$($('form#result-search-panal').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-result-details",
				dataType:'json',
				data:$( "form#result-search-panal" ).serialize(),
				async : false,
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#resultDetails_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#resultDetails_view').html(data.html);
						$('.preloader').removeClass('');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
	});

	$( "form#admit-card-search-panal" ).submit(function( e ) {
		e.preventDefault();
		$($('form#admit-card-search-panal').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-admit-card-details",
				dataType:'json',
				data:$( "form#admit-card-search-panal" ).serialize(),
				async : false,
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#details_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#details_view').html(data.html);
						$('.preloader').removeClass('hide');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
	});
	$('.page-body').removeClass('hide');
});

postLogin = function(){
	if($('#username').val() == ""){
		errorElem.push("username");
	}
	if($('#password').val() == ""){
		errorElem.push("password");
	}
	if($('#captcha-form').val() == ""){
		errorElem.push("captcha-form");
	}
	if(errorElem.length > 0){
		errorBlock();
		return false;
	}else{
		$.ajax({
			type: "POST",
			url: base_url+"checkLogin",
			data: $('#login').serialize(),
			dataType:'json',
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success:function(data){
				$('.modal').modal('hide');
				if(data.status == true){
					window.location = data.intended_url;
				}else if (data.status == false) {
					showMsgModel("Error",data.message);
				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					showMsgModel("Error",errorString);
				}

			}
		});
	}
}
getMobileNo=function(){
	if($.trim($('#rollno').val()) == ""){
		 $("#otp-sent").removeClass("hide");
		 $('#otp-sent').addClass('alert alert-danger');
		 $('#otp-sent').html("Please Enter Roll No.");
		 $('#otp-sent').show();
		 $('#otp-sent').delay(5000).fadeOut();
		return false;
	}else{
		$.ajax({
			type: "GET",
			url: base_url+"get-mobile-no?rollno="+$('#rollno').val(),
			dataType:'json',
			beforeSend: function(){
				$('#get-mob-btn-login').attr("disabled","disabled");
				$('#get-mob-btn-login').html('<span id="loader" class="fa fa-refresh fa-spin"></span>');
				$('#otp-sent').addClass('hide');
				$('#otp-sent').html("");
				$('#otp-sent').removeClass('alert alert-success');
				$('#otp-sent').removeClass('alert alert-danger');
			},
			success:function(data){
				//$('.modal').modal('hide');
				if(data.status == true){
					$('#username').val(data.mobile);
					$("#username").prop("readonly", true);
					$("#otp-sent").addClass("hide");
					otpResendTimerCountDown( "get-mob-btn-login", "Wait for", "Get Mobile No",30);
				}else{
					$('#username').removeAttr('readonly');
					$('#username').val('');
					$("#otp-sent").removeClass("hide");
					$("#otp-sent").html(data.mobile);
					$('#otp-sent').addClass('alert alert-danger');
					$('#otp-sent').show();
					$('#otp-sent').delay(6000).fadeOut();
					otpResendTimerCountDown( "get-mob-btn-login", "Wait for", "Get Mobile No",10);
				}
			}
		});
	}

}
forgetPassword=function(id){
	$.ajax({
		type: "GET",
		url: base_url+"forget-password?id="+id,
		dataType:'json',
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.success == true){
				bootbox.dialog({
					title: data.label,
					message: data.html,
					closeButton: true
				});
				$('form#forget-password').find(':input').val('');
				$('form#forget-password').each(function(){
					$(this).find('input').keypress(function(e) {
						if(e.which == 13) {
							forgetPasswordSubmit();
						}
					});
				});

			}else{
				showMsgModel("Error","Something went wrong ! Try again later");
			}
		}
	});
}
userRegistration=function(){
	$.ajax({
		type: "GET",
		url: base_url+"user-registration",
		dataType:'json',
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.success == true){
				bootbox.dialog({
					title: data.label,
					message: data.html,
					closeButton: true
				});
				$("input, select, textarea").attr("autocomplete", "off");
				$('form#user-registration').each(function(){
					$(this).find('input').keypress(function(e) {
						if(e.which == 13) {
							registrationSubmit();
						}
					});
				});

			}else if(data.success == false){
				showMsgModel("Error",data.html);
			}else{
				showMsgModel("Error","Something went wrong ! Try again later");
			}
		}
	});
}

registrationSubmit=function(){
	if(checkFormRequiredField('user-registration',shm=false)==true){
		if($('#MOBILE_NO').val()!= "" && $('#MOBILE_VALIDATION').val()==1 && $('#mv').val()==0){
			errorElem.push("MOBILE_NO");
			$('#lmobi').html("<i style='color:red;' class='fa fa-times-circle fa-2x' aria-hidden='true'></i>");
			$('#lmobi').removeClass('hide');
		}
		if(errorElem.length > 0){
			errorBlock();
			return false;
		}
		$.ajax({
			type: "POST",
			url: base_url+"submit-user-registration",
			data: $('form#user-registration').serialize(),
			dataType:'json',
			beforeSend: function(){
				$('form#user-registration').find('.btn-success').attr('disabled', true);
				$('form#user-registration').find('.btn-success').html('<span class="fa fa-refresh fa-spin"></span>Loading..');
			},
			success:function(data){
				$('form#user-registration').find('.btn-success').attr('disabled', false);
				$('form#user-registration').find('.btn-success').html('<i class="fa fa-check"></i>Submit');
				if(data.status == true){
					$('form#user-registration').html(data.message);
				}else if (data.status == false) {
					bootbox.alert({
						title: 'Error',
						message:data.message,
						backdrop: true,
						size: ''
					});

				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					bootbox.alert({
						title: 'Error',
						message:errorString,
						backdrop: true,
						size: ''
					});
				}

			}
		});
	}
}


forgetPasswordSubmit=function(){
	if($('#username').val()=="" || ($('#EMAIL_ID').val()=="" && $('#MOBILE_NO').val()=="")){
		bootbox.alert({
			title: 'Warning',
			message:'Fill Username and at least one from the Email id or Mobile no to reset your Password',
			backdrop: true,
			size: ''
		});
		return false;
	}else if($('#EMAIL_ID').val()!="" && !isEmail($('#EMAIL_ID').val())){
		bootbox.alert({
			title: 'Warning',
			message:'Invalid Email Id.',
			backdrop: true,
			size: ''
		});
		return false;
	}else if($('#MOBILE_NO').val()!="" && $('#MOBILE_NO').val().length!=10){
		bootbox.alert({
			title: 'Warning',
			message:'Invalid Mobile No. Mobile No must be 10 digit.',
			backdrop: true,
			size: ''
		});
		return false;
	}else{
		$.ajax({
			type: "POST",
			url: base_url+"forget-password-submit",
			dataType:'json',
			data:$('form#forget-password').serialize(),
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success:function(data){
				$('.modal').modal('hide');
				if(data.status == true){
					showMsgModel("Success",data.message);
				}else if(data.status == false){
					bootbox.alert({
						title: 'Warning',
						message:data.message,
						backdrop: true,
						size: 'large'
					});
					return false;
				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					bootbox.alert({
						title: 'Error',
						message:errorString,
						backdrop: true,
						size: ''
					});
				}
			}
		});

	}
}

resendActivationCode=function(){
	$.ajax({
		type: "GET",
		url: base_url+"resend-activation-code",
		dataType:'json',
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.success == true){
				bootbox.dialog({
					title: data.label,
					message: data.html,
					closeButton: true
				});
				$('form#resend-activation').find(':input').val('');
				$("input, select, textarea").attr("autocomplete", "off");
				$('form#resend-activation').each(function(){
					$(this).find('input').keypress(function(e) {
						if(e.which == 13) {
							resendActivation();
						}
					});
				});

			}else if(data.success == false){
				showMsgModel("Error",data.html);
			}else{
				showMsgModel("Error","Something went wrong ! Try again later");
			}
		}
	});

}
resendActivation=function(){
	if(checkFormRequiredField('resend-activation',shm=false)==true){
		$.ajax({
			type: "POST",
			url: base_url+"submit-resend-activation",
			data: $('form#resend-activation').serialize(),
			dataType:'json',
			beforeSend: function(){
				$('form#resend-activation').find('.btn-success').attr('disabled', true);
				$('form#resend-activation').find('.btn-success').html('<span class="fa fa-refresh fa-spin"></span>Loading..');
			},
			success:function(data){
				$('form#resend-activation').find('.btn-success').attr('disabled', false);
				$('form#resend-activation').find('.btn-success').html('<i class="fa fa-check"></i>Submit');
				if(data.status == true){
					$('form#resend-activation').html(data.message);
				}else if (data.status == false) {
					bootbox.alert({
						title: 'Error',
						message:data.message,
						backdrop: true,
						size: ''
					});

				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					bootbox.alert({
						title: 'Error',
						message:errorString,
						backdrop: true,
						size: ''
					});
				}

			}
		});
	}
}
checkFormRequiredField=function(formName,shm=true){
	var allValid = true;
	input = $('form#'+formName).find(":input");
	$(input).each(function(index ,i) {
		if($(this).attr('name')!="_token"){
			if($('#' + $(this).attr('id')).hasClass('required') && $('#' + $(this).attr('id')).val()==""){
				errorElem.push($(this).attr('id'));
			}
		}
	});
	var sel= [];
	sel =$('form#'+formName).find(":selected");
	$(sel).each(function(index ,i) {
		if($(this).attr('name')!="_token"){
			if($('#' + $(this).attr('id')).hasClass('required') && $('#' + $(this).attr('id')).val()==""){
				errorElem.push($(this).attr('id'));
			}
		}
	});
	if(errorElem.length > 0){
		errorBlock();
		if(shm==true)
		showMsgModel("This is an warning message!","Please fill the required data to proceed Further.")
		allValid = false;
	}
	return allValid;
}
showMsgModel=function(title="",message="",size=""){
	$('.modal').modal('hide');
	bootbox.alert({
		title: title,
		message:message,
		backdrop: true,
		size: size
	});
}
getCourse=function(){
	if($('#coursetype').val()!="" && $('#coursetype').val()!=0){
		jQuery.ajax({
			type: 'POST',
			url: base_url+"get-course-wellcome",
			dataType:'json',
			data: {COURSETYPE:$('#coursetype').val(),all:$('#all').val()},
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(data.status==true){
					if(data.courseData !== null){
						var course_option = '<option value="">Select Course</option>';
						$.each(data.courseData, function(index, value) {
							if($('#FACULTY_ID_DATA').val()==index){
								course_option+='<option value="'+index+'" selected="true">'+value+'</option>';
							}else{
								course_option+='<option value="'+index+'">'+value+'</option>';
							}

						 });
						 $('#coursecd').html(course_option);
						 $('#coursecd').selectpicker({
							liveSearch: true,
						});
						 $('#coursecd').selectpicker('refresh');

					}
				}else if (data.status == false) {
					showMsgModel("Error",data.message);
				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					showMsgModel("Error",errorString);
				}

			}
		});
	}else{
		$('#coursecd').html("<option value=''>Select Course</option>"); $('#coursecd').selectpicker('refresh');
	}
}
/* Blank / empty Checking*/
errorBlock = function(){
	console.log(errorElem);
	$('.has-error').removeClass('has-error');

	if(errorElem.length > 0){
		for(var i = 0; i < errorElem.length; i++){
			$('#' + errorElem[i]).addClass('has-error');
			$('#' + errorElem[i]).parent('div').addClass('has-error');
			$('#' + errorElem[i]).parent().parent('.form-group').addClass('has-error');
			$('#' + errorElem[i]).parent('div').find("p").html("<i class='fa fa-warning'></i> This Filed is Required");
		}
		errorElem = [];
	}
}
checkForMobile=function(){
	if($('#MOBILE_NO').val()==''){
		$('#errorModelLabel').html('<span style="color:red">Warning</span>');
		$('#errorModelMsg').html("Please put your valid mobile number to verify .");
		$('#errorModel').modal('show');
		return false;
	}
	$('#lmobi').html('<img class="ajax_loader" src="images/ajax_loader.gif">');
	$('#lmobi').removeClass('hide');
	bootbox.confirm({
		title: "Confirm!",
		message: "Send OTP to the following Number.<br>"+$('#MOBILE_NO').val(),
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> Change Mobile Number'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Confirm'
			}
		},
		callback: function (re) {
			if(re==true){
				$.get( base_url+"validate-mobile?MOBILE_NO="+$('#MOBILE_NO').val(), function( data ) {
					if(data.status==true){
						var passCode= data.passcode;
						bootbox.prompt({
							title: "Please Put OTP Which is sent to Your Mobile Number Recently!",
							inputType: 'text',
							buttons: {
								cancel: {
									label: '<i class="fa fa-times"></i> Cancel'
								},
								confirm: {
									label: '<i class="fa fa-check"></i> Confirm'
								}
							},
							callback: function (result) {
								if(result==Base64.decode(passCode)){
									$('#mv').val('1');
									$("#MOBILE_NO").attr("readonly",true);
									$('#lmobi').html('<i style="color:green;" class="fa fa-check-circle fa-2x" aria-hidden="true"></i>');
									$('#lmobi').removeClass('hide');
								}else if( !!result && result!=Base64.decode(passCode)){
									$('#errorModelLabel').html('<span>Error</span>');
									$('#errorModelMsg').html("Invalid Pass code .Please Try Again.");
									$('#errorModel').modal('show');
									$('#lmobi').addClass('hide');
									$('#mv').val('0');
								}else{$('#lmobi').addClass('hide');$('#mv').val('0');}
							}
						});
					}else if(data.status==false){
						$('#errorModelLabel').html('<span>Error</span>');
						$('#errorModelMsg').html(data.msg);
						$('#errorModel').modal('show');
						$('#lmobi').addClass('hide');
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						$('#errorModelLabel').html('<span>Error</span>');
						$('#errorModelMsg').html(errorString);
						$('#errorModel').modal('show');
						$('#lmobi').addClass('hide');
					}
				});
			}else{
				$('#lmobi').addClass('hide');
				$('#MOBILE').val("");
			}
		}
	});
}
postLoginOTP=function(){
	if($('#username').val() == ""){
		errorElem.push("username");
	}
	if($('#password').val() == ""){
		errorElem.push("password");
	}
	if(errorElem.length > 0){
		errorBlock();
		return false;
	}else{
		$.ajax({
			type: "POST",
			url: base_url+"checkLogin-otp",
			data: $('#login').serialize(),
			dataType:'json',
			beforeSend: function(){
				$('#otp-sent').addClass('hide');
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success:function(data){
				$('.modal').modal('hide');
				if(data.status == true){
					window.location = data.intended_url;
				}else if (data.status == false) {
					showMsgModel("Error",data.message);
				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					showMsgModel("Error",errorString);
				}
			}
		});
	}
}
digits = function(obj, e, allowDecimal, allowNegative,allowAbesent=false){
		var key;
		var isCtrl = false;
		var keychar;
		var reg;

		if(window.event) {
			key = e.keyCode;
			isCtrl = window.event.ctrlKey
		}
		else if(e.which) {
			key = e.which;
			isCtrl = e.ctrlKey;
		}

		if (isNaN(key)) return true;

		keychar = String.fromCharCode(key);
	if(key==65 && allowAbesent){return true;}
	 // check for backspace or delete, or if Ctrl was pressed
	 if (key == 8 || isCtrl)
	 {
		return true;
	 }

	 reg = /\d/;
	 var isFirstN = allowNegative ? keychar == '-' && obj.value.indexOf('-') == -1 : false;
	 var isFirstD = allowDecimal ? keychar == '.' && obj.value.indexOf('.') == -1 : false;

	 return isFirstN || isFirstD || reg.test(keychar);
}
/*Email Validation*/
isEmail = function (email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

searchProvisional=function(){
		$($('form#result-search-panal').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-provisional-result-details",
				dataType:'json',
				data:$( "form#result-search-panal" ).serialize(),
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#resultDetails_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#resultDetails_view').html(data.html);
						$('.preloader').removeClass('hide');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
}

downlaodAppointment = function(id){

	$.ajax({
		type: "POST",
		url: base_url+"print-examiner-appointment",
		dataType:'json',
		data:$('#form_'+id).find(':input').serialize(),
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.status == true){
				showMsgModel(data.em_name,data.html,'large');
			}else if (data.status == false) {
				showMsgModel("Error",data.message);
			}else{
				var errorString = '<ul style="padding-left: 20px;">';
				$.each( data, function( key, value) {
					$.each( value, function( key1, value2) {
						errorString += '<li>' + value2 + '</li>';
					});

				});
				errorString += '</ul>';
				showMsgModel("Error",errorString);
			}
		}
	});

}

downlaodAppointmentExl = function(id){

	$.ajax({
		type: "POST",
		url: base_url+"print-examiner-appointment-exl",
		dataType:'json',
		data:$('#form_'+id).find(':input').serialize(),
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.status == true){
				showMsgModel(data.em_name,data.html,'large');
			}else if (data.status == false) {
				showMsgModel("Error",data.message);
			}else{
				var errorString = '<ul style="padding-left: 20px;">';
				$.each( data, function( key, value) {
					$.each( value, function( key1, value2) {
						errorString += '<li>' + value2 + '</li>';
					});

				});
				errorString += '</ul>';
				showMsgModel("Error",errorString);
			}
		}
	});

}

SearchExaminerData=function(){
	if($('#MOBILE_NO').hasClass('required') && ($('#MOBILE_NO').val() === null || $('#MOBILE_NO').val()=="")){
				errorElem.push($(this).attr("id"));
	}

	if(errorElem.length > 0){
		errorBlock();
		showMsgModel('This is an warning message!',"Please fill the required data to proceed .");
		return false;
	}else{
	jQuery.ajax({
		type: 'POST',
		url: base_url+"get-examiner-list-data",
		dataType:'json',
		data: {MOBILE_NO:$('#MOBILE_NO').val()},
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success: function(data) {

			$('.modal').modal('hide');
			if(data.status==true){
				$('#Examinerlist').html(data.html);

			}else{
				$('#Examinerlist').html("");
				if(!!data.message && data.message!="")
				showMsgModel("Error",data.message);
			}
		}

	});
}
}

searchPprppsDetails=function(){
	if($('#rollno').hasClass('required') && ($('#rollno').val() === null || $('#rollno').val()=="")){
				errorElem.push('rollno');
	}
	if($('#semester').hasClass('required') && ($('#semester').val() === null || $('#semester').val()=="")){
				errorElem.push('semester');
	}

	if(errorElem.length > 0){
		errorBlock();
		showMsgModel('This is an warning message!',"Please fill the required data to proceed .");
		return false;
	}else{
		jQuery.ajax({
			type: 'POST',
			url: base_url+"get-ppr-pps-details",
			dataType:'json',
			data: {rollno:$('#rollno').val(),SEMCODE:$('#semester').val()},
			beforeSend: function(){
				//var dialog = bootbox.dialog({
				//	message: '<p class="text-center">Please wait while we do something...</p>',
				//	closeButton: false
				//});
				$('.preloader').removeClass('hide');
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(data.status==true){
					$('#ppr-pps-Details_view').html(data.html);

				}else{
					$('#ppr-pps-Details_view').html("");
					if(!!data.message && data.message!="")
					showMsgModel("Error",data.message);
				}
			}

		});
	}
}

savePprppsDetails=function(){
	var counter = 0;
	$('.subjectsO').each(function(){
		if( $(this).is(':checked') ){
			counter = counter + 1;
		}
	});
	if(counter <=0){
		errorBlock();
		showMsgModel('This is an warning message!',"Please Select atleast One Subject to Proceed.");
		return false;
	}else{
		jQuery.ajax({
			type: 'POST',
			url: base_url+"save-ppr-pps-details",
			dataType:'json',
			data: $( "form#pprform" ).serialize(),
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(data.status==true){
						var dialog = bootbox.dialog({
						title:'Success',
						message: "Saved Successfully.",
						closeButton: false
					});
					dialog.init(function(){
						setTimeout(function(){
						//location.reload();
						searchPprppsDetails();
						},500);
					});
				}else{
					if(!!data.message && data.message!="")
					showMsgModel("Error",data.message);
				}
			}

		});
	}
}
searchSeprateSupplementaryDetails=function(){
	if($('#rollno').hasClass('required') && ($('#rollno').val() === null || $('#rollno').val()=="")){
				errorElem.push('rollno');
	}
	if($('#semester').hasClass('required') && ($('#semester').val() === null || $('#semester').val()=="")){
				errorElem.push('semester');
	}

	if(errorElem.length > 0){
		errorBlock();
		showMsgModel('This is an warning message!',"Please fill the required data to proceed .");
		return false;
	}else{
		jQuery.ajax({
			type: 'POST',
			url: base_url+"get-seprate-supplementary-details",
			dataType:'json',
			data: {rollno:$('#rollno').val(),SEMCODE:$('#semester').val()},
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(data.status==true){
					$('#seprate-supplementry-Details-view').html(data.html);

				}else{
					$('#Examinerlist').html("");
					if(!!data.message && data.message!="")
					showMsgModel("Error",data.message);
				}
			}

		});
	}
}
saveSeprateSuppelymentryDetails=function(){
	var counter = 0;
	$('.subjectsO').each(function(){
		if( $(this).is(':checked') ){
			counter = counter + 1;
		}
	});
	if(counter <=0){
		errorBlock();
		showMsgModel('This is an warning message!',"Please Select atleast One Subject to Proceed.");
		return false;
	}else{
		jQuery.ajax({
			type: 'POST',
			url: base_url+"save-seprate-suppelymentry-details",
			dataType:'json',
			data: $( "form#supplyForm" ).serialize(),
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(data.status==true){
					//showMsgModel("Success",data.message);
					var dialog = bootbox.dialog({
						title:'Success',
						message: "Saved Successfully.",
						closeButton: false
					});
					dialog.init(function(){
						setTimeout(function(){
						//location.reload();
						searchSeprateSupplementaryDetails();
						},500);
					});
				}else{
					if(!!data.message && data.message!="")
					showMsgModel("Error",data.message);
				}
			}

		});
	}
}

printPprppsDetails = function(){

	$.ajax({
		type: "POST",
		url: base_url+"print-ppr-pps-form",
		dataType:'json',
		data:$( "form#pprform" ).serialize(),
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.status == true){
				showMsgModel('Preview',data.html,'large');
			}else if (data.status == false) {
				showMsgModel("Error",data.message);
			}else{
				var errorString = '<ul style="padding-left: 20px;">';
				$.each( data, function( key, value) {
					$.each( value, function( key1, value2) {
						errorString += '<li>' + value2 + '</li>';
					});

				});
				errorString += '</ul>';
				showMsgModel("Error",errorString);
			}
		}
	});

}
function printConfirm()
{
	/* $('#print_data tr td:nth-child(5)').hide();
	$('#print_data tr th:nth-child(5)').hide(); */

	var divToPrint=document.getElementById('printDiv');
	newWin= window.open("");
	newWin.document.write(divToPrint.outerHTML);
	newWin.print();
	newWin.close();
	/* $('#print_data tr td:nth-child(5)').show();
	$('#print_data tr th:nth-child(5)').show(); */
}
printSeprateSupplyDetailsData = function(){

	$.ajax({
		type: "POST",
		url: base_url+"print-seprate-supplementary-details",
		dataType:'json',
		data:$( "form#supplyForm" ).serialize(),
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success:function(data){
			$('.modal').modal('hide');
			if(data.status == true){
				showMsgModel('Preview',data.html,'large');
			}else if (data.status == false) {
				showMsgModel("Error",data.message);
			}else{
				var errorString = '<ul style="padding-left: 20px;">';
				$.each( data, function( key, value) {
					$.each( value, function( key1, value2) {
						errorString += '<li>' + value2 + '</li>';
					});

				});
				errorString += '</ul>';
				showMsgModel("Error",errorString);
			}
		}
	});

}

searchAdmitCard=function(){
		$($('form#admit-card-search-panal').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-admit-card-details",
				dataType:'json',
				data:$( "form#admit-card-search-panal" ).serialize(),
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#details_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#details_view').html(data.html);
						$('.preloader').removeClass('hide');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
}

searchSupplyAdmitCard=function(){
		$($('form#get-supply-admit-card-details').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-supply-admit-card-details",
				dataType:'json',
				data:$( "form#admit-card-supply-panal" ).serialize(),
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#details_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#details_view').html(data.html);
						$('.preloader').removeClass('hide');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
}

//Registration label change according to Login as selection
registrationLabel=function(){
		if($('#LOGIN_AS').val()!= ""){
			$.ajax({
				type: "POST",
				url: base_url+"user-registration-label",
				data: {login_as:$('#LOGIN_AS').val()},
				dataType:'json',
				success:function(data){
					if(data.status == true){
						$('form#user-registration').find('#regs_lbl').html(data.label);
						$('form#user-registration').find('#re_regs_lbl').html('Re Enter '+data.label);
					}else{
						$('form#user-registration').find('#regs_lbl').html('');
						$('form#user-registration').find('#re_regs_lbl').html('');
					}
				}
			});
	}

}

searchRoutineDetails=function(){
		$($('form#routine-search-panal').find(":Input")).each(function(i,v){
			if($(this).hasClass('required') && ($(this).val() === null || $(this).val()=="")){
				errorElem.push($(this).attr("id"));
			}
		});
		if(errorElem.length > 0){
			errorBlock();
			showMsgModel('This is an warning message!',"Please fill the required data to procced .");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: base_url+"get-routine-details",
				dataType:'json',
				data:$( "form#routine-search-panal" ).serialize(),
				beforeSend: function(){
					var dialog = bootbox.dialog({
						message: '<p class="text-center">Please wait while we do something...</p>',
						closeButton: false
					});
					$('#routine_view').html("");
				},
				success:function(data){
					$('.modal').modal('hide');
					if(data.status == true){
						$('#routine_view').html(data.html);
						$('.preloader').removeClass('hide');
						window.oncontextmenu = function () {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
						document.onkeydown = function(e) {
						if (e.ctrlKey) {
							showMsgModel("Error",'Right Click and Input Facilities are disabled for security reason');
							return false;
						};
					};
					}else if (data.status == false) {
						showMsgModel("Error",data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						showMsgModel("Error",errorString);
					}
				}
			});
		}
}