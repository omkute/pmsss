var errorElem = [];
(function() {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		if(jqxhr.status==422){
			var errors = $.parseJSON(jqxhr.responseText);
			var errorString = '<ul style="padding-left: 20px;">';
			$.each(errors, function (key, value) {
				if($.isPlainObject(value)) {
					$.each(value, function (key2, value2) { 
						errorString += '<li>' + value2 + '</li>';
					});
				}
			});
			errorString += '</ul>';	
			showMsgModel(jqxhr.statusText+' ( '+jqxhr.status+' )',errorString);
			$('.preloader').addClass('');
		}else{
			showMsgModel(jqxhr.statusText+' ( '+jqxhr.status+' )',jqxhr.responseText,'large');
		}
		$('#subbtn').attr('disabled',false);/*For Submit Button*/
		$('#subbtn').attr("aria-disabled",false);
		$('.btn-loader').attr("aria-disabled",false);
		$('.btn-loader').attr('disabled',false);/*For Submit Button*/
		$('.btn-loader').removeClass('disabled');
		$( ".btn-loader" ).each(function( index ) {
			$(this).html($(this).attr("p_html")); 
		});
		if(jqxhr.status!=422)
			$(".preloader").removeClass('hide');
	});
	$( document ).ajaxStart(function() {
		$('body').css({'cursor' : 'wait'});
	}).ajaxComplete(function() {
	   $('body').css({'cursor' : 'default'});
	});
	$("input , textarea, select").blur(function() {
		if($(this).val() !="") {
			$('#' + $(this).attr('id')).parent('div').parent('div').removeClass("has-warning");
			$('#' + $(this).attr('id')).parent('div').find("p").removeClass("fa fa-warning");
			$('#' + $(this).attr('id')).parent('div').parent('div').addClass("has-success");
			$('#' + $(this).attr('id')).parent('div').find("span").html("");
			$('#' + $(this).attr('id')).parent('div').find("p").html("");
			if ($(this).prop('type') == 'email'){
				if(!isEmail($(this).val())){
					$('#' + $(this).attr('id')).parent('div').find('span').html("Invalid Email Id.")
					$('#' + $(this).attr('id')).parent('div').parent('div').removeClass("has-success");
					$('#' + $(this).attr('id')).parent('div').parent('div').addClass("has-error");
				}
			}
		}else{
			if($('#' + $(this).attr('id')).hasClass('required')){
				$('#' + $(this).attr('id')).parent('div').addClass("has-warning");
			}
		}
	});
	$('.account-area').find('.dropdown').find('.padding-10').html('<i class="fa fa-calendar"></i></i>&nbsp;Session&nbsp; '+$('.subSess').html()+'<i class="fa fa-angle-down"></i>');

	/*Email Validation*/
	isEmail = function (email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
	/*End Email Validation*/
	//$('[data-toggle="tooltip"]').tooltip();
	$(".bg-sonic-silver").first().find('p').html($( ".breadcrumb li" ).last().html());
	$(".panel").first().find('.panel-heading:not(a)').not( ".dash" ).html($( ".breadcrumb li" ).last().html());
    var a, b, c, d, e, f, g;
    d = function(a, b) {
        var c, d, e, f;
        e = [];
        for (d in b.prototype) try {
            f = b.prototype[d], null == a[d] && "function" != typeof f ? e.push(a[d] = f) : e.push(void 0)
        } catch (g) {
            c = g
        }
        return e
    }, a = {}, null == a.options && (a.options = {}), c = {
        checks: {
            xhr: {
                url: function() {
                    return base_url+"favicon.ico?_=" + Math.floor(1e9 * Math.random())
                },
                timeout: 5e3
            },
            image: {
                url: function() {
                    return base_url+"favicon.ico?_=" + Math.floor(1e9 * Math.random())
                }
            },
            active: "xhr"
        },
        checkOnLoad: !1,
        interceptRequests: !0,
        reconnect: !0
    }, e = function(a, b) {
        var c, d, e, f, g, h;
        for (c = a, h = b.split("."), d = e = 0, f = h.length; f > e && (g = h[d], c = c[g], "object" == typeof c); d = ++e);
        return d === h.length - 1 ? c : void 0
    }, a.getOption = function(b) {
        var d, f;
        return f = null != (d = e(a.options, b)) ? d : e(c, b), "function" == typeof f ? f() : f
    }, "function" == typeof window.addEventListener && window.addEventListener("online", function() {
        return setTimeout(a.confirmUp, 100)
    }, !1), "function" == typeof window.addEventListener && window.addEventListener("offline", function() {
        return a.confirmDown()
    }, !1), a.state = "up", a.markUp = function() {
        return a.trigger("confirmed-up"), "up" !== a.state ? (a.state = "up", a.trigger("up")) : void 0
    }, a.markDown = function() {
        return a.trigger("confirmed-down"), "down" !== a.state ? (a.state = "down", a.trigger("down")) : void 0
    }, f = {}, a.on = function(b, c, d) {
        var e, g, h, i, j;
        if (g = b.split(" "), g.length > 1) {
            for (j = [], h = 0, i = g.length; i > h; h++) e = g[h], j.push(a.on(e, c, d));
            return j
        }
        return null == f[b] && (f[b] = []), f[b].push([d, c])
    }, a.off = function(a, b) {
        var c, d, e, g, h;
        if (null != f[a]) {
            if (b) {
                for (e = 0, h = []; e < f[a].length;) g = f[a][e], d = g[0], c = g[1], c === b ? h.push(f[a].splice(e, 1)) : h.push(e++);
                return h
            }
            return f[a] = []
        }
    }, a.trigger = function(a) {
        var b, c, d, e, g, h, i;
        if (null != f[a]) {
            for (g = f[a], i = [], d = 0, e = g.length; e > d; d++) h = g[d], b = h[0], c = h[1], i.push(c.call(b));
            return i
        }
    }, b = function(a, b, c) {
        var d, e, f, g, h;
        return h = function() {
            return a.status && a.status < 12e3 ? b() : c()
        }, null === a.onprogress ? (d = a.onerror, a.onerror = function() {
            return c(), "function" == typeof d ? d.apply(null, arguments) : void 0
        }, g = a.ontimeout, a.ontimeout = function() {
            return c(), "function" == typeof g ? g.apply(null, arguments) : void 0
        }, e = a.onload, a.onload = function() {
            return h(), "function" == typeof e ? e.apply(null, arguments) : void 0
        }) : (f = a.onreadystatechange, a.onreadystatechange = function() {
            return 4 === a.readyState ? h() : 0 === a.readyState && c(), "function" == typeof f ? f.apply(null, arguments) : void 0
        })
    }, a.checks = {}, a.checks.xhr = function() {
        var c, d;
        d = new XMLHttpRequest, d.offline = !1, d.open("HEAD", a.getOption("checks.xhr.url"), !0), null != d.timeout && (d.timeout = a.getOption("checks.xhr.timeout")), b(d, a.markUp, a.markDown);
        try {
            d.send()
        } catch (e) {
            c = e, a.markDown()
        }
        return d
    }, a.checks.image = function() {
        var b;
        return b = document.createElement("img"), b.onerror = a.markDown, b.onload = a.markUp, void(b.src = a.getOption("checks.image.url"))
    }, a.checks.down = a.markDown, a.checks.up = a.markUp, a.check = function() {
        return a.trigger("checking"), a.checks[a.getOption("checks.active")]()
    }, a.confirmUp = a.confirmDown = a.check, a.onXHR = function(a) {
        var b, c, e;
        return e = function(b, c) {
            var d;
            return d = b.open, b.open = function(e, f, g, h, i) {
                return a({
                    type: e,
                    url: f,
                    async: g,
                    flags: c,
                    user: h,
                    password: i,
                    xhr: b
                }), d.apply(b, arguments)
            }
        }, c = window.XMLHttpRequest, window.XMLHttpRequest = function(a) {
            var b, d, f;
            return f = new c(a), e(f, a), d = f.setRequestHeader, f.headers = {}, f.setRequestHeader = function(a, b) {
                return f.headers[a] = b, d.call(f, a, b)
            }, b = f.overrideMimeType, f.overrideMimeType = function(a) {
                return f.mimeType = a, b.call(f, a)
            }, f
        }, d(window.XMLHttpRequest, c), null != window.XDomainRequest ? (b = window.XDomainRequest, window.XDomainRequest = function() {
            var a;
            return a = new b, e(a), a
        }, d(window.XDomainRequest, b)) : void 0
    }, g = function() {
        return a.getOption("interceptRequests") && a.onXHR(function(c) {
            var d;
            return d = c.xhr, d.offline !== !1 ? b(d, a.markUp, a.confirmDown) : void 0
        }), a.getOption("checkOnLoad") ? a.check() : void 0
    }, setTimeout(g, 0), window.Offline = a
}).call(this),
    function() {
        var a, b, c, d, e, f, g, h, i;
        if (!window.Offline) throw new Error("Offline Reconnect brought in without offline.js");
        d = Offline.reconnect = {}, f = null, e = function() {
            var a;
            return null != d.state && "inactive" !== d.state && Offline.trigger("reconnect:stopped"), d.state = "inactive", d.remaining = d.delay = null != (a = Offline.getOption("reconnect.initialDelay")) ? a : 3
        }, b = function() {
            var a, b;
            return a = null != (b = Offline.getOption("reconnect.delay")) ? b : Math.min(Math.ceil(1.5 * d.delay), 3600), d.remaining = d.delay = a
        }, g = function() {
            return "connecting" !== d.state ? (d.remaining -= 1, Offline.trigger("reconnect:tick"), 0 === d.remaining ? h() : void 0) : void 0
        }, h = function() {
            return "waiting" === d.state ? (Offline.trigger("reconnect:connecting"), d.state = "connecting", Offline.check()) : void 0
        }, a = function() {
            return Offline.getOption("reconnect") ? (e(), d.state = "waiting", Offline.trigger("reconnect:started"), f = setInterval(g, 1e3)) : void 0
        }, i = function() {
            return null != f && clearInterval(f), e()
        }, c = function() {
            return Offline.getOption("reconnect") && "connecting" === d.state ? (Offline.trigger("reconnect:failure"), d.state = "waiting", b()) : void 0
        }, d.tryNow = h, e(), Offline.on("down", a), Offline.on("confirmed-down", c), Offline.on("up", i)
    }.call(this),
    function() {
        var a, b, c, d, e, f;
        if (!window.Offline) throw new Error("Requests module brought in without offline.js");
        c = [], f = !1, d = function(a) {
            return Offline.trigger("requests:capture"), "down" !== Offline.state && (f = !0), c.push(a)
        }, e = function(a) {
            var b, c, d, e, f, g, h, i, j;
            j = a.xhr, g = a.url, f = a.type, h = a.user, d = a.password, b = a.body, j.abort(), j.open(f, g, !0, h, d), e = j.headers;
            for (c in e) i = e[c], j.setRequestHeader(c, i);
            return j.mimeType && j.overrideMimeType(j.mimeType), j.send(b)
        }, a = function() {
            return c = []
        }, b = function() {
            var b, d, f, g, h, i;
            for (Offline.trigger("requests:flush"), h = {}, b = 0, f = c.length; f > b; b++) g = c[b], i = g.url.replace(/(\?|&)_=[0-9]+/, function(a, b) {
                return "?" === b ? b : ""
            }), h[g.type.toUpperCase() + " - " + i] = g;
            for (d in h) g = h[d], e(g);
            return a()
        }, setTimeout(function() {
            return Offline.getOption("requests") !== !1 ? (Offline.on("confirmed-up", function() {
                return f ? (f = !1, a()) : void 0
            }), Offline.on("up", b), Offline.on("down", function() {
                return f = !1
            }), Offline.onXHR(function(a) {
                var b, c, e, f, g;
                return g = a.xhr, e = a.async, g.offline !== !1 && (f = function() {
                    return d(a)
                }, c = g.send, g.send = function(b) {
                    return a.body = b, c.apply(g, arguments)
                }, e) ? null === g.onprogress ? (g.addEventListener("error", f, !1), g.addEventListener("timeout", f, !1)) : (b = g.onreadystatechange, g.onreadystatechange = function() {
                    return 0 === g.readyState ? f() : 4 === g.readyState && (0 === g.status || g.status >= 12e3) && f(), "function" == typeof b ? b.apply(null, arguments) : void 0
                }) : void 0
            }), Offline.requests = {
                flush: b,
                clear: a
            }) : void 0
        }, 0)
    }.call(this),
    function() {
        var a, b, c, d, e;
        if (!Offline) throw new Error("Offline simulate brought in without offline.js");
        for (d = ["up", "down"], b = 0, c = d.length; c > b; b++) e = d[b], (document.querySelector("script[data-simulate='" + e + "']") || localStorage.OFFLINE_SIMULATE === e) && (null == Offline.options && (Offline.options = {}), null == (a = Offline.options).checks && (a.checks = {}), Offline.options.checks.active = e)
    }.call(this),
    function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m;
        if (!window.Offline) throw new Error("Offline UI brought in without offline.js");
        b = '<div class="offline-ui"><div class="offline-ui-content">   No Internet Connection.</div></div>', a = '<a href class="offline-ui-retry"></a>', f = function(a) {
            var b;
            return b = document.createElement("div"), b.innerHTML = a, b.children[0]
        }, g = e = null, d = function(a) {
            return k(a), g.className += " " + a
        }, k = function(a) {
            return g.className = g.className.replace(new RegExp("(^| )" + a.split(" ").join("|") + "( |$)", "gi"), " ")
        }, i = {}, h = function(a, b) {
            return d(a), null != i[a] && clearTimeout(i[a]), i[a] = setTimeout(function() {
                return k(a), delete i[a]
            }, 1e3 * b)
        }, m = function(a) {
            var b, c, d, e;
            d = {
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1
            };
            for (c in d)
                if (b = d[c], a >= b) return e = Math.floor(a / b), [e, c];
            return ["now", ""]
        }, l = function() {
            var c, h;
            return g = f(b), document.body.appendChild(g), null != Offline.reconnect && Offline.getOption("reconnect") && (g.appendChild(f(a)), c = g.querySelector(".offline-ui-retry"), h = function(a) {
                return a.preventDefault(), Offline.reconnect.tryNow()
            }, null != c.addEventListener ? c.addEventListener("click", h, !1) : c.attachEvent("click", h)), d("offline-ui-" + Offline.state), e = g.querySelector(".offline-ui-content")
        }, j = function() {
            return l(), Offline.on("up", function() {
                return k("offline-ui-down"), d("offline-ui-up"), h("offline-ui-up-2s", 2), h("offline-ui-up-5s", 5)
            }), Offline.on("down", function() {
                return k("offline-ui-up"), d("offline-ui-down"), h("offline-ui-down-2s", 2), h("offline-ui-down-5s", 5)
            }), Offline.on("reconnect:connecting", function() {
                return d("offline-ui-connecting"), k("offline-ui-waiting")
            }), Offline.on("reconnect:tick", function() {
                var a, b, c;
                return d("offline-ui-waiting"), k("offline-ui-connecting"), a = m(Offline.reconnect.remaining), b = a[0], c = a[1], e.setAttribute("data-retry-in-value", b), e.setAttribute("data-retry-in-unit", c)
            }), Offline.on("reconnect:stopped", function() {
                return k("offline-ui-connecting offline-ui-waiting"), e.setAttribute("data-retry-in-value", null), e.setAttribute("data-retry-in-unit", null)
            }), Offline.on("reconnect:failure", function() {
                return h("offline-ui-reconnect-failed-2s", 2), h("offline-ui-reconnect-failed-5s", 5)
            }), Offline.on("reconnect:success", function() {
                return h("offline-ui-reconnect-succeeded-2s", 2), h("offline-ui-reconnect-succeeded-5s", 5)
            })
        }, "complete" === document.readyState ? j() : null != document.addEventListener ? document.addEventListener("DOMContentLoaded", j, !1) : (c = document.onreadystatechange, document.onreadystatechange = function() {
            return "complete" === document.readyState && j(), "function" == typeof c ? c.apply(null, arguments) : void 0
        })
    }.call(this);
	
dynamicQueryLoad=function(funName="",pageId="",showFieldId="",SelectValueFiled=""){
	var fieldId=showFieldId;
	$('#'+fieldId).selectpicker('destroy');
	if(funName!="" && pageId!=""){
		jQuery.ajax({
			type: 'POST',
			url: base_url+"populate-dynamic-query?funName="+funName,
			dataType:'json',
			async : false,
			data: $('#'+pageId).serialize(),
			beforeSend: function(){
				var dialog = bootbox.dialog({
					message: '<p class="text-center">Please wait while we do something...</p>',
					closeButton: false
				});
			},
			success: function(data) {
				$('.modal').modal('hide');
				if(!!data && data.success==true){
					if(fieldId=="" && !!data.fieldId && data.fieldId!=''){
						fieldId=data.fieldId;
					}
					if(!!data.fieldType && data.fieldType=="101"){
						if(!!data.allData &&data.allData !== null){
							var _option = '<option value="">-- Select --</option>';
							$.each(data.allData, function(index, value) {
								if(SelectValueFiled!="" && $('#'+SelectValueFiled).val()==index){
									_option+='<option value="'+index+'" selected="true">'+value+'</option>';
								}else{
									_option+='<option value="'+index+'">'+value+'</option>';
								}
							});
							$('#'+fieldId).html(_option);
							$('#'+fieldId).selectpicker({
							  liveSearch: true,
							});
							$('#'+fieldId).selectpicker('refresh');
						}
					}else if(!!data.fieldType && data.fieldType=="102"){
						if(fieldId=="" && !!data.fieldId && data.fieldId!=''){
							fieldId=data.fieldId;
						}
						if(!!data.singleData && data.singleData !== null)
							$('#'+fieldId).val(singleData);
					}else{
						bootbox.alert({
						title: "Warning",
							message:"Set Filed Type.",
						});
					}
				}else if(data.success==false){
					if(fieldId=="" && !!data.fieldId && data.fieldId!=''){
						fieldId=data.fieldId;
					}
					$('#'+fieldId).html('<option value="">-- Select --</option>');
				}else{
					var errorString = '<ul style="padding-left: 20px;">';
					$.each( data, function( key, value) {
						$.each( value, function( key1, value2) {
							errorString += '<li>' + value2 + '</li>';
						});

					});
					errorString += '</ul>';
					showMsgModel("Error",errorString);
					$('#'+fieldId).html('<option value="">-- Select --</option>');
				}
			},
			error:function(xhr, textStatus, error) {
				$('#'+fieldId).html('<option value="">-- Select --</option>');
				bootbox.alert({
					title: xhr.statusText+' ( '+xhr.status+' )',
					message:xhr.responseText,
				});

			}
		});
	}
}

	/*for decode / encode */
	var Base64 = {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		encode: function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;

			input = Base64._utf8_encode(input);

			while (i < input.length) {

				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

			}

			return output;
		},


		decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			while (i < input.length) {

				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

			}

			output = Base64._utf8_decode(output);

			return output;

		},

		_utf8_encode: function(string) {
			if(typeof string === 'string') {
				string = string.replace(/\r\n/g, "\n");
			}
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		},

		_utf8_decode: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;

			while (i < utftext.length) {

				c = utftext.charCodeAt(i);

				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}

			}

			return string;
		}

	}
deleteFun=function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to delete this "+$(data).attr('data-msg'),
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/deleteData",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id')},
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
							$('.tabref').click();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
deleteFunWithoutPer=function(data){
	
	bootbox.confirm({
		message: "Are You Sure You Want to delete this?  "+$(data).attr('data-msg'), 
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/deleteDataWithoutPer",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id')},
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
							$('.tabref').click();
							location.reload();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}

sendOtp=function(fromId='login',typ=""){
	username_mobile = $('#username').val();
	var phoneLength = $("#username").val().length;
	if (username_mobile == "") {
		$('#username').closest('.form-group').addClass('has-error');
		$('#username').parent('.form-group').find('p').html('Please enter phone number');
		return false;
	}else if ($.isNumeric(username_mobile)) {
		if ((/^[789]\d{9}$/.test(username_mobile)) == false) {
			$('#username').closest('.form-group').addClass('has-error');
			$('#username').parent('.form-group').find('p').html('Please enter a valid phone number');
			return false;
		}else {
			$.ajax({
				url: base_url+"send-otp"+typ,
				type:"POST",
				data:{mobile_number: username_mobile},
				beforeSend: function(){
					$('#get-otp-btn-login').attr("disabled","disabled");
					$('#get-otp-btn-login').html('<span id="loader" class="fa fa-refresh fa-spin"></span>');
					$('#otp-sent').addClass('hide');
					$('#otp-sent').html("");
					$('#otp-sent').removeClass('alert alert-success');
					$('#otp-sent').removeClass('alert alert-danger');

				},
				success: function(data){
					$('#get-otp-btn-login').attr("disabled",false);
					$('#get-otp-btn-login').html('Get OTP');
					if(data.status==true){
						$('#otp-sent').removeClass('hide');
						$('#otp-sent').addClass('alert alert-success');
						$("#otp-sent").html(data.msg);
						$('#otp-sent').show();
						$('#otp-sent').delay(10000).fadeOut();
						otpResendTimerCountDown( "get-otp-btn-login", "Wait for", "Get OTP",60);
					}else if (data.status == false) {
						bootbox.alert(data.message);
					}else{
						var errorString = '<ul style="padding-left: 20px;">';
						$.each( data, function( key, value) {
							$.each( value, function( key1, value2) {
								errorString += '<li>' + value2 + '</li>';
							});

						});
						errorString += '</ul>';
						bootbox.alert(errorString);
					}
				}
			});
		}
	}else{
		$('#username').closest('.form-group').addClass('has-error');
		$('#username').parent('.form-group').find('p').html('Please enter a valid phone number');
		return false;
	}
}
otpResendTimerCountDown=function(button, message, label="", i=60) {
    $("#" + button).attr("disabled","disabled");
    timer = new Timer(function() {
        var zeroApend = '';
        if (i.toString().length == 1) {
            zeroApend = "0";
        }
        if(i>0){
            $("#" + button).html(message + " " + zeroApend + "" + i + " sec");
        }
        else if (i == 0) {
			$("#" + button).attr("disabled",false);
            $("#" + button).html(label);
            timer.stop();
        }
        i--;
    }, 1000);
}

 Timer=function(fn, t) {
    var timerObj = setInterval(fn, t);
    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}
deleteFunctionFild=function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to delete this "+$(data).attr('data-msg'),
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/deleteDataCode",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id'),dataFild:$(data).attr('data-filed-delete')},
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
							$('.tabref').click();
							showMsgModel("Warning",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
restoreDeleteData=function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to Restore this "+$(data).attr('data-msg'),
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/restore-deleteData",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id')},
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
							$('.tabrefres').click();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
restoreDeleteDataCode =function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to Restore this "+$(data).attr('data-msg'),
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/restore-deleteDataCode",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id'),dataFild:$(data).attr('data-filed-delete')},
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
							$('.tabrefres').click();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
forceDeleteData=function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to Delete this "+$(data).attr('data-msg')+" Permanently ?",
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/force-deleteData",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id')},
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
							$('.tabrefres').click();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
forceDeleteDataCode=function(data){
	bootbox.confirm({
		message: "Are You Sure You Want to Delete this "+$(data).attr('data-msg')+" Permanently ?",
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				$.ajax({
					type: "POST",
					url:base_url+"admin/force-deleteDataCode",
					data: {id:$(data).attr('data-id-delete'),table:$(data).attr('data-id'),dataFild:$(data).attr('data-filed-delete')},
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
							$('.tabrefres').click();
							showMsgModel("This is an Success message!",data.msg);
							var a = data.callTable;
							if(a!="")
							window[a]();
						}else if (data.status == false) {
							showMsgModel("Error",data.msg);
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
	});
}
changeSession = function(sessID){
	jQuery.ajax({
		type: 'POST',
		url: base_url+"set-session",
		dataType:'json',
		data: {sessID:sessID},
		beforeSend: function(){
			var dialog = bootbox.dialog({
				message: '<p class="text-center">Please wait while we do something...</p>',
				closeButton: false
			});
		},
		success: function(data) {
			$('.modal').modal('hide');
			if(data.status==true){
				location.reload();
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
var Password = {

  _pattern : /[A-Z]/,


  _getRandomByte : function()
  {
    // http://caniuse.com/#feat=getrandomvalues
    if(window.crypto && window.crypto.getRandomValues)
    {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    else if(window.msCrypto && window.msCrypto.getRandomValues)
    {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    }
    else
    {
      return Math.floor(Math.random() * 256);
    }
  },

  generate : function(length)
  {
    return Array.apply(null, {'length': length})
      .map(function()
      {
        var result;
        while(true)
        {
          result = String.fromCharCode(this._getRandomByte());
          if(this._pattern.test(result))
          {
            return result;
          }
        }
      }, this)
      .join('');
  }

};
preEnrolmentSubmit = function(){
	$.getScript(base_url+'/js/enrolment.js');
	$('#pswgenerate').click();
	$('#enrolMent').removeClass('hide');
	if($('#edit').val()=='y'){
		$('#semester').trigger("change");
		$('#edit_mode').click();
		$.getScript(base_url+'/js/enrolment.js', function(){
			enrolmentSubmit();
			$('#enroll_1').find('a').click();
		});
	}
}
getParam = function(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(window.location.href);
	if(results == null)
		return "";
	else
		return results[1];
}
getOnPageJsperReports=function(){
	//$('form#jsperReports').find(":Input").val("");
	$($('form#jsperReports').find(":Input")).each(function(i,v){
		if($(this).hasClass('re')){
			$(this).val($('#'+$(this).attr("data-replace-id")).val());
		}
	});
	$($('form#jsperReports').find(":Input")).each(function(i,v){
		if($(this).hasClass('re') && ($(this).val() === null || $(this).val()=="")){
			errorElem.push($(this).attr("data-replace-id"));
		}
	});
	if(errorElem.length > 0){
		errorBlock();
		showMsgModel("This is an warning message!","Please fill the required data to procced Further.")
		return false;
	}else{
		getjsperReports();
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
			if($(this).prop('type') == 'email' && !isEmail($(this).val())){
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
assigntranslater=function(type="hi"){
	if(type="hi"){
		google.load("elements", "1", {
			packages: "transliteration",
			callback: onLoad
		});
	}
	if(type="mh"){
		google.load("elements", "1", {
			packages: "transliteration",
			callback: onLoadMH
		});
	}
        
}
function onLoad() {
    var input=[];
    $($('.translat').find(':input')).each(function(index ,i) {
        input.push($(this).attr('id'));
    });
    var options = {
        sourceLanguage:
            google.elements.transliteration.LanguageCode.ENGLISH,
        destinationLanguage:
            [google.elements.transliteration.LanguageCode.HINDI],
        shortcutKey: 'ctrl+g',
        transliterationEnabled: true
    };

    var control =
        new google.elements.transliteration.TransliterationControl(options);

    control.makeTransliteratable(input);
}
function onLoadMH() {
    var input=[];
    $($('.translatMH').find(':input')).each(function(index ,i) {
        input.push($(this).attr('id'));
    });
    var options = {
        sourceLanguage:
            google.elements.transliteration.LanguageCode.ENGLISH,
        destinationLanguage:
            [google.elements.transliteration.LanguageCode.MARATHI],
        shortcutKey: 'ctrl+g',
        transliterationEnabled: true
    };
 
    var control =
        new google.elements.transliteration.TransliterationControl(options);

    control.makeTransliteratable(input);
}

function defineIsAuth(user, newOptions = {}){
    let options = {
        texts: {
            placeholder:"Type Your Password",
            wrong:"Wrong Password",
            error:"Error",
            button:"Login"
        },
        loginField: 'username'
    };
    $.extend(options, newOptions);
    let object={
        posterror:function(){
            swal({
                title:options.texts.error,
                icon:"error"
            });
        },
        object:this,
        csrf:null,
        isAuth:function(callback){
            $.get(base_url+"isAuth").done(function (data) {
                if(data.csrf!==object.csrf) object.update_csrf(data.csrf);
                if (data.logged) {
                    if (callback) callback();
                }else{
					object.askPassword(callback);
                }
            }).fail(function () {
                object.posterror();
            });
        },
        askPassword:function(callback){
			if (typeof loginCheckInt !== 'undefined'){
				clearInterval(loginCheckInt);
			}
			swal({
                title: user.name,
                icon:user.photo,
                content: {
                    element: "input",
                    attributes: {
                        placeholder: options.texts.placeholder,
                        type: "password"
                    },
                },
                button: {
                    text: options.texts.button,
                    closeModal: false,
                }
            })
			.then(password => {
				if(password){
					$.post(base_url+"ajaxlogin",
						{
							username:user[options.loginField],
							password,
							loginField: options.loginField
						}
					).done(data=> {
						if(data.logged){
							swal.stopLoading();
							swal.close();
							if (callback) callback();
						}else{
							swal({
								title:options.texts.wrong,
								icon:"warning",
								buttons: {
								retry: {
								  text: "Retry",
								  value: "retry",
								},
								back: {
								  text: "Back To Home Page",
								  value: "back",
								  className:"btn-danger"
								},
							  }
							  
							}).then((value) => {
								  switch (value) {
									case "back":
									  window.location=base_url;
									  break;
								 
									case "retry":
										auth.isAuth(function(){
										});
									  break;
								 
									default:
									  
								  }
							});
						}
					}).fail(function () {
						object.posterror();
					});
				}else{
					swal.close();
					window.location=base_url;
				}
			});
        },
        update_csrf:function(newcsrf){
            object.csrf=newcsrf;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': newcsrf
                }
            });
            $("input[name='_token']").val(newcsrf);
        }
    };
    object.update_csrf($('meta[name="csrf-token"]').attr('content'));
    return object;
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
			if($('#' + errorElem[i]).attr('type')=="checkbox"){
				$('#' + errorElem[i]).parent().parent('div').find("p").html("<i class='fa fa-warning'></i> This Filed is Required");
			}
		}
		errorElem = [];
	}
}
