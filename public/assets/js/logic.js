
//Post comment for a certain article
$(document).on("click", ".addComment",  function()  {
    let id = $(this).attr("data-article");
    console.log(id);
    $(`.postComment .${id}`).hide();
    let newComment = {
        id: id,
        body: $(`.form-control.${id}`).val().trim(),
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
        }).then( 
            function() {$(`.comments${id}`).html("")
        console.log(id)
        $.ajax({
            method: "Get",
            url: `/api/comments/${id}`
        }).then((data) => {
            console.log(data)
            data.forEach( (element) => {
                let commentDiv = $("<div>").addClass("commentDiv")
                let commentDate = $("<h3>").text(element.created).addClass("commentDate");
                let commentBody = $("<p>").text(element.body).addClass("commentBody");
                commentDiv.append(commentDate,commentBody);
            $(`.comments${id}`).append(commentDiv);
            })
        });
    });
});

//Get Comments for article when show comments is clicked
$(document).on("click", ".showComments",  showComments
);

//Add thumbs up 
$(document).on("click", ".thumbsUp", function() {
    let id = $(this).attr("data-article")
    //Hide Buttons
    $(`.thumbs.${id}`).hide();
    //grab headline for update
    let headline = $(this).attr("data-headline");
    $.ajax({
        method: "Get",
        url: `/api/thumbs/${id}`,
    }).then((data) => {
        console.log(data[0].thumbsUp)
        let thumbsUp = data[0].thumbsUp + 1
        let update = {
            headline: headline,
            thumbsUp: thumbsUp
        }
        console.log("thumbsbasda" + thumbsUp);
        $.ajax({
            method: "Put",
            url: `/api/thumbsUp`,
            data: update
        }).then((updatedInfo) => {console.log(updatedInfo)})
    });
})

//Add thumbs down
$(document).on("click", ".thumbsDown", function() {
    let id = $(this).attr("data-article")
    //Hide Buttons
    $(`.thumbs.${id}`).hide();
    //grab headline for update
    let headline = $(this).attr("data-headline");
    $.ajax({
        method: "Get",
        url: `/api/thumbs/${id}`,
    }).then((data) => {
        console.log(data[0].thumbsDown)
        let thumbsUp = data[0].thumbsDown + 1
        let update = {
            headline: headline,
            thumbsDown: thumbsDown
        }
        console.log("thumbsbasda" + thumbsDown);
        $.ajax({
            method: "Put",
            url: `/api/thumbsDown`,
            data: update
        }).then((updatedInfo) => {console.log(updatedInfo)})
    });
})


function showComments() {
    let id = $(this).attr("data-article")
    $(`.comments${id}`).html("");
    console.log(id)
    $.ajax({
        method: "Get",
        url: `/api/comments/${id}`
    }).then((data) => {
        console.log(data)
        data.forEach( (element) => {
            let commentDiv = $("<div>").addClass("commentDiv")
            let commentDate = $("<h3>").text(element.created).addClass("commentDate");
            let commentBody = $("<p>").text(element.body).addClass("commentBody");
            commentDiv.append(commentDate,commentBody);
        $(`.comments${id}`).append(commentDiv);
        })
    });
}