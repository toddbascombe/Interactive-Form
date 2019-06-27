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

//When a user unchecks an activity,the competing activities(if there are any) are no longer disabled.
//If the user selects a workshop, don't allow selection of a workshop at the same day and time
//you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
//have a running total for the activity the user selects
