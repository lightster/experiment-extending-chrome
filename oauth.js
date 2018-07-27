window.onload = function() {
  let makeAuthenticatedRequest = function(request, done, fail) {
    let token;

    let firstFail = function(response) {
      firstFail = function(response) {
        fail(response);
      };

      if (response.statusCode === 401) {
        chrome.identity.removeCachedAuthToken({token: token}, init);
      }
    };

    let init = function() {
      chrome.identity.getAuthToken({interactive: true}, function(returned_token) {
        token = returned_token;
        makeRequest();
      });
    };

    let makeRequest = function() {
      $.ajax({
        url: request.url,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .done(function(response) {
        done(response);
      })
      .fail(firstFail);
    }

    init();
  };

  document.querySelector('button').addEventListener('click', function() {
    let handleUserInfo = function(response) {
      console.log(response);
    };

    makeAuthenticatedRequest(
      {
        url: 'https://www.googleapis.com/plus/v1/people/me'
      },
      handleUserInfo,
      function () {
        console.log(response);
        alert('Something broke :(');
      }
    )
  });
};
