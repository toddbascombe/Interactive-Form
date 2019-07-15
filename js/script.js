//when page load focus curser on the name input
$(window).on("load", () => {
  $("#name").focus();
  $("#paypal").hide();
  $("#bitcoin").hide();
  $("#other_title").hide();
  $("#other_title")
    .prev()
    .hide();
});

const spanError = "<span id='error'>Not valid</span>";

const formValid = {
  //email regex
  emailRegex: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  //credit Card Regex
  creditCardRegex: /^((4\d{3})|(5[1-5]\d{2}))(-?|\040?)(\d{4}(-?|\040?)){3}|^(3[4,7]\d{2})(-?|\040?)\d{6}(-?|\040?)\d{5}$/,
  // zip code regex
  zipRegex: /^[0-9]{5}(?:-[0-9]{4})?$/,
  // cvv code regex
  cvvRegex: /^[0-9]{3,4}$/,

  //function highlight the border red for invaild input and green for valid input
  vaildate: function(targetElement) {
    e.preventDefault();
    $("#mail")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#mail")
      .prev()
      .append(spanError)
      .show();
  }
};

//reveal a textarea if the other button is selected
$("#title").on("change", e => {
  const fieldsetOne = $("#section-1");
  if ($(e.target).val() === "other") {
    $("#other_title").show();
    $("#other_title")
      .prev()
      .show();
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

//eventlistener for a change in the checkbox
$(".activities").on("change", e => {
  let currentLabel = matchedEvents();
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
    $("#paypal").hide();
    $("#bitcoin").hide();
    //if paypal is selected
  } else if ($(e.target).val() === "paypal") {
    $("#credit-card").hide();
    $("#paypal").show();
    $("#bitcoin").hide();
  }
  //if bitcoin is selected
  else if ($(e.target).val() === "bitcoin") {
    $("#credit-card").hide();
    $("#paypal").hide();
    $("#bitcoin").show();
  }
});

//event handler on the form to listen for the submit
$("#form-target").submit(e => {
  if ($("#name").val() === "") {
    e.preventDefault();
    $("#name")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#name")
      .prev()
      .append(spanError)
      .show();
  }
  if (!formValid.emailRegex.test($("#mail").val())) {
    e.preventDefault();
    $("#mail")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#mail")
      .prev()
      .append(spanError)
      .show();
  }
  if (runningTotal === 0) {
    e.preventDefault();
    $(".activities")
      .append(spanError)
      .show();
  }
  if (
    $("#payment").val() === "credit card" &&
    !formValid.creditCardRegex.test($("#cc-num").val())
  ) {
    e.preventDefault();
    $("#cc-num")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#cc-num")
      .prev()
      .append(spanError)
      .show();
  }
  if (
    $("#payment").val() === "credit card" &&
    !formValid.zipRegex.test($("#zip").val())
  ) {
    e.preventDefault();
    $("#zip")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#zip")
      .prev()
      .append(spanError)
      .show();
  }
  if (
    $("#payment").val() === "credit card" &&
    !formValid.cvvRegex.test($("#cvv").val())
  ) {
    e.preventDefault();
    $("#cvv")
      .css("border", "#FF0000 solid 1px")
      .focus();
    $("#cvv")
      .prev()
      .append(spanError)
      .show();
  } else {
    $("span#error").remove();
  }
});

//"border", "#32CD32 solid 1px"
