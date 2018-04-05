
//Post comment for a certain article
$(document).on("click", ".addComment",  function()  {
    let id = $(this).attr("data-article");
    //hide button 
    $(this).hide();
    //Hide input field    
    $(`.postComment .${id}`).hide();
    //hide p tag
    $(`.postedComment .${id}`).hide();
    //build obj to be sent
    let newComment = {
        id: id,
        body: $(`.form-control.${id}`).val().trim(),
        created: moment().calendar()
    };
    //Post comment to db
    $.ajax({
        method: "POST",
        url: "/api/newComment",
        data: newComment
      }).then(function(data) {
          // Empty the comment section
          $(`.${id}`).val("");
        }).then(
            function() {$(`.comments${id}`).html("")
        $.ajax({
            method: "Get",
            url: `/api/comments/${id}`
        }).then((data) => {
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
        const thumbsUp = data[0].thumbsUp + 1;
        const update = {
            headline: headline,
            thumbsUp: thumbsUp
        }
        $.ajax({
            method: "Put",
            url: `/api/thumbsUp`,
            data: update
        });
    });
});

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
        let thumbsDown = data[0].thumbsDown + 1
        let update = {
            headline: headline,
            thumbsDown: thumbsDown
        };
        $.ajax({
            method: "Put",
            url: `/api/thumbsDown`,
            data: update
        });
    });
});


function showComments() {
    let id = $(this).attr("data-article")
    $(`.comments${id}`).html("");
    $.ajax({
        method: "Get",
        url: `/api/comments/${id}`
    }).then((data) => {
        data.forEach( (element) => {
            let commentDiv = $("<div>").addClass("commentDiv")
            let commentDate = $("<h3>").text(element.created).addClass("commentDate");
            let commentBody = $("<p>").text(element.body).addClass("commentBody");
            commentDiv.append(commentDate,commentBody);
        $(`.comments${id}`).append(commentDiv);
        })
    });
}