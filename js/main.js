window.onload = function () {
	/* tabs */
	const checkBox = document.querySelector('#agree');
	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".wrap-agree label")) {
			if (checkBox.checked !== true) {
				checkBox.checked = true;
			} else {
				checkBox.checked = false;
			}
		}
	});
	/* Параграфы таблици для изменения */
	let countId = 1;
	let p1;
	let p2;
	let p3;
	let p4;

	const triangle = document.querySelector('.triangle');
	const country = document.querySelectorAll('.country');
	const dropDown = document.querySelector('.drop-down-phones');
	const numbresForWrite = document.querySelector('.numbers-for-write');
	const numbersCountry = document.querySelector('.numbers-country');
	const fieldsForm = document.querySelectorAll('.fields');

	/* variable for Popup */
	const popupClose = document.querySelector('.close');
	const overlay = document.querySelector('.overlay');
	const overlayModal = document.querySelector('.over-modal');


	let countTotal = 0;

	/* Ошибок нет */
	let isValid = true;
	/* change color  triangle */
	let isColorTriangle = false;

	/* validation Users */
	const regEpxName = /[A-Za-zА-Яа-я]/;
	const regPhone = /[0-9]/i;
	const regExpEmail = /[a-zA-z]+[a-zA-z0-9]+@[a-zA-z]+\./i;
	const regPassword = /^[A-Z]+[0-9]/;
	let dateUser = [];
	const formUser = document.querySelector('.registration-users-form');

	/* variable for input */
	let name = document.querySelector('#name');
	let lastName = document.querySelector('#sur-name');
	let mail = document.querySelector('#email');
	let phone = document.querySelector('#phone');
	let agreeCheckBox = document.querySelector('#agree');
	let pass = document.querySelector('#pass');
	let submitButton = document.querySelector('#button-submit');
	let wrapAgree = document.querySelector('.wrap-agree');

	/* variable for inputs modal-rename */
	let nameRename = document.querySelector('#rename-name');
	let lastNameRename = document.querySelector('#rename-sur-name');
	let mailRename = document.querySelector('#rename-email');
	let phoneRename = document.querySelector('#rename-phone');
	let btnRenameUser = document.querySelector('#btn-rename-user');

	/* change data for user */

	let renameUserName;
	let renameUserLastName;
	let renameUserEmail;
	let renameUserPhone;


	/* variable for modal-rename  */
	const modalRename = document.querySelector('.modal-rename');
	const modalCloseRename = document.querySelector('.modal-close-rename');

	/* Для подсчета даты на удаления пользователя */
	let dataCountUser = 1;

	triangle.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".triangle")) {
			if (!isColorTriangle) {
				_this.classList.add('change-triangle');
				dropDown.style.display = 'block';
			} else {
				_this.classList.remove('change-triangle');
				dropDown.style.display = 'none';
			}
			isColorTriangle = !isColorTriangle;
		}
	});

	const regExpInputValue = (element, regEpx, hintsError) => {
		if (!regEpx.test(element.value)) {
			/* Вызвать hint */
			element.style.border = '2px solid #ff0000';
			document.querySelector(`.${hintsError}`).style.display = 'flex';
			isValid = false;
		} else {
			element.style.border = '';
		}
	};

	const resetInputValue = () => {
		name.value = '';
		lastName.value = '';
		mail.value = '';
		phone.value = '';
		pass.value = '';
		for (let i = 0; i < fieldsForm.length; i++) {
			fieldsForm[i].style.border = '1px solid #d2dde2';
			fieldsForm[i].style.background = '';
		}
	};

	const showPopup = () => {
		overlay.classList.add('show-close');
		overlayModal.classList.add('show-over-modal');
		document.querySelector('.numbers-phone').style.zIndex = '0';
	};

	const closePopup = () => {
		overlay.classList.remove('show-close');
		overlayModal.classList.remove('show-over-modal')
	};

	const dateInputValue = () => {

		let phoneValue = document.querySelector('.numbers-for-write').innerText;
		let modal = document.querySelector('.modal-users');
		dateUser.push({
			id: countId++,
			name: name.value,
			lastName: lastName.value,
			phone: phone.value,
			mail: mail.value
		});

		let userInfo = document.createElement('div');
		userInfo.className = 'user-info';

		let p1 = document.createElement('p');
		p1.className = 'name-user';

		let p2 = document.createElement('p');
		p2.className = 'last-name-user';

		let p3 = document.createElement('p');
		p3.className = 'user-email';

		let p4 = document.createElement('p');
		let spanNum = document.createElement('span');
		spanNum.className = 'num';
		spanNum.innerText = `+${phoneValue}`;
		let spanUserNum = document.createElement('span');
		spanUserNum.className = 'user-numb-phone';
		p4.className = 'user-phone';
		p4.appendChild(spanNum);
		p4.appendChild(spanUserNum);

		let p5 = document.createElement('div');
		p5.className = 'delete-user';
		p5.setAttribute('data-delete', `${dataCountUser}`);

		let p6 = document.createElement('div');
		p6.setAttribute('data-rename', `${dataCountUser}`);
		p6.className = 'rename-user';

		userInfo.appendChild(p1);
		userInfo.appendChild(p2);
		userInfo.appendChild(p3);
		userInfo.appendChild(p4);
		userInfo.appendChild(p5);
		userInfo.appendChild(p6);
		modal.appendChild(userInfo);


		for (let i = 0; i < dateUser.length; i++) {
			p1.innerText = dateUser[i].name;
			p2.innerText = dateUser[i].lastName;
			p3.innerText = dateUser[i].mail;
			spanUserNum.innerText = `${dateUser[i].phone}`;
		}

		countTotal = dateUser.length;
		document.querySelector('.total-num').innerText = countTotal;
		console.log('-- dateUser --', dateUser);
	};

	const checkValueLength = (element, min, max, hintsError) => {
		if (element.value.length < min) {
			/* hint */
			document.querySelector(`.${hintsError}`).style.display = 'flex';
			document.querySelector(`.${hintsError} .hints_text`).innerText = `Минимальная длина символов ${min}`;
			element.style.border = '2px solid #ff0000';
			isValid = false;
		} else if (element.value.length > max) {
			document.querySelector(`.${hintsError}`).style.display = 'flex';
			document.querySelector(`.${hintsError} .hints_text`).innerText = `Максимальная длина символов ${max}`;
			element.style.border = '2px solid #ff0000';
		} else {
			document.querySelector(`.${hintsError}`).style.display = 'none';
			element.style.border = '';
		}
	};

	const registrationUser = () => {

		for (let i = 0; i < fieldsForm.length; i++) {
			if (fieldsForm[i].value === '') {
				fieldsForm[i].style.border = '2px solid #ff0000';
				fieldsForm[i].style.background = '#ffe5e5';
				isValid = false;
			} else {
				fieldsForm[i].style.border = '';
				isValid = true;
			}
		}

		regExpInputValue(name, regEpxName, 'hints-error-name');
		regExpInputValue(lastName, regEpxName, 'hints-error-last-name');
		regExpInputValue(mail, regExpEmail, 'hints-error-mail');
		regExpInputValue(phone, regPhone, 'hints-input-field');
		regExpInputValue(pass, regPassword, 'hints-pass');
		/* Show hints */
		if (!agreeCheckBox.checked) {
			wrapAgree.classList.add('error-checked');
		}

		if (!isValid) {
			/* Dont send forms */
			return false;
		} else {
			/* Send forms*/
			if (agreeCheckBox.checked === true) {
				wrapAgree.classList.remove('error-checked');
				dateInputValue();
				resetInputValue();
				dataCountUser++;
			}
			agreeCheckBox.checked = false;
		}

	};

	for (let i = 0; i < country.length; i++) {
		country[i].onclick = function (e) {
			const _this = e.target;
			e.preventDefault();
			dropDown.style.display = 'none';
			triangle.classList.remove('change-triangle');
			isColorTriangle = !isColorTriangle;
			/* find elements for text phone */
			let parentNum = _this.closest('.num-phone');
			let textNumbersCountry = parentNum.querySelector('.numbers-country');
			let getNumbers = textNumbersCountry.innerHTML;
			numbresForWrite.innerText = getNumbers;
		}
	}

	submitButton.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches("#button-submit")) {
			registrationUser();
		}
	});

	const fieldsFocus = (elem, resetHints) => {
		elem.addEventListener('focus', function (e) {
			const _this = e.target;
			e.preventDefault();
			_this.style.border = '2px solid #efa43a';
			document.querySelector(`.${resetHints}`).style.display = 'none';
		});
	};

	fieldsFocus(name, 'hints-error-name');
	fieldsFocus(lastName, 'hints-error-last-name');
	fieldsFocus(mail, 'hints-error-mail');
	fieldsFocus(phone, 'hints-input-field');
	fieldsFocus(pass, 'hints-pass');

	const getChar = (event) => {
		if (event.which == null) {
			if (event.keyCode < 32) return null;
			return String.fromCharCode(event.keyCode) // IE
		}

		if (event.which != 0 && event.charCode != 0) {
			if (event.which < 32) return null;
			return String.fromCharCode(event.which) // остальные
		}

		document.querySelector('.hints-input-field').style.display = 'flex';
		document.querySelector('.hints-input-field .hints_text').innerText = 'В поле можно вводить только циры';
		return null; // специальная клавиша
	};

	phone.onkeypress = function (e) {
		e = e || event;

		if (e.ctrlKey || e.altKey || e.metaKey) return;

		const chr = getChar(e);

		if (chr == null) return;

		if (chr < '0' || chr > '9') {
			document.querySelector('.hints-input-field').style.display = 'flex';
			document.querySelector('.hints-input-field .hints_text').innerText = 'В поле можно вводить только циры';
			return false;
		} else {
			document.querySelector('.hints-input-field').style.display = 'none';
		}

	};

	pass.addEventListener('input', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches("#pass")) {
			checkValueLength(_this, 5, 20, 'hints-pass');
		}
	});

	phone.addEventListener('input', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches("#phone")) {
			checkValueLength(_this, 6, 28, 'hints-input-field');
		}
	});

	popupClose.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".close")) {
			closePopup();
		}
	});

	overlay.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".overlay")) {
			closePopup();
		}
	});

	const removeByAttr = (arr, attr, value) => {
		let i = arr.length;
		while (i--) {
			if (arr[i]
				&& arr[i].hasOwnProperty(attr)
				&& (arguments.length > 2 && arr[i][attr] === value)) {

				arr.splice(i, 1);

			}
		}
		return arr;
	};

	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".delete-user")) {
			let dataDelete = _this.getAttribute('data-delete');
			let parsNum = parseInt(dataDelete);
			removeByAttr(dateUser, 'id', parsNum);
			console.log('-- delete User --', dateUser);
			let parentBlock = _this.closest('.user-info');
			document.querySelector('.total-num').innerText = --dateUser.length;
			parentBlock.style.display = 'none';
		}
	});

	let idUser;
	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".rename-user")) {
			let dataDelete = _this.getAttribute('data-rename');
			// id - user
			idUser = parseInt(dataDelete);
			modalRename.style.display = 'block';
			overlayModal.classList.remove('show-over-modal')
		}
	});

	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".all-users-item")) {
			showPopup();
		}
	});

	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();
		if (_this.matches(".modal-close-rename")) {
			modalRename.style.display = 'none';
			overlay.classList.remove('show-close')
		}
	});

	document.addEventListener('click', function (e) {
		const _this = e.target;
		e.preventDefault();

		if (_this.matches("#btn-rename-user")) {

			/* add in table */
			let nameUser = document.querySelector('.name-user');
			let lastNameUser = document.querySelector('.last-name-user ');
			let userEmail = document.querySelector('.user-email');
			let userPhone = document.querySelector('.user-phone');

			/* save info */
			renameUserName = nameRename.value;
			renameUserLastName = lastNameRename.value;
			renameUserEmail = mailRename.value;
			renameUserPhone = phoneRename.value;

			/* write in array */
			let itemUser = dateUser.find(item => item.id === idUser);
			console.log('--  itemUser--', itemUser);
			itemUser.name = renameUserName;
			itemUser.lastName = renameUserLastName;
			itemUser.mail = renameUserEmail;
			itemUser.phone = renameUserPhone;

			console.log('-- Объек  --', dateUser);

			p1.innerText = itemUser.name;
			p2.innerText = itemUser.lastName;
			p3.innerText = itemUser.mail;
			p4.innerText = itemUser.phone;
		}
	});
};
