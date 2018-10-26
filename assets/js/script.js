var nem = require("nem-sdk").default;


$("#generateBut").click(function () {

	var d = new Date();

	var idNEMadd = $('#idNEMadd').val();
	var idURL = '"url":"' + $('#idURL').val() + '",';
	var idTitle = '"title":"' +$('#idTitle').val() + '",';
	var idAuthors = '"authors":"' +$('#idAuthors').val() + '",';
	var idPublisher = '"publisher":"' +$('#idPublisher').val()+ '",';
	var idYear = '"year":"' +$('#idYear').val()+ '",';
	var idVol = '"vol":"' +$('#idVol').val()+ '",';
	var idIssue = '"issue":"' +$('#idIssue').val()+ '",';
	var idPages = '"pages":"' +$('#idPages').val()+ '" ';


	var jsonObj =  '{"BOI":"yes", '+  idURL + idTitle + idAuthors+ idPublisher + idYear + idVol + idIssue + idPages +'}';

	var BOIlink = $('#idPublisher').val().substring(0, 8)+  '.' + idNEMadd.substring(0, 5) + '/' + d.getTime();

	var pathname = window.location.href;

	alert(BOIlink);
	var pointerAdd = getPointerAccount(BOIlink);

	$('#idJsonMsg').val(jsonObj);
	$('#idYourNEMadd').val(idNEMadd);
	$('#boiLink').val(pathname + '?boi=' +BOIlink);
	$('#boiNEMadd').val(pointerAdd);


});


function getPointerAccount(BOIlink) {

	var passphrase = nem.crypto.js.SHA256(BOIlink);

	var privateKey = nem.crypto.helpers.derivePassSha(passphrase, 1).priv;

	var keyPair = nem.crypto.keyPair.create(privateKey);

	var publicKey = keyPair.publicKey.toString();

	var address = nem.model.address.toAddress(publicKey, nem.model.network.data.mainnet.id);

	return address;

}


$("input[type='text']").on("click", function () {
	$(this).select();
});

// from url
var urls = getParameterByName('boi');
var json = getParameterByName('json');
var owner = getParameterByName('owner');


if (urls !== null) {


	var BOIlink = urls;

	var pointerAcc = getPointerAccount(BOIlink);


	if (json !== null) {
		getdata(pointerAcc,2);
	} else if(owner !== null ){
		getdata(pointerAcc,3);
	} else {
		getdata(pointerAcc,1);
	}
	

}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}







function getdata(pointerAcc,typeRe) {

	var dataRequest = "https://shibuya.supernode.me:7891/account/transfers/incoming?address=" + pointerAcc;


	var jqxhr = $.getJSON(dataRequest, function () {

	})
		.done(function (data) {

			var stop = 0;
			var ownerAdd;

			// Find BOI owner
			$.each(data['data'], function (index, value) {


					var payload = convertFromHex(value['transaction']['message']['payload']);
					var objPayload = jQuery.parseJSON(payload);
					if (objPayload['BOI'] == 'yes' && stop == 0) {

						ownerAdd = nem.model.address.toAddress(value['transaction']['signer'], nem.model.network.data.mainnet.id);

					}

			});

			// Find BOI data
			$.each(data['data'], function (index, value) {


				if (nem.model.address.toAddress(value['transaction']['signer'], nem.model.network.data.mainnet.id) == ownerAdd) {


					var payload = convertFromHex(value['transaction']['message']['payload']);
					var objPayload = jQuery.parseJSON(payload);
					if (objPayload['BOI'] == 'yes' && stop == 0) {

						stop = 1;

						if (typeRe == 1) { window.location = '' + objPayload['url'] };
						if (typeRe == 2) { 

							var newDoc = document.open("text/html", "replace");
							newDoc.write(payload);
							newDoc.close();
							
							//alert(payload); 
						};
						if (typeRe == 3) { 

							var newDoc = document.open("text/html", "replace");
							newDoc.write('{"owner":"'+ ownerAdd + '"}');
							newDoc.close();
							
							//alert(payload); 
						};

					}

				}

			});


			if (stop == 0) {

				alert('Could not find BOI');
			}


		})
		.fail(function () {
			console.log("error");
			alert('Could not find BOI');
		})
		.always(function () {
			console.log("complete");
		});





};

function convertFromHex(hex) {
	var hex = hex.toString();//force conversion
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}



