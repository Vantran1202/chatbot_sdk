// Doc: https://developers.google.com/identity/gsi/web/reference/js-reference
// Tutorial: https://piraces.dev/posts/how-to-use-google-one-tap/
$(function(){
  $('#js-login-sns').on('click', function(e) {
    e.preventDefault()
    const client_id = $('body').data('google-client-id')
    const callback_url = $(this).data('callback-login')

    google.accounts.id.initialize({
      client_id: client_id,
      login_uri: callback_url,
      ux_mode: 'redirect', // popup
      // callback: handleCredentialResponse, // only with ux_mode: 'popup'
    });

    google.accounts.id.renderButton(
      document.getElementById("js-login-sns"), // Ensure the element exist and it is a div to display correcctly
      { theme: "outline", size: "large" }  // Customization attributes
    );
    // google.accounts.id.prompt();

    $(this).css('background', 'unset')
  })
})
