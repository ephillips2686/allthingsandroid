//Index Page Scrollable images
//This is code from online from homework 12
var interval = 2500;
        var random_display = 0;
        var image_dir = ""
        var ImageNum = 0;
        imageArray = new Array();
        imageArray[ImageNum++] = new imageItem(image_dir + "New_Img/01.jpg");
        imageArray[ImageNum++] = new imageItem(image_dir + "New_Img/02.jpg");
        imageArray[ImageNum++] = new imageItem(image_dir + "New_Img/03.jpg");
        imageArray[ImageNum++] = new imageItem(image_dir + "New_Img/04.jpg");

        var number_of_image = imageArray.length;
        function imageItem(image_location) {
            this.image_item = new Image();
            this.image_item.src = image_location;
        }
        function get_ImageItemLocation(imageObj) {
            return (imageObj.image_item.src)
        }
        function randNum(x, y) {
            var range = y - x + 1;
            return Math.floor(Math.random() * range) + x;
        }
        function getNextImage() {
            if (random_display) {
                ImageNum = randNum(0, number_of_image - 1);
            }
            else {
                ImageNum = (ImageNum + 1) % number_of_image;
            }
            var new_image = get_ImageItemLocation(imageArray[ImageNum]);
            return (new_image);
        }

        function getPrevImage() {
            ImageNum = (ImageNum - 1) % number_of_image;
            var new_image = get_ImageItemLocation(imageArray[ImageNum]);
            return (new_image);
        }

        function prevImage(place) {
            var new_image = getPrevImage();
            document[place].src = new_image;
        }

        function rotateImage(place) {
            var new_image = getNextImage();
            document[place].src = new_image;
            var recur_call = "rotateImage('" + place + "')";
            timerID = setTimeout(recur_call, interval);
        }

/************Tabs JS**********************/
//Code from http://www.elated.com/articles/javascript-tabs/ Has been modified 
        var tabLinks = new Array();
        var contentDivs = new Array();
        function init() {
            // Grab the tab links and content divs from the page
            var tabListItems = document.getElementById('tabs').childNodes;
            for (var i = 0; i < tabListItems.length; i++) {
                if (tabListItems[i].nodeName == "LI") {
                    var tabLink = getFirstChildWithTagName(tabListItems[i], 'A');
                    var id = getHash(tabLink.getAttribute('href'));
                    tabLinks[id] = tabLink;
                    contentDivs[id] = document.getElementById(id);
                }
            }
            // Assign onclick events to the tab links, and
            // highlight the first tab
            var i = 0;
            for (var id in tabLinks) {
                tabLinks[id].onclick = showTab;
                tabLinks[id].onfocus = function () { this.blur() };
                if (i == 0) tabLinks[id].className = 'selected';
                i++;
            }
            // Hide all content divs except the first
            var i = 0;
            for (var id in contentDivs) {
                if (i != 0) contentDivs[id].className = 'tabContent hide';
                i++;
            }
        }
        function showTab() {
            var selectedId = getHash(this.getAttribute('href'));
            // Highlight the selected tab, and dim all others.
            // Also show the selected content div, and hide all others.
            for (var id in contentDivs) {
                if (id == selectedId) {
                    tabLinks[id].className = 'selected';
                    contentDivs[id].className = 'tabContent';
                } else {
                    tabLinks[id].className = '';
                    contentDivs[id].className = 'tabContent hide';
                }
            }
            // Stop the browser following the link
            return false;
        }
        function getFirstChildWithTagName(element, tagName) {
            for (var i = 0; i < element.childNodes.length; i++) {
                if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
            }
        }
        function getHash(url) {
            var hashPos = url.lastIndexOf('#');
            return url.substring(hashPos + 1);
        }
/********************Form Validation******************************************************/
//Code is from homework assignment on form validation.  Although I alters almost all of the code.
        function ProcessForm() {
            window.alert("Form Successfully Submitted (FAKE).");
            //window.location.href = "mailto:erniephillips.android@gmail.com ?subject=" + topic + "&body=" + "Name: " + name + "%0A\n" + "Email: " + email + "%0A\n" + "Subject: " + subject + "%0A\n" + "Message: %0A\n" + message;
            //window.location.href = "mailto:erniephillips.android@gmail.com ?subject=Subject&body=message%20goes%20here";
        }//end ProcessForm()

        function ValidateForm(FormToCheck) {
            //var ftxt_reason = new Object();
            var ftxt_first = new Object();
            var ftxt_last = new Object();
            var ftxt_phone = new Object();
            var ftxt_email = new Object();

            ftxt_reason = window.document.getElementById("txt_reason_contact");
            ftxt_first = window.document.getElementById("txt_First_Name");
            ftxt_last = window.document.getElementById("txt_Last_Name");
            ftxt_phone = window.document.getElementById("txt_Phone");
            ftxt_email = window.document.getElementById("txt_Email");

            ValidateTopic();

            if (ValidateTextBox(ftxt_first, ftxt_last, ftxt_phone, ftxt_email) == true) {
                return true;
            } else {
                return false;
            }//end if

        }//end ValidateForm()


        //Have not been able to figure out how to display this alert without jumping to first name validation
        //When I had this if statement in ValidateTextBox() function and value was blank, the 'You must provide a topic' 
        //alert would pop up as it was supposed to, but would be immediately followed by the 'Form successfully submitted,
        //so I removed it and have set validateFrom to call Validate topic instead.
        function ValidateTopic() {
            if (document.getElementsByName('txt_reason_contact')[0].value == 'blank') {
                alert("You must provide a topic.");
            } 
        }

        function ValidateTextBox(firstNameVal, lastNameVal, phoneVal, emailVal) {
            var bolIsError = new Boolean(false);
            var strErrorMsg = new String("");
            var objError = new Object();


            if ((CheckForEmpty(firstNameVal.value) == true)) {
                bolIsError = true;
                strErrorMsg = "First name cannot be blank.";
                objError = firstNameVal;
            } else if ((CheckForEmpty(lastNameVal.value) == true)) {
                bolIsError = true;
                strErrorMsg = "Last name cannot be blank.";
                objError = lastNameVal;
            } else if ((CheckForEmpty(phoneVal.value) == true)) {
                bolIsError = true;
                strErrorMsg = "You must provide a number for contact."
                objError = phoneVal;
            } else if ((InvalidPhone(phoneVal.value) == true)) {
                bolIsError = true;
                strErrorMsg = "Invalid format of phone number.";
                objError = phoneVal;
            } else if ((CheckForEmpty(emailVal.value) == true)) {
                bolIsError = true;
                strErrorMsg = "You must provide an email address for contact."
                objError = emailVal;
            } else if (InvalidEmail(emailVal.value)) {
                bolIsError = true;
                strErrorMsg = "The format of your email is incorrect. \nPlease try again.";
                objError = emailVal;
            }


            if (bolIsError == true) {
                window.alert(strErrorMsg);
                objError.select();
                return false;
            } else {
                return true;
            }//end if
        }//end ValidateTextBox

        function CheckForEmpty(FieldToCheck) {
            var onlySpacesRE = /^\s+$/;

            if ((FieldToCheck.match(onlySpacesRE)) ||
               (FieldToCheck == null) ||
               (FieldToCheck == "")) {
                return true;
            } else {
                return false;
            }//end if
        }//end CheckForEmpty


        function InvalidPhone(FieldToCheck) {
            var InvalidPhoneRE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

            if (FieldToCheck.match(InvalidPhoneRE)) {
                return false;
            } else {
                return true;
            }//end if
        }//end InvalidPhone

        function InvalidEmail(FieldToCheck) {
            var InvalidEmailRE = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

            if (FieldToCheck.match(InvalidEmailRE)) {
                return false;
            } else {
                return true;
            }//end if
        }//end InvalidEmailx




