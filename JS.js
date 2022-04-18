const inputBox = document.getElementById('inputBox');
const btnAdd = document.getElementById('btnAdd');
const btnUndo = document.getElementById('btnUndo');
const btnRedo = document.getElementById('btnRedo');
const displayBox = document.getElementById('displayBox');
const countBox = document.getElementById('countBox');

const txtSave = []; // array to save values.
const txtDisplay = []; // array to display values.
let txtCount = 0; // counts length of current values.

showAll = () => {
	displayBox.innerHTML = txtDisplay;
	countBox.innerHTML = txtCount;

	displayBox.innerHTML = txtDisplay.join(', ');

}; // displays all arrays and values.

showAll();

btnSwitch = () => {
	if (txtCount <= 0) {
		btnUndo.disabled = true;
		btnUndo.classList.add('btn-dis');
	} else {
		btnUndo.disabled = false;
		btnUndo.classList.remove('btn-dis');
	}

	if (txtDisplay.length == txtSave.length) {
		btnRedo.disabled = true;
		btnRedo.classList.add('btn-dis');
	} else {
		btnRedo.disabled = false;
		btnRedo.classList.remove('btn-dis');
	};

}; // disables the buttons if 'undos' or 'redos' are not avalible and adds a class for styling and creating visual user feeback.

btnSwitch()

add = () => {
	const index = txtDisplay.length;
	const saveCount = txtSave.length;
	txtSave.splice(index, saveCount); // this takes length of both arrays and tells the saved array to go to the index equal to the current length of the displayed array, and then to remove all items after that index.
	// ^
	// (it's actually only removing the number of items equivalent to the current length of the saved array, but that number will always be higher then the number of proceeding items from the specified index, so it will always remove all the proceeding items no matter the length).
	// ^
	// this functionality is used for when you 'add' an item after 'undoing' some items, it deletes all the 'redos' you had avalible, and starts a new saved array, while still keeping any 'undos' you have not used avalible to you.

	txtDisplay.push(inputBox.value); // takes whatever was entered in the input and adds it too the displayed array.
	txtSave.push(txtDisplay.slice(-1)); // takes the last value in the displayed array and adds it to the end of the saved array.
};

undo = () => {
	txtDisplay.pop();
	// removes the last item from ONLY the displayed array.
};

redo = () => {
	const txtGetLength = txtDisplay.length;
	const txtGetValue = txtSave[txtGetLength];
	txtDisplay.push(txtGetValue);
	// this finds the length of the displayed area and then tells the saved array to go to the index equivalent to the length of the displayed array and then pushes the value to the displayed array.
};

btnAdd.onclick = () => {

	if (inputBox.value != '') {
		txtCount++;
		add();
		btnSwitch();
		showAll(); // all functions described above.
	} else {
		const txtAlert = document.createElement('p');
		displayBox.appendChild(txtAlert);
		txtAlert.innerHTML = 'write some text please'; // this happens incase the user doesn't enter any text into the input but tryies to push 'add' or hit enter.
	};

	inputBox.value = ''; // makes input empty after adding value.
};

btnUndo.onclick = () => {
	txtCount--;
	undo();
	btnSwitch();
	showAll(); // all functions described above.
};

btnRedo.onclick = () => {
	txtCount++;
	redo();
	btnSwitch();
	showAll(); // all functions described above.
};

inputBox.addEventListener("keyup", event => {
	if (event.keyCode === 13) {
		btnAdd.click();
	};
}); // this allows you to hit 'enter' on your keyboard to add a value, instead of having to click the 'add' button every time.