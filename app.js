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
			if (reqValue[index] == '?') {
				for (let i = 0; i < inputResult.length; i++) {
					result[i] = inputResult[i]
				}
			} else if (reqValue[index] == parseInt(item[index])) {
				result.push(item)
			}
		}
		return (result)
	}

	function moreFilterArray(inputResult, reqValue, diraction) {
		let result = []
		console.log(reqValue)
		if (diraction == 1) {
			let moreFirst = filterArray(inputResult, reqValue, 0)
			console.log(moreFirst)
			let moreSecond = filterArray(moreFirst, reqValue, 1)
			result = moreSecond
		} else if (diraction == 0) {
			let moreFirst = filterArray(inputResult, reqValue, 2)
			console.log(reqValue)
			let moreSecond = filterArray(moreFirst, reqValue, 1)
			result = moreSecond
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
		let moreResult
		let secondFilter
		for (word of third) {

			// console.log(base[parseInt(word[0])]) //!translate
			mainResult = base[parseInt(word[0])] + "-- " + base[parseInt(word[1])] + "-- " + base[parseInt(word[2])]
			let secondReqValue = []
			$('.result').append('<p> ' + mainResult + '</p>')
			if (reqValue[0] && reqValue[2] == '?') {
				secondReqValue.push(word[2], word[1], '?')
				secondFilter = moreFilterArray(allBind, secondReqValue, 1) //!filtred from val:-:-
				if (secondFilter.length > 0) {
					for (moreWord of secondFilter) {
						moreResult = base[parseInt(word[0])] + "-- " + base[parseInt(moreWord[1])] + "-- " + base[parseInt(moreWord[2])]
						$('.result').append('<p> -> ' + moreResult + '</p>')
					}
				}} else if (reqValue[2] && reqValue[0] == '?') {
				secondReqValue.push('?', word[1], word[0])
				secondFilter = moreFilterArray(allBind, secondReqValue, 0) //!filtred -:-:val
				if (secondFilter.length > 0) {
					for (moreWord of secondFilter) {
						moreResult = base[parseInt(moreWord[0])] + "-- " + base[parseInt(moreWord[1])] + "-- " + base[parseInt(word[2])]
						$('.result').append('<p> -> ' + moreResult + '</p>')
					}
				}
			}
		}
	});

});