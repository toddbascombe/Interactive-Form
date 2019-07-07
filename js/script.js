//when page load focus curser on the name input
$(window).on("load", () => {
  $("#name").focus();
});

//list all error messages
let error = [];

//reveal a textarea if the other button is selected
$("#title").on("change", e => {
  const fieldsetOne = $("#section-1");
  if ($(e.target).val() === "other") {
    fieldsetOne.append("<label for='other-title'>What is your title</label>");
    fieldsetOne.append("<textarea id='other_title'></textarea>");
  } else {
    if ($(e.target).val() !== "other") {
      fieldsetOne
        .children("#other_title")
        .prev()
        .remove();
      fieldsetOne.children("#other_title").remove();
    }
  }
});

//email vaildation
$("#mail").on("blur", () => {
  const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const usr_email = $("#mail").val();
  if (emailRegex.test(usr_email) === true && $("#mail").val() !== null) {
    $("#mail").css("border", "#32CD32 solid 1px");
  } else {
    $("#mail").css("border", "#FF0000 solid 1px");
    error.push("please enter a correct email address");
  }
});

//name vaildation
$("#name").on("blur", () => {
  const name = /^([A-z]\D\w+)\s(\D\w+[a-z]|[A-Z])$/;
  const usr_name = $("#name").val();
  if (name.test(usr_name) === true && $("#name").val() !== null) {
    $("#name").css("border", "#32CD32 solid 1px");
  } else {
    $("#name").css("border", "#FF0000 solid 1px");
    error.push("Please enter first and last name");
  }
});

//”T-Shirt Info” section
const defaultOption = () => {
  $("#color")
    .children()
    .each((_, item) => {
      $(item).css("display", "none");
    });
  $("#color").append(
    '<option value="default">Please select a T-shirt theme</option>'
  );
};

defaultOption();
$("#design").on("change", e => {
  //if "Theme - JS Puns" "Cornflower Blue," "Dark Slate Grey," and "Gold."
  if ($(e.target).val() === "js puns") {
    $("#color")
      .children()
      .each((_, item) => {
        if (
          $(item).val() !== "cornflowerblue" &&
          $(item).val() !== "darkslategrey" &&
          $(item).val() !== "gold"
        ) {
          $(item).css("display", "none");
        } else {
          $(item).css("display", "");
        }
      });
  }
  //if "Theme - I ♥ JS"  "Tomato," "Steel Blue," and "Dim Grey."
  else if ($(e.target).val() === "heart js") {
    $("#color")
      .children()
      .each((_, item) => {
        if (
          $(item).val() !== "tomato" &&
          $(item).val() !== "steelblue" &&
          $(item).val() !== "dimgrey"
        ) {
          $(item).css("display", "none");
        } else {
          $(item).css("display", "");
        }
      });
  } else {
    defaultOption();
    error.push("Please select a design");
  }
});

//”Register for Activities” section
const labels = $(".activities").children();
const regexDateTime = /Workshop\s+(\W)\s+(\w+)\s+(\w.+)[,]\s+\W100/; //get index 2 for date and time and 1 for money

//all other money about
const regexMoney = /[$](\w+)/;
//main conference money amount

//helper function return array of match indexs
const matchedEvents = () => {
  let currentLabel = [];
  let elementList = [];
  labels.each((_, item) => {
    if (
      $(item)
        .text()
        .match(regexDateTime) !== null
    ) {
      let change = $(item)
        .text()
        .match(regexDateTime)[0]
        .replace(/\n\s+/g, " ");
      let element = item;
      currentLabel.push(change);
      elementList.push(element);
    }
  });

  // console.log(currentLabel);
  return {
    textList: currentLabel,
    labelList: elementList
  };
};
//running total insert
$(".activities").append('<div id="runningTotal"></div>');
let runningTotal = 0;
// console.log(labels.text());

//eventlistener for a change in the checkbox
$(".activities").on("change", e => {
  //running total's total

  let currentLabel = matchedEvents();
  // console.log($(currentLabel.labelList[1]).children());
  // console.log(currentLabel.textList[2]);

  //if the main conference is checked do not check the other events
  console.log(
    $(e.target)
      .parent()
      .text()
  );
  if (
    $(e.target)
      .parent()
      .text() === $(labels[1]).text() &&
    //When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
    e.target.checked === true
  ) {
    runningTotal += parseFloat(
      $(e.target)
        .parent()
        .text()
        .match(regexMoney)[1]
    );
  } else if ($(e.target).prop("checked") === false) {
    if (
      $(e.target)
        .parent()
        .text() === $(labels[1]).text() &&
      //When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
      e.target.checked === false
    ) {
      console.log((runningTotal = runningTotal - 100));
    }
    for (let i = 0; i < currentLabel.textList.length; i++) {
      if (
        $(e.target)
          .parent()
          .text() === $(labels[1]).text() &&
        //When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
        e.target.checked === false
      ) {
        break;
      }
      if (
        $(e.target)
          .parent()
          .text()
          .match(regexDateTime)[0]
          //check the string for line breaks and if it is eq to any of the listed activites
          .replace(/\n\s+/g, " ") === currentLabel.textList[i]
      ) {
        $(currentLabel.labelList[i])
          .children()
          .prop("disabled", false);
      }
    }
    console.log((runningTotal = runningTotal - 100));
  } else {
    for (let i = 0; i < currentLabel.textList.length; i++) {
      //When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
      if (
        $(e.target)
          .parent()
          .text()
          .match(regexDateTime)[0]
          .replace(/\n\s+/g, " ") === currentLabel.textList[i] &&
        //you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
        e.target.checked === true
      ) {
        //If the user selects a workshop, don't allow selection of a workshop at the same day and time
        $(currentLabel.labelList[i])
          .children()
          .prop("disabled", true);
        if ($(e.target).prop("disabled") === true) {
          console.log(
            (runningTotal += parseFloat(
              $(e.target)
                .parent()
                .text()
                .match(regexMoney)[1]
            ))
          );
        }
      } else {
        console.log("no pass");
      }
      $(e.target).prop("disabled", false);
    }
  }
  $("#runningTotal").text("Total Amount $" + runningTotal);
});

//payment info sections
$("#payment").on("change", e => {
  //if credit card is selected
  if ($(e.target).val() === "credit card") {
    $("#credit-card").show();
    //if paypal is selected
  } else if ($(e.target).val() === "paypal") {
    $("#credit-card").hide();
    //if there is error in the error list
    if (error === null) {
      $("form").prop("action", "https://www.paypal.com/us/home");
      $("form").prop("method", "get");
      //display error messages
    } else {
    }
    //if bitcoin is selected
  } else if ($(e.target).val() === "bitcoin") {
    $("#credit-card").hide();
    $("form").prop("action", "https://www.coinbase.com/");
    $("form").prop("method", "get");
  }
});

//credit card vaildation
$("#cc-num").on("blur", () => {
  const creditCardRegex = /^((4\d{3})|(5[1-5]\d{2}))(-?|\040?)(\d{4}(-?|\040?)){3}|^(3[4,7]\d{2})(-?|\040?)\d{6}(-?|\040?)\d{5}$/;
  const creditCard = $("#cc-num").val();
  if (creditCardRegex.test(creditCard) === true && creditCard !== null) {
    $("#cc-num").css("border", "#32CD32 solid 1px");
  } else {
    $("#cc-num").css("border", "#FF0000 solid 1px");
    error.push("Please enter your credit card number");
  }
});

//vaildate zipcode
$("#zip").on("blur", () => {
  const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
  const zipValue = $("#zip").val();
  if (zipRegex.test(zipValue) === true && zipValue !== null) {
    $("#zip").css("border", "#32CD32 solid 1px");
  } else {
    $("#zip").css("border", "#FF0000 solid 1px");
    error.push("Please enter your zip code");
  }
});

//vaildate cvv code
$("#cvv").on("blur", () => {
  const cvvRegex = /^[0-9]{3,4}$/;
  const cvvValue = $("#cvv").val();
  if (cvvRegex.test(cvvValue) === true && cvvValue !== null) {
    $("#cvv").css("border", "#32CD32 solid 1px");
  } else {
    $("#cvv").css("border", "#FF0000 solid 1px");
    error.push("Please enter your credit card cvv number");
  }
});

//check for errors when click
$("#register").on("submit", () => {
  console.log(error);
});
