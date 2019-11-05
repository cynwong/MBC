/*
    <div class="col-sm-6 col-md-4">
        <figure class="position-relative rounded img-container collapsed"
            title="Portfolio with HTML, CSS &amp; GIT"><img class="img-fluid rounded"
                src="resources/pages/assignment-1.png" alt="Portfolio with HTML, CSS &amp; GIT">
            <figcaption class="img-label">Portfolio with HTML, CSS &amp; GIT</figcaption>
        </figure>
        <div class="card card-body collapse show" id="img-info" style="">
            <p class="card-text">Portfolio project I is created with HTML and CSS. This project contains About,
                Contact and Portfolio pages.</p><a href="../assignment1/index.html" class="btn">Published
                site</a>
        </div>
    </div>


    <div class="col-md-4">
        <div class="row no-gutter">
            <figure class='col-4 position-relative rounded img-container' title="Homework 2">
                <img class="img-fluid rounded" src="resources/pages/assignment-2.png" alt="Homework 2">
                <figcaption class="img-label">Homework 2</figcaption>
            </figure>
            <div class="col-8 card card-body collapse" id="img-info">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
                <a href="#" class="btn btn-primary stretched-link">Link to published site</a>
            </div>
        </div>
    </div>
*/



$(document).ready(()=>{
    const container = $("#contentContainer");
    for( let content of data.contents){
        container.append(
            $("<div />", {"class": "col-sm-6 col-md-3"}).append(
                $("<div />", {"class": "row no-gutter"}).append(
                    $("<figure />", {"class": "col-6 position-relative rounded img-container", "title":content.title}).append(
                        $("<img />", {"class": "img-fluid rounded", "src": content.imageURL, "alt": content.title}),
                        $("<figcaption />", {"class":"img-label", "text": content.title})
                    ),
                    $("<div />", {"class": "col card card-body collapse", "id": "img-info"}).append(
                        $("<a />", {"href": content.publishedURL, "class":"btn", "text": "Published site"}),
                        $("<p />", {"class": "card-text", "text": content.description}),
                    )
                )    
            ));
    }
    // console.log(data)

});