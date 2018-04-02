
//Post comment for a certain article
$(document).on("click", ".addComment",  function()  {
    var id = $(this).attr("data-article");
    console.log(id);

    var newComment = {
        id: id,
        body: $(`.${id}`).val().trim(),
        created: new Date($.now())
    };

    console.log(`comment body: ${newComment.body}`)
    $.ajax({
        method: "POST",
        url: "/api/newComment",
        data: newComment
      }).then(function(data) {
          // Log the response
          console.log(data);
          // Empty the comment section
          $(`.${id}`).val("");
        });
});

//Get Comments for article when show comments is clicked
$(document).on("click", ".showComments",  function() {
    var id = $(this).attr("data-article")
    $(`.comments${id}`).html("");
    console.log(id)
    $.ajax({
        method: "Get",
        url: `/api/comments/${id}`
    }).then((data) => {
        console.log(data)
        data.forEach( (element) => {
            var commentDiv = $("<div>").addClass("commentDiv")
            var commentDate = $("<h3>").text(element.created).addClass("commentDate");
            var commentBody = $("<p>").text(element.body).addClass("commentBody");
            commentDiv.append(commentDate,commentBody);
        $(`.comments${id}`).append(commentDiv);
        })
    });



});