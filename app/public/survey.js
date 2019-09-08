$(document).ready(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var username = $("#name").val().trim();
        var photoURL = $("#photoLink").val().trim();

        if (username.length > 0 && photoURL.length > 0) {
            var user = {
                name: username,
                photoURL: photoURL,
                scores: [
                    parseInt($("#q-1").val()),
                    parseInt($("#q-2").val()),
                    parseInt($("#q-3").val()),
                    parseInt($("#q-4").val()),
                    parseInt($("#q-5").val()),
                    parseInt($("#q-6").val()),
                    parseInt($("#q-7").val()),
                    parseInt($("#q-8").val()),
                    parseInt($("#q-9").val()),
                    parseInt($("#q-10").val()),
                ]
            }

            $.post("/api/friends", user)
                .then(function (closestMatch) {
                    if (closestMatch) {

                        // Empty out modal and username and link fields.
                        $('#modalContent').empty();
                        $('#name').val('');
                        $('#photoLink').val('');

                        // The results are in array form. For each object, grab the name and URL.
                        closestMatch.forEach(function (profile) {
                            var profileDiv = $('<div class="profile">');
                            var name = profile.name;
                            var photoURL = profile.photoURL;
                            // Put the name in a header.
                            var nameHeader = $('<h3>').text(name);
                            // Add a photo with an 'src' of the photoURL submitted.
                            var photo = $('<img>').attr('src', photoURL);
                            profileDiv.append(nameHeader, photo);

                            // Add these items to the modal.
                            $('#modalContent').append(profileDiv);
                        });

                        // If there is a tie for the best match and so you have more than one,
                        if (closestMatch.length > 1) {
                            // Make sure the header is plural.
                            $('.modal-title').text('Your best matches!');
                        } else {
                            // Make sure the header is singular.
                            $('.modal-title').text('Your best match!');
                        }

                        // Display the result modal.
                        $('#resultModal').modal();
                    }
                })
        } else {
            $('html,body').scrollTop(0);
            $('#errorModal').modal();
            // The error modal can be dismissed but it will also disappear after 2 seconds.
            setTimeout(function () {
                $('#errorModal').modal('hide');
            }, 2000);
        }
    })
});