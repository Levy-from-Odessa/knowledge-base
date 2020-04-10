$(document).ready(function () {
	let items = convetToObject($('.items').val().split(","))
	let binds = $('.binds').val().split(",")
	let connections = convetToObject($('.connections').val().split(","))
	let base = Object.assign(items, connections)
	$('.items').on('change', function () {
		items = convetToObject($('.items').val().split(","))
	})
	function convetToObject(arr) {
		let object = {}
		for (let i = 0; i < arr.length; i++) {
			item = arr[i].split(':')
			let key = parseInt(item[0])
			if (key) {
				object[key] = item[1]
			}
		}
		return object
	}
	let allBind = []
	for (let i = 0; i < binds.length; i++) {
		allBind.push(binds[i].split(':'))
	}
	function filterArray(inputResult, reqValue, index) {
		let result = []
		for (let item of inputResult) {
			if(reqValue[index] == '?'){
				for (let i = 0; i < inputResult.length; i++) {
					result[i] = inputResult[i]
				}
			}
			else if (reqValue[index] == parseInt(item[index])) {
				result.push(item)
			}
		}
		return (result)
	}
	$('button').on('click', function () {
		$('.result').html(' ')
		let req = $('.search_input').val().split(':') //!самолет:?:крылья
		let reqValue = []
		for (let i = 0; i < req.length; i++) {
			if (req[i] == '?') {
				reqValue.push('?')
			}
			for (let item in base) {
				if (base[item] == req[i]) {
					reqValue.push(item)
				}
			}
		}
		console.log(reqValue) //!10:?:13
		let first = filterArray(allBind, reqValue, 0)
		let second = filterArray(first, reqValue, 1)
		let third = filterArray(second, reqValue, 2) //!filter
		let mainResult
		for (word of third) {
			console.log(base[parseInt(word[0])]) //!translate
			mainResult = base[parseInt(word[0])] + "-- " + base[parseInt(word[1])] + "-- " + base[parseInt(word[2])]
			$('.result').append('<p> ' + mainResult + '</p>')
		}
	});

});