(function($) {
    $(document).ready(function() {
        // var ball = document.querySelector('.ball');
        // var garden = document.querySelector('.garden');
        var output = document.querySelector('.permissionClass');

        // var maxX = garden.clientWidth - ball.clientWidth;
        // var maxY = garden.clientHeight - ball.clientHeight;

        const displayBox = document.getElementById('displayBox');
        const countBox = document.getElementById('countBox');
        const btnAdd = document.getElementById('btnAdd');
        // const btnUndo = document.getElementById('btnUndo');
        // const btnRedo = document.getElementById('btnRedo');
        const txtSave = []; // array to save values.
        const txtDisplay = []; // array to display values.
        let txtCount = 0; // counts length of current values.
        let data = [];
        let undoData = [];
        let flag = true;
        showAll = () => {
            displayBox.innerHTML = txtDisplay;
            countBox.innerHTML = txtCount;

            displayBox.innerHTML = txtDisplay.join(', ');

        }; // displays all arrays and values.

        showAll();

        // btnSwitch = () => {
        //     if (txtCount <= 0) {
        //         btnUndo.disabled = true;
        //         btnUndo.classList.add('btn-dis');
        //     } else {
        //         btnUndo.disabled = false;
        //         btnUndo.classList.remove('btn-dis');
        //     }

        //     if (txtDisplay.length == txtSave.length) {
        //         btnRedo.disabled = true;
        //         btnRedo.classList.add('btn-dis');
        //     } else {
        //         btnRedo.disabled = false;
        //         btnRedo.classList.remove('btn-dis');
        //     };

        // }; // disables the buttons if 'undos' or 'redos' are not avalible and adds a class for styling and creating visual user feeback.

        // btnSwitch()

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
            data = [];
        	undoData = [];
        };

        // undo = () => {
        //     txtDisplay.pop();
        //     // removes the last item from ONLY the displayed array.
        //     txtCount--;
        // 	// undo();
        // 	//btnSwitch();
        // 	showAll(); // all functions described above.
        // };

        // redo = () => {
        //     const txtGetLength = txtDisplay.length;
        //     const txtGetValue = txtSave[txtGetLength];
        //     txtDisplay.push(txtGetValue);
        //     // this finds the length of the displayed area and then tells the saved array to go to the index equivalent to the length of the displayed array and then pushes the value to the displayed array.

        // 	txtCount++;
        // 	// redo();
        // 	//btnSwitch();
        // 	showAll(); // all functions described above.
        // };

        btnAdd.onclick = () => {
            if (inputBox.value != '') {
                txtCount++;
                add();
                // btnSwitch();
                showAll(); // all functions described above.
            } else {
                const txtAlert = document.createElement('p');
                displayBox.appendChild(txtAlert);
                txtAlert.innerHTML = 'write some text please'; // this happens incase the user doesn't enter any text into the input but tryies to push 'add' or hit enter.
            };
            inputBox.value = ''; // makes input empty after adding value.
        };

        // btnUndo.onclick = () => {
            // if (flag) {
            //     txtCount--;
            //     btnSwitch();
            //     showAll(); // all functions described above.
            // }
        //     undo();
        // };

        // btnRedo.onclick = () => {
            // if (flag) {
            //     txtCount++;
            //     btnSwitch();
            //     showAll(); // all functions described above.
            // }
        //     redo();
        // };

        // inputBox.addEventListener("keyup", event => {
        //     // if (event.keyCode === 13) {
        //     // 	btnAdd.click();
        //     // };

        //}); // this allows you to hit 'enter' on your keyboard to add a value, instead of having to click the 'add' button every time.

      
        //$('#inputBox').val('');

        function undo() {
            if (data.length > 0) {
                let pop = data.pop().trim();
                undoData.push(pop);
                $('.result').text(data, undoData);
                let result = '';
                $.each(data, function(index, value) {
                    result += value;
                });
                $('#inputBox').val(result);
            } else {
                $('.result').text('Nohing to undo');
            }
        }

        function redo() {
            if (undoData.length > 0) {
                let pop = undoData.pop().trim();
                data.push(pop);
                $('.result').text(data, undoData);
                let result = '';
                $.each(data, function(index, value) {
                    result += value;
                });
                $('#inputBox').val(result);
            } else {
                $('.result').text('Nohing to redo');
            }
        }

        $(document).on('input', '#inputBox', function() {
            let str = $(this).val().trim();
            data.push(str.charAt(str.length - 1));
            $('.result').text(data, undoData);
        });

        function handleOrientation(event) {
            output.textContent = `Permission Granted. \n`;
            let x = event.beta; // In degree in the range [-180,180)
            //var y = event.gamma; // In degree in the range [-90,90)

            //output.textContent += `beta : ${x}\n`;
            //output.textContent += `gamma: ${y}\n`;

            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            // if (x > 90) { x = 90 };
            // if (x < -90) { x = -90 };

            // To make computation easier we shift the range of
            // x and y to [0,180]
            // x += 90;
            // y += 90;

            // 10 is half the size of the ball
            // It center the positioning point to the center of the ball
            // ball.style.left = (maxY * y / 180 - 10) + "px";
            // ball.style.top = (maxX * x / 180 - 10) + "px";

            if (Math.ceil(x) == 15 && flag===true) {
                undo();
                // $('#btnUndo:not(.btn-dis)').click();
                flag = false;
            } else if (Math.ceil(x) == 80  && flag===true) {
                redo();
                // $('#btnRedo:not(.btn-dis)').click();
                flag = false;
            } else if(Math.ceil(x) > 15 && Math.ceil(x) < 80)  {
                flag = true;
            }
        }


        function permission() {
            if (typeof(DeviceMotionEvent) !== "undefined" && typeof(DeviceMotionEvent.requestPermission) === "function") {
                // (optional) Do something before API request prompt.
                output.textContent = `Need to request for permission first \n`;
                DeviceMotionEvent.requestPermission()
                    .then(response => {
                        // (optional) Do something after API prompt dismissed.
                        if (response == "granted") {
                            window.addEventListener("deviceorientation", handleOrientation, true);
                            $('#request').remove();
                        }
                    })
                    .catch(console.error);
            } else {
                alert("DeviceMotionEvent is undefined.");
            }
        }

        // if (location.protocol != "https:") {
        //     location.href = "https:" + window.location.href.substring(window.location.protocol.length);
        // }
        const btn = document.getElementById("request");
        btn.addEventListener("click", permission);
    });

})(window.jQuery);