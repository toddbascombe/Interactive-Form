//when page load focus curser on the name input
$(window).on("load", () => {
  $("#name").focus();
});

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

//”T-Shirt Info” section
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
    $("#color")
      .children()
      .each((_, item) => {
        $(item).css("display", "");
      });
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

  console.log(currentLabel);
  return {
    textList: currentLabel,
    labelList: elementList
  };
};
let runningTotal = 0;
//running total insert
$(".activities").append('<div id="runningTotal"></div>');

console.log(labels.text());

//eventlistener for a change in the checkbox
$(".activities").on("change", e => {
  //running total's total

  let currentLabel = matchedEvents();
  console.log($(currentLabel.labelList[1]).children());
  console.log(currentLabel.textList[2]);

  //if the main conference is checked do not check the other events

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
          runningTotal += parseFloat(
            $(e.target)
              .parent()
              .text()
              .match(regexMoney)[1]
          );
        }
      } else {
        console.log("no pass");
        $(currentLabel.labelList[i])
          .children()
          .prop("disabled", false);
      }
      $(e.target).prop("disabled", false);
    }
  }
  console.log(runningTotal);
});
