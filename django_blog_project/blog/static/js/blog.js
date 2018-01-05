/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

$(".dropbtn").click(function() {
  $('.dropdown').toggleClass("content-hidden");
});

function blockSubmit(){
    $(".submit-form").prop('disabled', true);
}

$(".text-name").on( "input", function(){
    var content = $(".text-name").val()
    if (content.length === 0 || content.length>=3){
        $(".val-name").remove()
        if (content.length>=3){
            $('.val-name-submit').remove()
        }else if (content.length === 0){
            blockSubmit()
        }
    }if (content.length >=3){}else if(content.length > 0 && content.length < 3 ){
        if ($('.val-name').length === 0){
        $(".text-name").after('<p class="validation-message val-name">This field needs at least 3 characters</p>')
        blockSubmit()
    }}
})


function validateEmail(content){
    var filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(content)){
    return true;
    }else{
    return false;
    }
}

$(".text-email").on("input", function(){
    var content = $(".text-email").val()
    if (validateEmail(content)!== true){
        if (content.length===0){
            $(".val-email").remove()
        }else if(content.length>0){
            if ($('.val-email').length === 0){
            $(".text-email").after('<p class="validation-message val-email">Enter correct email address</p>')
        }}
        blockSubmit()
        }else{
        $(".val-email").remove()
        $(".val-email-submit").remove()
        }})

$(".gender").on("input", function(){
    if ($(".gender").is(':checked')){
        $('.val-radio-submit').remove()
    }
})

$(".text-message").on("input", function(){
    var content = $(".text-message").val()
    if (content.length>0){
        $(".val-message-submit").remove()
    }else{
    blockSubmit()
    }
})

$(".submit-form").hover(function(){
    var nameField = $(".text-name").val()
    var emailField = $(".text-email").val()
    var genderRadio = $(".gender").is(':checked')
    var messageField = $(".text-message").val()

    var nameVal = false
    var emailVal = false
    var genderVal = false
    var messageVal = false

    if(nameField.length < 3 ){
        if ($('.val-name-submit').length===0)
            $(".post-form").append('<p class="validation-message-summary val-name-submit">Name field is required</p>')
    }else{
        nameVal = true
    }

    if(validateEmail(emailField)!== true){
         if ($('.val-email-submit').length===0)
            $(".post-form").append('<p class="validation-message-summary val-email-submit">Email field is required</p>')
    }else{
        emailVal = true
    }

    if (genderRadio !== true){
         if ($('.val-radio-submit').length===0)
            $(".post-form").append('<p class="validation-message-summary val-radio-submit">Gender is required</p>')
    }else{
        genderVal = true
    }

    if(messageField.length===0){
         if ($('.val-message-submit').length===0)
           $(".post-form").append('<p class="validation-message-summary val-message-submit">Message field is required</p>')
    }else {
        messageVal = true
    }
    if (nameVal && emailVal && genderVal && messageVal){
        $(".submit-form").prop('disabled', false);
    }
})

$('.gallery-img').click(function(){
    var image = $(this).attr("src");
    $(".modal-content").attr("src",image)
    $('#myModal').modal('show')
})

function currentDate(){
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    if(day<10){
        day='0'+day;
    };

    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    return (year+' '+monthNames[month]+' '+day);
}

$(document).ready(function(){
    current_date = currentDate();
    $('.footer-left').append("<p>"+current_date+"</p>");
})


function getImgIndex(){
    current_image_source = $('.modal-content').attr('src')
    all_images = $('.gallery-img')
    for (i=0; i < all_images.length; i++){
        image = all_images[i]
        image_source = image.getAttribute('src')
        if (image_source === current_image_source){
        return i
        }
    }
}

$('.gallery-button-left').click(function(){
    gallery = $('.gallery-img')
    current_image_index = getImgIndex()
    if (current_image_index === 0){
        previous_image = gallery.length-1
    }else{
    previous_image = current_image_index-1
    }
    previous_image = gallery[previous_image]
    previous_image_src = previous_image.getAttribute('src')
    $('.modal-content').attr('src', previous_image_src)
})

$('.gallery-button-right').click(function(){
    gallery = $('.gallery-img')
    current_image_index = getImgIndex()
    if (current_image_index === gallery.length-1){
        next_image = 0
    }else{
    next_image = current_image_index+1
    }
    next_image = gallery[next_image]
    next_image_src = next_image.getAttribute('src')
    $('.modal-content').attr('src', next_image_src)
})
