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

//main conference money amount

//helper function return array of match indexs
const matchedEvents = () => {
  let currentLabel = [];
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
      currentLabel.push(change);
    }
  });

  console.log(currentLabel);
  return currentLabel;
};

console.log(labels.text());
//eventlistener for a change in the checkbox
$(".activities").on("change", e => {
  let currentLabel = matchedEvents();
  console.log(currentLabel[2]);
  console.log(
    $(e.target)
      .parent()
      .text()
      .match(regexDateTime)[0]
  );
  //if the main conference is checked do not check the other events
  if (
    $(e.target)
      .parent()
      .text() === $(labels[1]).text()
  ) {
    console.log("200");
  } else {
    for (let i = 0; i < currentLabel.length; i++) {
      if (
        $(e.target)
          .parent()
          .text()
          .match(regexDateTime)[0]
          .replace(/\n\s+/g, " ") === currentLabel[i]
      ) {
        console.log("pass");
        //this will not work due to currentlabel is just a list
        //idea return 2 list one with the list and one with the elements
        $(currentLabel).prop("disabled", true);
      } else {
        console.log("no pass");
      }
      $(e.target).prop("disabled", false);
    }
  }
});

//When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
//If the user selects a workshop, don't allow selection of a workshop at the same day and time
//you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
//have a running total for the activity the user selects
